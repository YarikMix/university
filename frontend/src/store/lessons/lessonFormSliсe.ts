import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	isOpen: false,
	lesson: undefined
};

const lessonFormSlice = createSlice({
	name: 'lessonForm',
	initialState: initialState,
	reducers: {
		setOpen(state, action) {
			state.isOpen = action.payload
		},
		updateLesson(state, action) {
			state.lesson = action.payload
		}
	}
})

export const {setOpen, updateLesson } = lessonFormSlice.actions;

export default lessonFormSlice.reducer;