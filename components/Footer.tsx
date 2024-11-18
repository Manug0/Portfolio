import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./ui/MagicButton";
import { socialMedia } from "@/data";

const Footer = () => {
	return (
		<footer className="w-full relative pb-10 " id="contact">
			<div className="w-full left-0 bottom-0 absolute min-h-96">
				<img src="/footer-grid.svg" alt="grid" className="w-full h-[800px]  opacity-80 " />
			</div>

			<div className="flex mt-16 md:flex-row flex-col justify-between items-center">
				<p className="md:text-base text-sm md:font-normal font-light">
					Copyright © {new Date().getFullYear()} Manuel González
				</p>

				<div className="flex items-center md:gap-3 gap-6 mt-6">
					{socialMedia.map((info) => (
						<a
							href={info.link}
							target="_blank"
							key={info.id}
							className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300">
							<img src={info.img} alt="icons" width={20} height={20} />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
