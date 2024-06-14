import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/variables";
import PopUpWindow from "../../../../components/popUpWindow/popUpWindow";
import {useGroupEditForm} from "/src/hooks/groups/useGroupEditForm.ts";
import DropdownMenu from "../../../../components/DropdownMenu/DropdownMenu";
import {COURSES, EDUCATION_TYPES} from "/src/utils/consts.ts";
import {useGroups} from "/src/hooks/groups/useGroups.ts";
import {infoMessage} from "/src/utils/toasts.ts";
import {api} from "/src/modules/api.ts";

const EditGroupForm = ({refetch}) => {

    const {faculties, deleteGroup} = useGroups()

    const {isOpen, group, setName, closeForm, setCourse, setEducationType, setFaculty, setYearBegin, setYearEnd} = useGroupEditForm()

    const deleteButtonClicked = async () => {
        await deleteGroup(group)

        closeForm()
        refetch()
        infoMessage(`Группа '${group.name}' успешно удалена!`)
    }

    const saveButtonClicked = async () => {

        try {
            await api.put(`groups/${group.id}/update_faculty/${group.faculty.id}/`)

            const data = {
                "id": group.id,
                "name": group.name,
                "status": group.status,
                "course": group.course,
                "education_type": group.education_type,
                "year_begin": group.year_begin,
                "year_end": group.year_end
            }

            const response = await api.put(`groups/${group.id}/update/`, data)

            if (response.status == 200){
                closeForm()
                refetch()
                infoMessage(`Группа '${group.name}' успешно обновлена!`)
            }

        } catch (e) {


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

            <div className="group-form-wrapper">

                <div className="top">

                    <h3>Форма редактирования группы</h3>

                </div>

                <div className="bottom">

                    <div className="left">

                        <div className="container">

                            <h3>Факультет</h3>

                            <DropdownMenu
                                options={faculties}
                                selectedOption={group.faculty.id}
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
                                    options={COURSES}
                                    selectedOption={group.course}
                                    setSelectedOption={(id) => {
                                        setCourse(id)
                                    }}
                                />

                                <DropdownMenu
                                    options={EDUCATION_TYPES}
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
                                <CustomButton bg={variables.green} text="Сохранить" onClick={saveButtonClicked} />
                                <CustomButton bg={variables.red} text="Удалить" onClick={deleteButtonClicked} />
                            </div>
                        </div>

                    </div>

                </div>


            </div>

        </PopUpWindow>
    )
}

export default EditGroupForm