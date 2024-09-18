import TypewriterComponent from "typewriter-effect";

const Type = () => {
	return (
		<TypewriterComponent
			style={{ fontSize: "40px" }}
			options={{
				strings: ["MERN Stack Developer", "Junior FullStack Developer"],
				autoStart: true,
				loop: true,
				deleteSpeed: 60,
			}}
		/>
	);
};

export default Type;
