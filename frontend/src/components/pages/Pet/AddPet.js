import styles from './AddPet.module.css'
import { FaPaw } from 'react-icons/fa';
import api from '../../../utils/api'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

/*Hooks*/
import useFlashMessage from '../../../hooks/useFlashMessage'
//components
import PetForm from '../../form/PetForm'

function AddPet(){
    return (
        <section className={styles.addpet_header}>
            <h1>AddPet </h1>
            <div>Cadastre um Pet <FaPaw /></div>
            <p>Após o cadastro seu pet ficará disponível para adoção</p>
            <p>formulario</p>
            <PetForm btnText='Cadastrar PET'/>
            
        </section>
    )
}
export default AddPet