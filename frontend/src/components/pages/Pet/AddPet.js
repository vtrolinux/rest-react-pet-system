import styles from './AddPet.module.css'
import { FaPaw } from 'react-icons/fa';
import api from '../../../utils/api'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

/*Hooks*/
import useFlashMessage from '../../../hooks/useFlashMessage'
//components
import PetForm from '../../form/PetForm'

function AddPet(){
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    async function registerPet(pet){
        //pet recebido pelo componente filho
        let msgType = 'success'
        //para envio de imagem, trabalhar com form data, extraindo as keys do body(obj) e adicionando em um formData
        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {

            if(key === 'images'){
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }  
        })
        //send form data
        const data = await api.post('pets/create', formData,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log(response.data)
            return response.data
        }).catch((err) => {
            console.log(err)
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

        if(msgType !== 'error'){
            navigate('/pet/mypets')
        }
    }

    return (
        <section className={styles.addpet_header}>
            <h1>AddPet </h1>
            <div>Cadastre um Pet <FaPaw /></div>
            <p>Após o cadastro seu pet ficará disponível para adoção</p>
            <p>formulario</p>
            <PetForm handleSubmit={registerPet} btnText='Cadastrar PET'/>
            
        </section>
    )
}
export default AddPet