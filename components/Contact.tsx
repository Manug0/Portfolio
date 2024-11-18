import { ContactFormDemo } from "./ui/ContactForm";
import React from "react";

const Contact = () => {
	return (
		<div>
			{" "}
			<div className="flex flex-col items-center">
				<h1 className="heading lg:max-w-[45vw]">
					Listo para llevar tu presencia digital al
					<span className="text-purple"> siguente nivel?</span>
				</h1>
				<p className="text-white-200 md:mt-10 my-12 text-center">
					Contáctame y veamos como te puedo ayudar a consegir tus objetivos
				</p>
			</div>{" "}
			<ContactFormDemo />
		</div>
	);
};

export default Contact;
