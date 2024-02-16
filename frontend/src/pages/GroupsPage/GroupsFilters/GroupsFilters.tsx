import "./GroupsFilters.sass"
import DropdownMenu from "../../../components/DropdownMenu/DropdownMenu";
import {COURSES, EDUCATION_TYPES} from "../../../utils/consts";
import SearchBar from "../../../components/SearchBar/SearchBar";
import FacultiesMenu from "../FacultiesMenu/FacultiesMenu";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {variables} from "../../../utils/variables";
import {useGroups} from "../../../hooks/groups/useGroups";
import {useGroupAddForm} from "../../../hooks/groups/useGroupAddForm";
import {useAuth} from "../../../hooks/users/useAuth";
import React from "react";
import AddGroupForm from "../GroupsForms/AddGroupForm/AddGroupForm";
import EditGroupForm from "../GroupsForms/EditGroupForm/EditGroupForm";

const GroupsFilters = ({refetch, gotoPage}) => {

    const {is_moderator} = useAuth()

    const { course, setCourse, education_type, setEducationType, query, setQuery } = useGroups()

    const {openForm} = useGroupAddForm()

    return (
        <div className="groups-filters-container">

            <div className="top">

                <div className="left">
                    <h3>Список групп</h3>
                </div>

                <div className="right">

                    <DropdownMenu
                        width={200}
                        options={COURSES}
                        selectedOption={course}
                        setSelectedOption={(id) => {
                            setCourse(id)
                        }}
                    />

                    <DropdownMenu
                        width={275}
                        options={EDUCATION_TYPES}
                        selectedOption={education_type}
                        setSelectedOption={(id) => {
                            setEducationType(id)
                        }}
                    />

                    <SearchBar placeholder="Поиск групп..." query={query} setQuery={setQuery} width={250} />

                </div>

            </div>

            <div className="bottom">

                <div className="left">
                    <FacultiesMenu />
                </div>

                {is_moderator &&
                    <div className="right">
                        <CustomButton bg={variables.primary} text="Добавить группу" onClick={openForm}/>
                    </div>
                }

            </div>

            <AddGroupForm refetch={refetch} gotoPage={gotoPage} />
            <EditGroupForm refetch={refetch} />

        </div>
    )
}

export default GroupsFilters