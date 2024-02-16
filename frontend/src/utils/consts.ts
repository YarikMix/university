import {Faculty, Option} from "./types";
import logo from "/src/assets/logo.png"

export const COURSES: Option[] = [
    {
        id: -1,
        name: "Любой курс"
    },
    {
        id: 1,
        name: "Первый курс"
    },
    {
        id: 2,
        name: "Второй курс"
    },
    {
        id: 3,
        name: "Третий курс"
    },
    {
        id: 4,
        name: "Четвертый курс"
    },
    {
        id: 5,
        name: "Пятый курс"
    },
    {
        id: 6,
        name: "Шестой курс"
    },
]

export const EDUCATION_TYPES: Option[] = [
    {
        id: -1,
        name: "Любой вариант обучения"
    },
    {
        id: 1,
        name: "Бакалавриат"
    },
    {
        id: 2,
        name: "Специалитет"
    },
    {
        id: 3,
        name: "Магистратура"
    },
]


export const LESSON_TIME : Option[] = [
    {
        id: 1,
        name: "8:30-10:05"
    },
    {
        id: 2,
        name: "10:15-11:50"
    },
    {
        id: 3,
        name: "12:00-13:35"
    },
    {
        id: 4,
        name: "13:50-15:25"
    },
    {
        id: 5,
        name: "15:40-17:15"
    },
    {
        id: 6,
        name: "17:25-19:00"
    },
    {
        id: 7,
        name: "19:10-20:45"
    }
]

export const LESSON_DAY = [
    {
        id: 1,
        full_name: "Понедельник",
        name: "Пн"
    },
    {
        id: 2,
        full_name: "Вторник",
        name: "Вт"
    },
    {
        id: 3,
        full_name: "Среда",
        name: "Ср"
    },
    {
        id: 4,
        full_name: "Четверг",
        name: "Чт"
    },
    {
        id: 5,
        full_name: "Пятница",
        name: "Пт"
    },
    {
        id: 6,
        full_name: "Суббота",
        name: "Сб"
    }
]

/*
export const LESSON_TIME = [
    "8:30-10:05",
    "10:15-11:50",
    "12:00-13:35",
    "13:50-15:25",
    "15:40-17:15",
    "17:25-19:00",
    "19:10-20:45"
]

export const LESSON_DAY = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
]
*/

export const STATUSES : Option[] = [
    {
        id: -1,
        name: "Любой статус"
    },
    {
        id: 1,
        name: "Черновик"
    },
    {
        id: 2,
        name: "В работе"
    },
    {
        id: 3,
        name: "Завершен"
    },
    {
        id: 4,
        name: "Отменен"
    },
    {
        id: 5,
        name: "Удален"
    }
]

export const FacultyItemAny:Faculty = {
    id: -1,
    name: "Любой",
    image: ""
}

export const FacultyFormDraft = {
    id: -1,
    name: "",
    image: logo
}

export const GroupFormDraft = {
    id: -1,
    name: "",
    faculty: FacultyFormDraft,
    course: 1,
    education_type: 1,
    year_begin: "",
    year_end: ""
}

export const anyUsersOption = {
    id: -1,
    name: "Все пользователи"
}

export const ADMIN_STATUSES : Option[] = [
    {
        id: -1,
        name: "Любой статус"
    },
    {
        id: 2,
        name: "В работе"
    },
    {
        id: 3,
        name: "Завершен"
    },
    {
        id: 4,
        name: "Отменен"
    }
]

export const USER_STATUSES : Option[] = [
    {
        id: -1,
        name: "Любой статус"
    },
    {
        id: 2,
        name: "В работе"
    },
    {
        id: 3,
        name: "Завершен"
    },
    {
        id: 4,
        name: "Отменен"
    }
]

export const DAY = 86400000
export const NOW = Date.now()
export const PREV_DAY = Date.now() - DAY
export const NEXT_DAY = Date.now() + DAY
export const NEXT_MONTH = Date.now() + 30 * DAY