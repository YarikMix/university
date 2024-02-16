import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    faculty: undefined,
};

const facultyEditFormSlice = createSlice({
    name: 'facultyEditForm',
    initialState: initialState,
    reducers: {
        setOpen(state, action) {
            state.isOpen = action.payload
        },
        setIsUpdating(state, action) {
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

export const {setOpen, setFaculty, setFacultyName, setFacultyImage} = facultyEditFormSlice.actions;

export default facultyEditFormSlice.reducer;