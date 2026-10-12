import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import TechnologyStack from "@/components/TechStack";
import { navItems } from "@/data";

export default function Home() {
	return (
		<>
			<a
				href="#about"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[6000] focus:rounded-md focus:bg-purple focus:px-4 focus:py-2 focus:text-black-100">
				Saltar al contenido
			</a>
			<FloatingNav navItems={navItems} />
			<main className="relative bg-black-100 flex justify-center items-center flex-col overflow-clip mx-auto sm:px-10 px-5">
				<div className="max-w-7xl w-full">
					<Hero />
					<Grid />
					<Experience />
					<RecentProjects />
					<TechnologyStack />
					<Approach />
					<Education />
					<Contact />
					<Footer />
				</div>
			</main>
		</>
	);
}
