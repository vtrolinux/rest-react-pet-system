import styles from './PetDetails.module.css'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails(){

    const [pet, setPet] = useState({})
  const { id } = useParams()

    return(
        <section>
            <h1>Detalhes do Pet</h1>
        </section>
    )
}

export default PetDetails