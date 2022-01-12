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