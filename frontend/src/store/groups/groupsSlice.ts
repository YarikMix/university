import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	groups: [],
	course: -1,
	education_type: -1,
	query: "",
	faculties: [],
	selectedFaculties: [-1],
	queryPageIndex: 0,
	queryPageSize: 5,
	totalCount: 0
};

const modalSlice = createSlice({
	name: 'groups',
	initialState: initialState,
	reducers: {
		updateGroups(state, action) {
			state.groups = action.payload
		},
		updateCourse(state, action) {
			state.course = action.payload
		},
		updateEducationType(state, action) {
			state.education_type = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		},
		updateFaculties(state, action) {
			state.faculties = action.payload
		},
		updateSelectedFaculties(state, action) {
			state.selectedFaculties = action.payload
		},
		pageChanged(state, action) {
			state.queryPageIndex = action.payload
		},
		pageSizeChanged(state, action) {
			state.queryPageSize = action.payload
		},
		totalCountChanged(state, action) {
			state.totalCount = action.payload
		}
	}
})

export const {
	updateGroups,
	updateCourse,
	updateEducationType,
	updateQuery,
	updateFaculties,
	updateSelectedFaculties,
	pageChanged,
	pageSizeChanged,
	totalCountChanged
} = modalSlice.actions;

export default modalSlice.reducer;