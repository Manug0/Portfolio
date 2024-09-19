import { LiaLaptopCodeSolid } from "react-icons/lia";
import styled from "styled-components";

const StyledPCIcon = styled(LiaLaptopCodeSolid)`
	color: white;
	font-size: 130px;

	@media (max-width: 1300px) {
		font-size: 100px;
	}
`;

const PCIcon = () => {
	return (
		<div>
			<StyledPCIcon />
		</div>
	);
};

export default PCIcon;
