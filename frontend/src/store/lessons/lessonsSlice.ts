import {createSlice} from "@reduxjs/toolkit"
import {DAY, NOW} from "../../utils/consts";

const initialState= {
	queryPageIndex: 0,
	queryPageSize: 5,
	totalCount: 0,
	status: -1,
	user: "",
	date: {
		start: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
		end: new Date(NOW + 15 * DAY).getTime()
	}
};

const lessonsSlice = createSlice({
	name: 'lessons',
	initialState: initialState,
	reducers: {
		pageChanged(state, action) {
			state.queryPageIndex = action.payload
		},
		pageSizeChanged(state, action) {
			state.queryPageSize = action.payload
		},
		totalCountChanged(state, action) {
			state.totalCount = action.payload
		},
		updateStatus(state, action) {
			state.status = action.payload
		},
		updateUser(state, action) {
			state.user = action.payload
		},
		updateDate(state, action) {
			state.date = action.payload
		}
	}
})

export const {pageChanged, pageSizeChanged, totalCountChanged, updateStatus, updateUser, updateDate} = lessonsSlice.actions;

export default lessonsSlice.reducer;