import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/variables";
import PopUpWindow from "../../../../components/popUpWindow/popUpWindow";
import DropdownMenu from "../../../../components/DropdownMenu/DropdownMenu";
import {COURSES, EDUCATION_TYPES} from "../../../../utils/consts";
import {useGroups} from "../../../../hooks/groups/useGroups";
import {useToken} from "../../../../hooks/users/useToken";
import {useGroupAddForm} from "../../../../hooks/groups/useGroupAddForm";
import {infoMessage, successMessage} from "../../../../utils/toasts";
import {api} from "../../../../utils/api";

const AddGroupForm = ({refetch, gotoPage}) => {

    const {faculties} = useGroups()

    const {isOpen, group, setName, closeForm, setCourse, setEducationType, setFaculty, setYearBegin, setYearEnd} = useGroupAddForm()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const {access_token} = useToken()

    const createGroup = async () => {

        if (group.faculty.id == -1) {
            infoMessage("Пожалуйста выберите факультет!")
            return
        }

        const response = await api.post(`groups/create/`, {},{
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200){
            const group_id = response.data["id"]
            await updateGroup(group_id)
            gotoPage && gotoPage(0)
        }
    }

    const updateGroup = async (group_id) => {
        await api.put(`groups/${group_id}/update_faculty/${group.faculty.id}/`,{}, {
            headers: {
                'authorization': access_token
            }
        })

        const data = {
            "id": group.id,
            "name": group.name,
            "status": group.status,
            "course": group.course,
            "education_type": group.education_type,
            "year_begin": group.year_begin,
            "year_end": group.year_end
        }

        const response = await api.put(`groups/${group_id}/update/`, data, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200)
        {
            refetch()
            closeForm()
            successMessage(`Группа '${group.name}' успешно добавлена!`)
        }
    }

    if (group == undefined) {
        return (
            <PopUpWindow isOpen={isOpen} setClose={closeForm}>

            </PopUpWindow>
        )
    }

    return (
        <PopUpWindow isOpen={isOpen} setClose={closeForm}>

            <form className="group-form-wrapper" onSubmit={handleSubmit}>

                <div className="top">

                    <h3>Форма добавления группы</h3>

                </div>

                <div className="bottom">

                    <div className="left">

                        <div className="container">

                            <h3>Факультет</h3>

                            <DropdownMenu
                                options={faculties}
                                selectedOption={group.faculty.id}
                                notSelected={true}
                                setSelectedOption={(id) => {
                                    setFaculty(faculties.find(faculty => faculty.id == id))
                                }}
                            />

                            <img className="faculty-image" src={group.faculty.image} alt=""/>

                        </div>

                    </div>

                    <div className="right">

                        <div className="top-panel">
                            <label htmlFor="name">Название группы</label>
                            <input type="text" placeholder="Название" name="name" id="name" value={group.name} onChange={(e) => setName(e.target.value)} required/>
                        </div>

                        <div className="center-panel">

                            <div className="top-block">

                                <DropdownMenu
                                    options={COURSES.slice(1, COURSES.length)}
                                    selectedOption={group.course}
                                    setSelectedOption={(id) => {
                                        setCourse(id)
                                    }}
                                />

                                <DropdownMenu
                                    options={EDUCATION_TYPES.slice(1, EDUCATION_TYPES.length)}
                                    selectedOption={group.education_type}
                                    setSelectedOption={(id) => {
                                        setEducationType(id)
                                    }}
                                />

                            </div>

                            <div className="bottom-block">

                                <div className="input-item">
                                    <label htmlFor="name">Год начала обучения</label>
                                    <input type="text" placeholder="Год начала обучения" name="year_begin" value={group.year_begin} onChange={(e) => setYearBegin(e.target.value)} required/>
                                </div>

                                <div className="input-item">
                                    <label htmlFor="name">Год конца обучения</label>
                                    <input type="text" placeholder="Год конца обучения" name="year_end" value={group.year_end} onChange={(e) => setYearEnd(e.target.value)}  required/>
                                </div>

                            </div>

                        </div>

                        <div className="bottom-panel">
                            <div className="buttons-container">
                                <CustomButton bg={variables.primary} text="Добавить" onClick={createGroup} />
                            </div>
                        </div>

                    </div>

                </div>


            </form>

        </PopUpWindow>
    )
}

export default AddGroupForm