import api from '../../../utils/api'
import styles from './PetDetails.module.css'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails(){

    const [pet, setPet] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    },[id])

    return(
        <section>
            <h1>Detalhes do Pet: {pet.name}</h1>
        </section>
    )
}

export default PetDetails