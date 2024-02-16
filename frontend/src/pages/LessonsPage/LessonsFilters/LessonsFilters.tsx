import "./LessonsFilters.sass"
import DropdownMenu from "../../../components/DropdownMenu/DropdownMenu";
import {ADMIN_STATUSES, NEXT_DAY, PREV_DAY, USER_STATUSES} from "../../../utils/consts";
import {useLessons} from "../../../hooks/lessons/useLessons";
import {DateRangePicker} from "rsuite";
import "rsuite/dist/rsuite-no-reset.css"
import moment from "moment";
import {ru} from "../../../utils/momentLocalization";
import {useAuth} from "../../../hooks/users/useAuth";
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import SearchBar from "../../../components/SearchBar/SearchBar";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {variables} from "../../../utils/variables";
import React from "react";

const LessonsFilters = () => {

    const {is_moderator} = useAuth()

    const {date, setDate, status, setStatus, user, setUser} = useLessons()

    const updateDate = (value) => {
         let tmp = {}

         if (value == null) {
             tmp = {
                 start: new Date(PREV_DAY).getTime(),
                 end: new Date(NEXT_DAY).getTime()
             }
         } else {
             tmp = {
                 start: new Date(value[0]).getTime(),
                 end: new Date(value[1]).getTime()
             }
         }

        setDate(tmp)
    }

    const predefinedBottomRanges = [
        {
            label: 'Сегодня',
            value: [new Date(), new Date()]
        },
        {
            label: 'Вчера',
            value: [addDays(new Date(), -1), addDays(new Date(), -1)]
        },
        {
            label: 'За последнюю неделю',
            value: [subDays(new Date(), 6), new Date()]
        },
        {
            label: 'За последний месяц',
            value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))]
        },
        {
            label: 'За всё время',
            value: [new Date(new Date().getFullYear() - 10, 0, 1), new Date()]
        }
    ];

    return (
        <div className="lessons-filters-wrapper">

            <div className="top-container">

                <h3>Список занятий</h3>

            </div>

            <div className="bottom-container">

                <DropdownMenu
                    width={175}
                    options={is_moderator ? ADMIN_STATUSES : USER_STATUSES}
                    selectedOption={status}
                    setSelectedOption={(id) => {
                        setStatus(id)
                    }}
                />

                <DateRangePicker
                    ranges={predefinedBottomRanges}
                    value={[new Date(date.start), new Date(date.end)]}
                    onChange={updateDate}
                    renderValue={(value) => <span>{moment(value[0]).locale(ru()).format("D MMMM")} - {moment(value[1]).locale(ru()).format("D MMMM")}</span>}
                    cleanable={false}
                    format="yyyy-MM-dd"
                    defaultCalendarValue={[new Date(date.start), new Date(date.end)]}/>

                {is_moderator && <SearchBar query={user} setQuery={setUser} placeholder="Фильтр по пользователям" width={350}/> }

                <CustomButton bg={variables.primary} text="Применить"/>

            </div>

        </div>
    )
}

export default LessonsFilters