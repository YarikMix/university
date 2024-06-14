import "./GroupTag.sass"
import {AiOutlineClose} from "react-icons/ai";
import {groupRemoveMessage} from "/src/utils/toasts";
import {useDraftLesson} from "../../../hooks/lessons/useDraftLesson";
import FacultyIcon from "../../FacultyIcon/FacultyIcon";
import {api} from "/src/modules/api.ts";

const GroupTag = ({lesson, group, readOnly}) => {

	const { setGroups, setBusyDays } = useDraftLesson()

	const removeGroup = async () => {
		const response = await api.delete(`lessons/${lesson.id}/delete_group/${group.id}/`);

		setGroups(response.data["groups"])
		setBusyDays(response.data["busy_days"])

		groupRemoveMessage(group?.name, lesson.id)
	}

	return (
		<div className="tag-item">
			<FacultyIcon faculty={group.faculty} />
			<span>{group?.name}</span>
			{!readOnly && <AiOutlineClose className="close-btn" onClick={removeGroup}/> }
		</div>
	)
}

export default GroupTag;