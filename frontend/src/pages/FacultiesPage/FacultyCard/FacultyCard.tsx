import "./FacultyCard.sass"
import {Faculty} from "../../../utils/types";
import FacultyIcon from "../../../components/FacultyIcon/FacultyIcon";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {variables} from "../../../utils/variables";
import {motion} from "framer-motion";
import {useAuth} from "../../../hooks/users/useAuth";
import {useFacultyEditForm} from "../../../hooks/faculties/useFacultyEditForm";

const FacultyCard = ({faculty}:{faculty:Faculty}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {openForm} = useFacultyEditForm()

    const handleClick = (e) => {
        e.preventDefault()
        openForm(faculty)
    }

    return (
        <motion.div
            layout
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{scale: 1.1}}
            className="faculty"
            key={faculty.id}>

            <div className="top-container">

                <FacultyIcon faculty={faculty} />

            </div>

            <div className="center-container">

                <span className="faculty-name">{faculty.name}</span>

            </div>

            {is_authenticated && is_moderator &&
                <div className="bottom-container">
                    <CustomButton bg={variables.primary} text="Редактировать" onClick={handleClick} />
                </div>
            }

        </motion.div>
    )
}

export default FacultyCard