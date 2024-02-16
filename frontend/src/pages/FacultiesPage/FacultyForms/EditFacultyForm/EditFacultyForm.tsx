import "../FacultyForms.sass"
import {BsFillCameraFill} from "react-icons/bs";
import PopUpWindow from "../../../../components/popUpWindow/popUpWindow";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/variables";
import {useEffect, useRef, useState} from "react";
import TrashButton from "../../../../components/TrashButton/TrashButton";
import {useFacultyEditForm} from "../../../../hooks/faculties/useFacultyEditForm";
import {errorMessage, infoMessage, successMessage} from "../../../../utils/toasts";
import {useToken} from "../../../../hooks/users/useToken";
import {useFaculties} from "../../../../hooks/faculties/useFaculties";
import {api} from "../../../../utils/api";

const EditFacultyForm = () => {

    const {isOpen, faculty, updateFacultyName, updateFacultyImage, closeForm} = useFacultyEditForm()

    const {setFaculties} = useFaculties()

    const [img, setImg] = useState<File | undefined>(undefined);

    const {access_token} = useToken()

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            updateFacultyImage(URL.createObjectURL(img))
        }
    }

    const saveButtonClicked = async () => {
        try {

            let form_data = new FormData()

            form_data.append('name', faculty.name)

            if (img != undefined) {
                form_data.append('image', img, img.name)
            }

            const response = await api.put(`faculties/${faculty.id}/update/`, form_data, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'authorization': access_token
                }
            })

            if (response.status == 200) {
                successMessage(`Факультет '${faculty.name}' успешно обновлён!`)
                setFaculties(response.data)
                closeForm()
                setImg(undefined)
            }

        } catch (e) {

            errorMessage("Что-то пошло не так :(")

        }
    }

    const deleteButtonClicked = async () => {
        try {

            const response = await api.delete(`faculties/${faculty.id}/delete/`, {
                headers: {
                    'authorization': access_token
                }
            })

            if (response.status == 200) {
                infoMessage(`Факультет '${faculty.name}' успешно удалён!`)
                setFaculties(response.data)
                closeForm()
                setImg(undefined)
            }

        } catch (e) {

            errorMessage("Что-то пошло не так :(")

        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

    }

    const input = useRef(null)

    useEffect(() => {
        if (faculty != undefined) {
            input.current.value = faculty.name
        }
    }, [faculty])

    if (faculty == undefined) {
        return (
            <PopUpWindow isOpen={isOpen} setClose={closeForm}>

            </PopUpWindow>
        )
    }

    return (

        <PopUpWindow isOpen={isOpen} setClose={closeForm}>

            <form className="faculty-form-wrapper" onSubmit={handleSubmit}>

                <div className="top">
                    <div className="container">
                        <img src={faculty.image} className="faculty-image" alt=""/>
                        <div className="round">
                            <input type="file" accept="image/*" alt="" onChange={handleFileChange}/>
                            <BsFillCameraFill />
                        </div>
                    </div>
                </div>

                <div className="center">

                    <input type="text" placeholder="Название" ref={input} name="name" onChange={(e) => updateFacultyName(e.target.value)} required/>

                </div>

                <div className="bottom">
                    <CustomButton bg={variables.green} text="Сохранить" onClick={saveButtonClicked} />
                    <TrashButton onClick={deleteButtonClicked} />
                </div>

            </form>

        </PopUpWindow>

    )
}

export default EditFacultyForm