import GroupInfo from "./GroupInfo/GroupInfo";
import { useParams } from "react-router-dom";


const GroupPage = () => {
    const { id } = useParams<{id?: string}>();

    return (
        <GroupInfo group_id={parseInt(id)} />
    )
}

export default  GroupPage;