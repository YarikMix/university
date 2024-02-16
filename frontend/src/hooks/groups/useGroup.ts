import {useDispatch, useSelector} from 'react-redux';
import {updateGroup} from "../../store/groups/selectedGroupSlice";

export function useGroup() {
	const group = useSelector(state => state.selectedGroup.group);

	const dispatch = useDispatch()

	const setGroup= (value) => {
		dispatch(updateGroup(value))
	}

	return {
		group,
		setGroup
	};
}