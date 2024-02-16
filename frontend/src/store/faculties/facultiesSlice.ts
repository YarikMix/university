import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    faculties: [],
    query: "",
};

const modalSlice = createSlice({
    name: 'faculties',
    initialState: initialState,
    reducers: {
        updateFaculties(state, action) {
            state.faculties = action.payload
        },
        updateQuery(state, action) {
            state.query = action.payload
        }
    }
})

export const {updateFaculties, updateQuery} = modalSlice.actions;

export default modalSlice.reducer;