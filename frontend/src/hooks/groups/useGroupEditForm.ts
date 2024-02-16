import {useDispatch, useSelector} from 'react-redux';
import {updateOpen, updateGroup, updateGroupName, updateCourse, updateEducationType, updateFaculty, updateYearBegin, updateYearEnd} from "../../store/groups/groupEditFormSlice";
import {api} from "../../utils/api";

export function useGroupEditForm() {
    const isOpen = useSelector(state => state.groupEditForm.isOpen);
    const group = useSelector(state => state.groupEditForm.group);
    const faculty = useSelector(state => state.groupEditForm.group?.faculty);
    const course = useSelector(state => state.groupEditForm.group?.course);
    const education_type = useSelector(state => state.groupEditForm.group?.education_type);

    const dispatch = useDispatch()

    const toggleForm = (value) => {
        dispatch(updateOpen(value))
    }

    const closeForm = () => {
        dispatch(updateOpen(false))
    }

    const openForm = () => {
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

    const openEditForm = async (id) => {

        const {data} = await api.get(`groups/${id}`);

        setGroup(data)
        openForm()
    }

    return {
        isOpen,
        group,
        setGroup,
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
        toggleForm,
        openEditForm
    };
}