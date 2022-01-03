import Input from "../../form/Input"
import { Link } from 'react-router-dom'
import {useState, useContext} from 'react'
//contexts
import {Context} from '../../../context/UserContext'
//css de todos os formularios
import styles from '../../form/Form.module.css'

function Register(){

    const [user, setUser] = useState({})//inicializa o estado do objeto
    const { register } = useContext(Context)

    function handleOnChange(e) {
        /*sempre que muda uma letra no valor do input e' alterado o valor da propriedade,
        formando o obj que sera enviado para o backend*/
        setUser({...user,[e.target.name]: e.target.value})
    }
    function handleSubmit(e) {
        e.preventDefault()
        //send
        console.log(user)
        register(user)
    }
    return (
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
            <Input
                text='Nome'
                type='text'
                name='name'
                placeholder='Digite o seu nome'
                handleOnChange={handleOnChange}
            />
            <Input
                text='Telefone'
                type='text'
                name='phone'
                placeholder='Telefone de contato'
                handleOnChange={handleOnChange}
            />
            <Input
                text='E-mail'
                type='email'
                name='email'
                placeholder='Informe seu email'
                handleOnChange={handleOnChange}
            />
            <Input
                text='senha'
                type='password'
                name='password'
                placeholder='defina a sua senha'
                handleOnChange={handleOnChange}
            />
            <Input
                text='confirmaçao de senha'
                type='password'
                name='confirmpassword'
                placeholder='confirme sua senha'
                handleOnChange={handleOnChange}
            />
            <input type='submit' value='Cadastrar'/>
            </form>
            <p>
                Já tem conta? <Link to='/login'>Clique aqui.</Link>
            </p>
        </section>
    )
}
export default Register