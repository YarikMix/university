import "./AudienceSelection.sass"
import ClockAnimated from "../ClockAnimated/ClockAnimated";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {variables} from "../../../utils/variables";
import * as React from "react";
import {useEffect} from "react";
import axios from "axios";
import {DOMEN} from "../../../utils/consts";
import {useDraftLesson} from "../../../hooks/lessons/useDraftLesson";
import {useToken} from "../../../hooks/users/useToken";
import {errorMessage, infoMessage, successMessage} from "../../../utils/toasts";
import {useQuery} from "react-query";

const AudienceSelection = () => {

    const {lesson, setAudience, saveLesson} = useDraftLesson()

    const {access_token} = useToken()

    useEffect(() => {
        saveLesson()
    }, [lesson.audience])

    const fetchAudience = async () => {

        const {data} = await axios(`${DOMEN}/api/lessons/${lesson.id}/find_audience/`, {
            method: "GET",
            headers: {
                'authorization': access_token
            }
        })

        return data
    }

    const { refetch, isFetching } = useQuery(["audience"], () => fetchAudience(), {
        refetchInterval: data => (data ? false : 1000),
        refetchOnWindowFocus: false,
        enabled: false,
        onSuccess: (data) => {
            if (data) {
                successMessage("Аудитория успешно найдена!")
            } else {
                errorMessage("Не удалось найти аудиторию")
            }

            setAudience(data)
        }
    })

    const calculateAudition = async(e) => {
        e.preventDefault()

        if (isFetching) {
            return;
        }

        infoMessage("Отправлен запрос на определение аудитории")

        refetch()
    }

    return (
        <div className="audience-container">

            <h3>Аудитория</h3>

            <div className="audience-field">
                {lesson.audience && !isFetching && <span>{lesson.audience}</span>}
                {!lesson.audience && !isFetching && <span>Аудитория не выбрана</span>}
                {isFetching && <span>Аудитория вычисляется</span>}
                {isFetching && <ClockAnimated />}
            </div>

            <CustomButton bg={variables.primary} text={"Определить аудиторию"} onClick={calculateAudition}/>

        </div>
    )
}

export default AudienceSelection