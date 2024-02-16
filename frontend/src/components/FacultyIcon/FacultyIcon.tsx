import {Faculty} from "../../utils/types";

const FacultyIcon = ({ faculty }: { faculty:Faculty }) => {
    return (
        <div className="faculty-image-container">
            <img className="faculty-image" src={faculty.image} alt=""/>
        </div>
    );
}

export default FacultyIcon;