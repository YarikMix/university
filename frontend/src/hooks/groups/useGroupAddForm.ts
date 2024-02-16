import {useDispatch, useSelector} from 'react-redux';
import {updateOpen, updateGroup, updateGroupName, updateCourse, updateEducationType, updateFaculty, updateYearBegin, updateYearEnd} from "../../store/groups/groupAddFormSlice";
import {GroupFormDraft} from "../../utils/consts";

export function useGroupAddForm() {
    const isOpen = useSelector(state => state.groupAddForm.isOpen);
    const group = useSelector(state => state.groupAddForm.group);
    const faculty = useSelector(state => state.groupAddForm.group?.faculty);
    const course = useSelector(state => state.groupAddForm.group?.course);
    const education_type = useSelector(state => state.groupAddForm.group?.education_type);

    const dispatch = useDispatch()

    const toggleForm = (value) => {
        dispatch(updateOpen(value))
    }

    const closeForm = () => {
        dispatch(updateOpen(false))
    }

    const openForm = () => {
        setGroup(GroupFormDraft)
        dispatch(updateOpen(true))
    }

    const setGroup = (data) => {
        dispatch(updateGroup(data))
    }

    const setName = (data) => {
        dispatch(updateGroupName(data))
    }

    const setCourse = (data) => {
        dispatch(updateCourse(data))
    }

    const setEducationType = (data) => {
        dispatch(updateEducationType(data))
    }

    const setFaculty = (data) => {
        dispatch(updateFaculty(data))
    }

    const setYearBegin = (data) => {
        dispatch(updateYearBegin(data))
    }

    const setYearEnd = (data) => {
        dispatch(updateYearEnd(data))
    }

    return {
        isOpen,
        group,
        setName,
        course,
        setCourse,
        education_type,
        setEducationType,
        faculty,
        setFaculty,
        setYearBegin,
        setYearEnd,
        openForm,
        closeForm,
        toggleForm
    };
}