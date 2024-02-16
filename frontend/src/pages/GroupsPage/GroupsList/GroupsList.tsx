import "./GroupsList.sass"
import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import GroupCard from "./GroupCard/GroupCard";
import {useGroups} from "../../../hooks/groups/useGroups";
import GroupsFilters from "../GroupsFilters/GroupsFilters";

const GroupsList = () => {

    const [groups, setGroups] = useState([])
    const [fetching, setFetching] = useState(true)

    const refetch = () => {
        setGroups([])
        setGroupsPage(0)
        setFetching(!fetching)
    }

    const { course, education_type, query, selectedFaculties, searchGroups, queryPageIndex, setGroupsPage } = useGroups()

    useEffect(() => {

        const pageSize = 10

        searchGroups(queryPageIndex, pageSize).then(data => {
            setGroups([...groups, ...data["groups"]])
            setGroupsPage(queryPageIndex + 1)
        }).finally(() => setFetching(false))

    }, [fetching])

    useEffect(() => {
        refetch()
    }, [course, education_type, query, selectedFaculties])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    const scrollHandler = async (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) {
            setFetching(true)
        }
    }

    const cards = groups.map(group  => (
        <GroupCard group={group} key={group.id} refetch={refetch}/>
    ))

    return (

        <div className="groups-wrapper">

            <GroupsFilters refetch={refetch}/>

            <motion.div className="group-list-wrapper">

                <AnimatePresence>

                    { cards }

                </AnimatePresence>

            </motion.div>
        </div>
    )
}

export default GroupsList