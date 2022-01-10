import {useState, useEffect} from  'react'
import {Link} from 'react-router-dom'
import api from '../../../utils/api'

import RoundedImage from '../../layouts/RoundedImage'
/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyPets(){

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    //x1
    useEffect(() => {
        api.get('/pets/mypets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }}).then((response) => {
            console.log(response.data.pets)
            setPets(response.data.pets)
        })
    },[token])//dependencia

    return (
        <section>
            <h1>MyPets</h1>
            <Link to='/pet/add'> Cadastrar Pet </Link>
            <div>
                {pets.length > 0 && ( <p>meus pets cadastrados </p> )}
                {pets.length === 0 && ( <p>voce nao possui pets cadastrados </p> )}
            </div>
        </section>
    )
}
export default MyPets