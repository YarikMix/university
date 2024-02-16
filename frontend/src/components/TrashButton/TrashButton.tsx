import "./TrashButton.sass"
import React from "react";
import {FaTrash} from "react-icons/fa6";

const TrashButton = ({ onClick }: {onClick: () => void}) => {
	return (
		<button className="delete-btn-wrapper" onClick={onClick}>
			<FaTrash />
		</button>
	)
}



export default TrashButton;