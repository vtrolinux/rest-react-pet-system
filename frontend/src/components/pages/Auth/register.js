import Input from "../../form/Input"
import { Link } from 'react-router-dom'
//css de todos os formularios
import styles from '../../form/Form.module.css'

function Register(){
    function handleOnChange(e) {
        
    }
    return (
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form>
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