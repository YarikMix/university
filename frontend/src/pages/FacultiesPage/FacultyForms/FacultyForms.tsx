import "./FacultyForms.sass"
import AddFacultyForm from "./AddFacultyForm/AddFacultyForm";
import EditFacultyForm from "./EditFacultyForm/EditFacultyForm";

const FacultyForms = () => {
    return (
        <div>
            <AddFacultyForm />
            <EditFacultyForm />
        </div>
    )
}

export default FacultyForms