import {useDispatch, useSelector} from 'react-redux';
import {setOpen, setFaculty, setFacultyName, setFacultyImage} from "../../store/faculties/facultyEditFormSlice";

export function useFacultyEditForm() {
    const isOpen = useSelector(state => state.facultyEditForm.isOpen);
    const faculty = useSelector(state => state.facultyEditForm.faculty);

    const dispatch = useDispatch()

    const toggleForm = (value) => {
        dispatch(setOpen(value))
    }

    const closeForm = () => {
        dispatch(setOpen(false))
    }

    const openForm = (data) => {
        updateFaculty(data)
        dispatch(setOpen(true))
    }

    const updateFaculty = (data) => {
        dispatch(setFaculty(data))
    }

    const updateFacultyName = (data) => {
        dispatch(setFacultyName(data))
    }

    const updateFacultyImage = (data) => {
        dispatch(setFacultyImage(data))
    }

    return {
        isOpen,
        faculty,
        updateFacultyName,
        updateFacultyImage,
        updateFaculty,
        openForm,
        closeForm,
        toggleForm
    };
}