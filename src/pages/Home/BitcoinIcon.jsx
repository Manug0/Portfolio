import { FaBitcoin } from "react-icons/fa";
import styled from "styled-components";

const StyledBitcoinIcon = styled(FaBitcoin)`
	color: #f7931a;
	font-size: 100px;

	@media (max-width: 1300px) {
		font-size: 80px;
	}
`;

const BitcoinIcon = () => {
	return (
		<div>
			<StyledBitcoinIcon />
		</div>
	);
};

export default BitcoinIcon;
