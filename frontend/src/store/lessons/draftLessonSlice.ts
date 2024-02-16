import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	lesson: undefined,
	busy_days: []
};

const draftLessonSlice = createSlice({
	name: 'draftLesson',
	initialState: initialState,
	reducers: {
		updateLesson(state, action) {
			state.lesson = action.payload
		},
		updateGroups(state, action){
			state.lesson.groups = action.payload
		},
		updateDay(state, action){
			state.lesson.day_of_week = action.payload
		},
		updateTime(state, action){
			state.lesson.time = action.payload
		},
		updateDiscipline(state, action){
			state.lesson.discipline = action.payload
		},
		updateAudience(state, action){
			state.lesson.audience = action.payload
		},
		updateTeacher(state, action){
			state.lesson.teacher = action.payload
		},
		updateBusyDays(state, action){
			state.busy_days = action.payload
		}
	}
})

export const {updateLesson, updateGroups, updateDay, updateTime, updateDiscipline, updateAudience, updateTeacher, updateBusyDays} = draftLessonSlice.actions;

export default draftLessonSlice.reducer;