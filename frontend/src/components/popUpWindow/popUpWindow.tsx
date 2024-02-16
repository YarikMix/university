import "./popUpWindow.sass"
import {usePopup} from "../../hooks/other/usePopup";
import {AiOutlineClose} from "react-icons/ai";
import {useEffect} from "react";

const PopUpWindow = ({isOpen, setClose, children}) => {
	const {modalRef, closeButtonRef} = usePopup(setClose, isOpen)

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "auto";
	}, [isOpen])
	
	return (
		<div className={"modal-wrapper " + (isOpen ? "active" : "") }>

			<div className="overlay">

			</div>

			<div className="modal-content" ref={modalRef}>

				<div className="close-button-container" ref={closeButtonRef}>
					<AiOutlineClose className="close-button" />
				</div>

				{children}

			</div>

		</div>
	)
}

export default PopUpWindow