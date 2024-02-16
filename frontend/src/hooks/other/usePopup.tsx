import {useEffect, useRef} from "react";

export function usePopup(closePopUp) {

	const modalRef = useRef(null);

	const closeButtonRef = useRef(null);

	const handleClickOutside = (event) => {
		if (modalRef.current && (!modalRef.current.contains(event.target) || closeButtonRef.current.contains(event.target))) {
			closePopUp();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);


	return {
		modalRef,
		closeButtonRef
	};
}