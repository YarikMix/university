import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	group: undefined,
};

const selectedGroupSlice = createSlice({
	name: 'selectedGroup',
	initialState: initialState,
	reducers: {
		updateGroup(state, action) {
			state.group = action.payload
		}
	}
})

export const {updateGroup} = selectedGroupSlice.actions;

export default selectedGroupSlice.reducer;