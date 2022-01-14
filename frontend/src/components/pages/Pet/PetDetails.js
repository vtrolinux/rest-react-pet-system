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

    async function schedule() {
        
    }

    return(
        <>
            {pet.name && (
                <section>
                    <div>
                        <h1>Conhecendo o Pet: {pet.name}</h1>
                        <p>Se tiver interesse, marque uma visita para conhecê-lo!</p>
                    </div>

                    <div>
                        {pet.images.map((image, index) => (
                            <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} alt={pet.name} key={index} />
                        ))}
                    </div>
                    <p> <span className="bold">Peso:</span> {pet.weight}kg </p>
                    <p> <span className="bold">Idade:</span> {pet.age} anos </p>
                    {token ? (
                        <button onClick={schedule}>Solicitar uma Visita</button>
                    ) : (
                        <p>
                        Você precisa <Link to="/register">criar uma conta</Link> para
                        solicitar a visita.
                        </p>
                    )}
                </section>
            )}
        </>
    )
}

export default PetDetails