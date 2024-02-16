import {configureStore} from "@reduxjs/toolkit";

import selectedGroupReducer from "./groups/selectedGroupSlice"
import draftLessonReducer from "./lessons/draftLessonSlice"
import authReducer from "./users/authSlice"
import lessonFormReducer from "./lessons/lessonFormSliсe"
import lessonsReducer from "./lessons/lessonsSlice"
import groupsReducer from "./groups/groupsSlice"
import facultiesReducer from "./faculties/facultiesSlice"
import facultyAddFormReducer from "./faculties/facultyAddFormSlice";
import facultyEditFormReducer from "./faculties/facultyEditFormSlice";
import groupEditFormReducer from "./groups/groupEditFormSlice"
import groupAddFormReducer from "./groups/groupAddFormSlice"
import loginReducer from "./users/loginSlice"
import registerReducer from "./users/registerSlice"

export default configureStore({
	reducer: {
		selectedGroup: selectedGroupReducer,
		groups: groupsReducer,
		faculties: facultiesReducer,
		facultyAddForm: facultyAddFormReducer,
		facultyEditForm: facultyEditFormReducer,
		draftLesson: draftLessonReducer,
		lessons: lessonsReducer,
		user: authReducer,
		lessonForm: lessonFormReducer,
		groupEditForm: groupEditFormReducer,
		groupAddForm: groupAddFormReducer,
		login: loginReducer,
		register: registerReducer
	}
});