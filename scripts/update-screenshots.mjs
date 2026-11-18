// Renueva las capturas de los proyectos web (public/projects/*.webp) cuando la portada de una web cambia.
//
// Para cada proyecto de data/projects.json abre su enlace, hace una captura de la portada y la compara
// con la que hay en el repositorio. Solo la sustituye si la diferencia es apreciable: dos capturas de la
// misma página nunca son idénticas byte a byte, y no queremos un commit cada semana sin motivo.
//
// Lo ejecuta .github/workflows/update-screenshots.yml (semanalmente y a mano). En local:
//   npm install --no-save playwright && npx playwright install chromium
//   node scripts/update-screenshots.mjs            # actualiza las que hayan cambiado
//   node scripts/update-screenshots.mjs --check    # solo informa, no escribe nada
//   node scripts/update-screenshots.mjs --force    # las rehace todas

import { readFile, writeFile } from "node:fs/promises";

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = path.join(root, "data/projects.json");

// Mismo encuadre que las capturas originales: un escritorio ancho, solo la primera pantalla
const VIEWPORT = { width: 1910, height: 915 };
// Diferencia media por píxel (0–255) a partir de la cual se considera que la portada ha cambiado.
// El mismo diseño capturado en dos momentos o equipos distintos queda en torno a 1–3; un rediseño, muy por encima.
const THRESHOLD = 6;

const check = process.argv.includes("--check");
const force = process.argv.includes("--force");

/** Versión reducida de la imagen, para comparar el aspecto general y no el ruido de píxel */
const fingerprint = (input) =>
	sharp(input).resize(64, 32, { fit: "fill" }).removeAlpha().raw().toBuffer();

const difference = (a, b) => {
	let total = 0;
	for (let i = 0; i < a.length; i++) total += Math.abs(a[i] - b[i]);
	return total / a.length;
};

const projects = JSON.parse(await readFile(dataFile, "utf8"));
const browser = await chromium.launch();
let updated = 0;
let failed = 0;

for (const [key, project] of Object.entries(projects)) {
	const file = path.join(root, "public", project.image.src);
	const context = await browser.newContext({
		viewport: VIEWPORT,
		deviceScaleFactor: 1,
		locale: "es-ES",
		reducedMotion: "reduce",
	});
	try {
		const page = await context.newPage();
		const response = await page.goto(project.link, { waitUntil: "networkidle", timeout: 60_000 });
		// Si la web está caída o devuelve un error, se conserva la captura que ya había
		if (!response || !response.ok()) throw new Error(`respuesta ${response?.status() ?? "vacía"}`);
		await page.evaluate(() => document.fonts.ready);
		await page.waitForTimeout(2500);
		// animations: "disabled" deja las animaciones en un estado fijo, así dos capturas del mismo diseño coinciden
		const png = await page.screenshot({ type: "png", animations: "disabled" });

		const previous = await readFile(file).catch(() => null);
		const delta = previous ? difference(await fingerprint(previous), await fingerprint(png)) : Infinity;
		const changed = force || delta > THRESHOLD;
		console.log(`${key}: diferencia ${delta.toFixed(1)} → ${changed ? "ha cambiado" : "sin cambios"}`);

		if (changed && !check) {
			await sharp(png).webp({ quality: 90 }).toFile(file);
			project.image.width = VIEWPORT.width;
			project.image.height = VIEWPORT.height;
			updated++;
		}
	} catch (error) {
		failed++;
		console.warn(`${key}: no se pudo capturar ${project.link} (${error.message}); se mantiene la captura actual`);
	} finally {
		await context.close();
	}
}

await browser.close();
if (updated) await writeFile(dataFile, JSON.stringify(projects, null, "\t") + "\n");
console.log(`${updated} captura(s) actualizada(s)${failed ? `, ${failed} con error` : ""}`);
// Si no se pudo capturar ninguna, algo va mal con el propio script: que el workflow lo marque en rojo
if (failed === Object.keys(projects).length) process.exit(1);
