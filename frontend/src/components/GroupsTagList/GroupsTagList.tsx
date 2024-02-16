import "./GroupTagList.sass"
import GroupTag from "./GroupTag/GroupTag";
import {Lesson} from "src/utils/types";

const GroupsTagList = ({lesson, readOnly=true}:{lesson:Lesson, readOnly:boolean}) => {

	const groups = lesson?.groups.map(group => {
		return <GroupTag lesson={lesson} group={group} readOnly={readOnly} key={group.id} />
	})

	return (
		<div className="groups-tag-list-wrapper">

			<span className="title">Группы</span>

			<div className="groups-tags-list-container">
				{ groups && groups.length > 0 ? groups : <span className="title">Группы не выбраны</span> }
			</div>

		</div>
	)
}

export default GroupsTagList