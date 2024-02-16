import "./CustomButton.sass"
import styled from "styled-components";

const CustomButton = ({text, bg, onClick, children}) => {
	return (
		<CustomButtonWrapper theme={bg} className="custom-button" onClick={onClick}>
			{text}{children}
		</CustomButtonWrapper>
	)
}

const CustomButtonWrapper = styled.button`
  background-color: ${props => props.theme};
`



export default CustomButton