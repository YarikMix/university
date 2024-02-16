import {useDispatch, useSelector} from 'react-redux';
import {setOpen, setFaculty, setFacultyName, setFacultyImage} from "../../store/faculties/facultyAddFormSlice";
import {FacultyFormDraft} from "../../utils/consts";

export function useFacultyAddForm() {
    const isOpen = useSelector(state => state.facultyAddForm.isOpen);
    const faculty = useSelector(state => state.facultyAddForm.faculty);

    const dispatch = useDispatch()

    const toggleForm = (value) => {
        dispatch(setOpen(value))
    }

    const closeForm = () => {
        dispatch(setOpen(false))
        setTimeout(() => {
            refreshForm()
        }, 500)
    }

    const openForm = () => {
        dispatch(setOpen(true))
    }

    const refreshForm = () => {
        dispatch(setFaculty(FacultyFormDraft))
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
        updateFaculty,
        updateFacultyName,
        updateFacultyImage,
        openForm,
        toggleForm,
        closeForm,
        refreshForm
    };
}