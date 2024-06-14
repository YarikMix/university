import "./GroupCard.sass"
import {Link} from "react-router-dom";
import {Group} from "/src/utils/types.js";
import FacultyIcon from "/src/components/FacultyIcon/FacultyIcon";
import {motion} from "framer-motion"
import {useAuth} from "/src/hooks/users/useAuth";
import {useDraftLesson} from "../../../../hooks/lessons/useDraftLesson";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/variables";
import {useGroups} from "../../../../hooks/groups/useGroups";
import TrashButton from "../../../../components/TrashButton/TrashButton";

const GroupCard = ({ group, refetch }: { group: Group }) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {lesson, addGroupToLesson, deleteGroupFromLesson} = useDraftLesson()

    const {deleteGroup} = useGroups()

    const addToLesson = async () => {
        await addGroupToLesson(group)
    }

    const deleteFromLesson = async () => {
        await deleteGroupFromLesson(group)
    }

    const handleDeleteGroup = async () => {
        await deleteGroup(group)
        refetch()
    }

    const is_chosen = lesson?.groups.find(g => g.id == group.id)

    return (
        <motion.div
            layout
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            whileHover={{scale: 1.05}}
            className="group"
            key={group.id}>

            <div className="top-container">

                <FacultyIcon faculty={group.faculty} />

            </div>

            <div className="center-container">

                <span className="group-name">{group.name}</span>

            </div>

            <div className="bottom-container">

                {is_moderator &&
                    <CustomButton bg={variables.primary} text="Редактировать" />
                }

                {!is_moderator &&
                    <Link to={`/groups/${group.id}`}>
                        <CustomButton bg={variables.green} text="Открыть" />
                    </Link>
                }

                {is_authenticated && !is_chosen && !is_moderator &&
                    <CustomButton bg={variables.primary} text="Добавить" onClick={addToLesson} />
                }

                {is_moderator &&
                    <TrashButton onClick={handleDeleteGroup} />
                }

                {is_authenticated && is_chosen && !is_moderator &&
                    <CustomButton bg={variables.red} text="Удалить" onClick={deleteFromLesson} />
                }

            </div>

        </motion.div>

    );
}

export default GroupCard;