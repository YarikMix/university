import "../FacultyForms.sass"
import {BsFillCameraFill} from "react-icons/bs";
import PopUpWindow from "../../../../components/popUpWindow/popUpWindow";
import {useFacultyAddForm} from "../../../../hooks/faculties/useFacultyAddForm";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/variables";
import {useState} from "react";
import {useFaculties} from "../../../../hooks/faculties/useFaculties";
import {errorMessage, successMessage} from "../../../../utils/toasts";
import {useToken} from "../../../../hooks/users/useToken";
import {api} from "../../../../utils/api";

const AddFacultyForm = () => {

    const {isOpen, faculty, updateFacultyName, updateFacultyImage, closeForm} = useFacultyAddForm()

    const { setFaculties } = useFaculties();

    const {access_token} = useToken()

    const [img, setImg] = useState<File | undefined>()

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            updateFacultyImage(URL.createObjectURL(img))
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        await createFaculty()

    }

    const createFaculty = async () => {
        try {

            const response = await api.post(`faculties/create/`, {}, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'authorization': access_token
                }
            })

            if (response.status == 201){
                const faculty_id = response.data["id"]
                await updateFaculty(faculty_id)
            }

        } catch (e) {

            errorMessage("Что-то пошло не так :(")

        }
    }

    const updateFaculty = async (faculty_id) => {

        try {

            let form_data = new FormData()

            form_data.append('name', faculty.name)

            if (img != undefined) {
                form_data.append('image', img, img.name)
            }

            const response = await api.put(`faculties/${faculty_id}/update/`, form_data, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'authorization': access_token
                }
            })

            if (response.status == 200) {
                successMessage(`Факультет '${faculty.name}' успешно добавлен!`)
                setFaculties(response.data)
                closeForm()
                setImg(undefined)
            }

        } catch (e) {

            errorMessage("Что-то пошло не так :(")

        }
    }

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
                            <input type="file" accept="image/*" name="image" alt="" onChange={handleFileChange}/>
                            <BsFillCameraFill />
                        </div>
                    </div>
                </div>

                <div className="center">

                    <input type="text" placeholder="Название" value={faculty.name} name="name" onChange={(e) => updateFacultyName(e.target.value)} required/>

                </div>

                <div className="bottom">
                    <CustomButton bg={variables.primary} text="Добавить" />
                </div>

            </form>

        </PopUpWindow>

    )
}

export default AddFacultyForm