import "./GroupTag.sass"
import {AiOutlineClose} from "react-icons/ai";
import {useToken} from "/src/hooks/users/useToken";
import {groupRemoveMessage} from "/src/utils/toasts";
import {useDraftLesson} from "../../../hooks/lessons/useDraftLesson";
import {api} from "/src/utils/api";
import FacultyIcon from "../../FacultyIcon/FacultyIcon";

const GroupTag = ({lesson, group, readOnly}) => {

	const { access_token } = useToken()

	const { setGroups, setBusyDays } = useDraftLesson()

	const removeGroup = async () => {
		const response = await api.delete(`lessons/${lesson.id}/delete_group/${group.id}/`, {
			headers: {
				'authorization': access_token
			}
		});

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