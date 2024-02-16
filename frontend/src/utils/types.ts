export interface Faculty {
    id: number,
    name: string,
    image: string
}

export interface Group {
    id: number,
    name: string,
    faculty: Faculty,
    status: number,
    course: number,
    education_type: number,
    year_begin: number,
    year_end: number
}

export interface Lesson {
    id: number,
    status: number,
    discipline: string,
    audience: string,
    audience_status: number,
    teacher: string,
    groups: Group[],
    time: number,
    day_of_week: number,
    date_created: string,
    date_of_formation: string,
    date_complete: string,
    user: User
}

export interface Option {
    id: number,
    name: string
}

export interface DropdownMenuList {
    options: Option[],
    selectedOption: number,
    setSelectedOption: (id: number) => void,
    [placeholder: string]: string,
    [width: number]: number
}

export interface User {
    id: number,
    name: string,
    email: string
}