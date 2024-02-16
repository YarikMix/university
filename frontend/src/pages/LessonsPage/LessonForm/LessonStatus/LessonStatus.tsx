import {STATUSES} from "../../../../utils/consts";
import {FaRegStickyNote} from "react-icons/fa";
import {MdOutlineWorkHistory} from "react-icons/md";
import {AiFillCheckCircle, AiFillDelete} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import * as React from "react";
import {Lesson} from "../../../../utils/types";
import styled from "styled-components";
import "./LessonStatus.sass"

const LessonStatus = ({lesson}:{lesson:Lesson}) => {

	const statusIcons : Record<number, React.ReactElement> = {
		1: <FaRegStickyNote className={"status-icon"} />,
		2: <MdOutlineWorkHistory className={"status-icon"} />,
		3: <AiFillCheckCircle className={"status-icon"} />,
		4: <ImCancelCircle className={"status-icon"} />,
		5: <AiFillDelete className={"status-icon"} />,
	}

	const BACKGROUNDS: Record<number, string> = {
		1: "#FF66CC",
		2: "#3366CC",
		3: "#568203",
		4: "#FF9966",
		5: "#CC3333"
	}

	return (
		<div className="status-info-wrapper">

			<span className="title">
				Статус
			</span>

			<StatusInfoContainer className="status-info-container" theme={BACKGROUNDS[lesson?.status]}>

				<span className="selected">
					{STATUSES.find(status => status.id == lesson?.status)?.name}
				</span>

				{statusIcons[lesson?.status]}

			</StatusInfoContainer>

		</div>
	)
}

const StatusInfoContainer = styled.div`
    background-color: ${( props ) => props.theme };
`

export default LessonStatus;