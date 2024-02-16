import {useDispatch, useSelector} from 'react-redux';
import {updateFaculties, updateQuery} from "../../store/faculties/facultiesSlice";

export function useFaculties() {
    const faculties = useSelector(state => state.faculties.faculties);
    const query = useSelector(state => state.faculties.query);

    const dispatch = useDispatch()

    const setFaculties = (value) => {
        dispatch(updateFaculties(value))
    }

    const addFaculty = (value) => {
        dispatch(updateFaculties([...faculties, value]))
    }

    const setQuery = (value) => {
        dispatch(updateQuery(value))
    }

    return {
        faculties,
        setFaculties,
        addFaculty,
        query,
        setQuery
    };
}