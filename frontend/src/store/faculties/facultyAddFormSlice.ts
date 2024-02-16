import {createSlice} from "@reduxjs/toolkit"
import {FacultyFormDraft} from "../../utils/consts";

const initialState = {
    isOpen: false,
    faculty: FacultyFormDraft
};

const facultyAddFormSlice = createSlice({
    name: 'facultyAddForm',
    initialState: initialState,
    reducers: {
        setOpen(state, action) {
            state.isOpen = action.payload
        },
        setFaculty(state, action) {
            state.faculty = action.payload
        },
        setFacultyName(state, action) {
            state.faculty.name = action.payload
        },
        setFacultyImage(state, action) {
            state.faculty.image = action.payload
        }
    }
})

export const {setOpen, setFaculty, setFacultyName, setFacultyImage} = facultyAddFormSlice.actions;

export default facultyAddFormSlice.reducer;