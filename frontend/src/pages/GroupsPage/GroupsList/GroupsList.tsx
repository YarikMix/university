import "./GroupsList.sass"
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import GroupCard from "./GroupCard/GroupCard";
import GroupsFilters from "../GroupsFilters/GroupsFilters";
import {useInView} from "react-intersection-observer";
import {useGroups} from "/src/hooks/groups/useGroups.ts";

const GroupsList = () => {

    const [groups, setGroups] = useState([])
    const [fetching, setFetching] = useState(true)

    const pageSize = 10

    const refetch = () => {
        setGroups([])
        setGroupsPage(0)
        setFetching(!fetching)
    }

    const { course, education_type, query, selectedFaculties, searchGroups, queryPageIndex, setGroupsPage } = useGroups()

    useEffect(() => {

        searchGroups(queryPageIndex, pageSize).then(data => {
            setGroups([...groups, ...data["groups"]])
            setGroupsPage(queryPageIndex + 1)
        }).finally(() => {
            setFetching(false)
        })

    }, [fetching])

    useEffect(() => {
        refetch()
    }, [course, education_type, query, selectedFaculties])


    const {ref, inView} = useInView({
        threshold: 1,
        delay: 1000
    })

    useEffect(() => {
        setFetching(true)
    }, [inView]);


    const cards = groups.map(group  => (
        <GroupCard group={group} key={group.id} refetch={refetch}/>
    ))

    return (

        <div className="groups-wrapper">

            <GroupsFilters refetch={refetch}/>

            <motion.div className="group-list-wrapper">

                <AnimatePresence>

                    {cards}

                </AnimatePresence>

                <div ref={ref}/>

            </motion.div>
        </div>
    )
}

export default GroupsList