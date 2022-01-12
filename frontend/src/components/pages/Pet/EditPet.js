import api from '../../../utils/api'
import {useState, useEffect} from 'react'
import styles from './AddPet.module.css'
import PetForm from '../../form/PetForm'
import useFlashMessage from  '../../../hooks/useFlashMessage'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function EditPet(){
    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()// pega ip do parametro no frontend -> react router dom -> App.js Route path='/pet/edit/:id'
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get(`/pets/${id}`, {
            headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => { setPet(response.data.pet) })
    }, [token, id]) //dependencias

    async function updatePet(pet){
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append(`images`, pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`pets/edit/${pet._id}`, formData, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data)
            return response.data
        }).catch((error) => {
            msgType = 'error'
            return error.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando o Pet: {pet.name}</h1>
                <p>Depois da edição os dados serão atualizados no sistema</p>
            </div>
            {pet.name &&
                <PetForm handleSubmit={updatePet} btnText='Atualizar' petData={pet} />
            }
        </section>
    )
}
export default EditPet