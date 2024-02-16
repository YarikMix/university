import {createSlice} from "@reduxjs/toolkit"
import {GroupFormDraft} from "../../utils/consts";

const initialState = {
    isOpen: false,
    group: GroupFormDraft,
};

const groupAddFormSlice = createSlice({
    name: 'groupAddForm',
    initialState: initialState,
    reducers: {
        updateOpen(state, action) {
            state.isOpen = action.payload
        },
        updateGroup(state, action) {
            state.group = action.payload
        },
        updateGroupName(state, action) {
            state.group.name = action.payload
        },
        updateCourse(state, action) {
            state.group.course = action.payload
        },
        updateEducationType(state, action) {
            state.group.education_type = action.payload
        },
        updateFaculty(state, action) {
            state.group.faculty = action.payload
        },
        updateYearBegin(state, action) {
            state.group.year_begin = action.payload
        },
        updateYearEnd(state, action) {
            state.group.year_end = action.payload
        }
    }
})

export const {updateOpen, updateGroup, updateGroupName, updateCourse, updateEducationType, updateFaculty, updateYearBegin, updateYearEnd} = groupAddFormSlice.actions;

export default groupAddFormSlice.reducer;