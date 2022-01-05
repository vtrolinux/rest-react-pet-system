import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'
import Input from '../../form/Input'
import {useState, useEffect} from 'react'

function Profile(){
    const [user, setUser] = useState({})
    //useEffect pra carregar o usuario do back-end e preencher formulario
    function onFileChange(e){

    }
    function handleChange(e){

    }

    return (
        <section>
        <div className={styles.profile_header}>
            <h1>Profile</h1>
            <p>Preview de imagem:</p>
        </div>
            <form className={formStyles.form_container}>
                <Input 
                    text='Imagem'
                    type='file'
                    name='image'
                    handleOnChange={onFileChange}
                />
                <Input 
                    text='E-mail'
                    type='email'
                    name='email'
                    placeholder='Defina um novo email'
                    handleOnChange={handleChange}
                    value={ user.email || ''}
                />
                <Input 
                    text='Nome'
                    type='text'
                    name='name'
                    placeholder='Defina seu nome'
                    handleOnChange={handleChange}
                    value={ user.name || ''}
                />
                <Input 
                    text='Telefone'
                    type='text'
                    name='phone'
                    placeholder='Defina seu telefone'
                    handleOnChange={handleChange}
                    value={ user.phone || ''}
                />
                <Input 
                    text='Senha'
                    type='text'
                    name='password'
                    placeholder='Defina sua senha'
                    handleOnChange={handleChange}
                />
                <Input 
                    text='Confirme sua senha'
                    type='text'
                    name='confirmpassword'
                    placeholder='Defina sua senha'
                    handleOnChange={handleChange}  
                />
                <input type='submit' value='Editar'/>
            </form>
        </section>
    )
}
export default Profile