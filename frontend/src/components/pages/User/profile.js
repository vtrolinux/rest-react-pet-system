import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'
import Input from '../../form/Input'
import {useState, useEffect} from 'react'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../layouts/RoundedImage'

function Profile(){
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    //useEffect pra carregar o usuario do back-end e preencher formulario
    //depende do token para acessar api
    useEffect(() => {
        api.get('/auth/checkauth',{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => { setUser(response.data.user) })
    }, [token])

    function onFileChange(e){
        setPreview(e.target.files[0])
        setUser({...user,[e.target.name]: e.target.files[0]})
    }
    function handleChange(e){
        setUser({...user,[e.target.name]: e.target.value})
        //console.log(user)
    }
    async function handleSubmit(e){

        e.preventDefault()

        let msgType = 'success'

        //por ter imagem, o uso do formData
        const formData = new FormData()
        //transfere os valores do obj o form data
        Object.keys(user).forEach((key) => formData.append(key, user[key]))
        
        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
              'Content-Type': 'multipart/form-data',
            },
        }).then((response) => { 
            return response.data
        }).catch((error) => {
            console.log(error)
            msgType = 'error'
            return error.response.data
        })
        console.log(data)
        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
        <div className={styles.profile_header}>
            <h1>Profile</h1>
            {(user.image || preview) && (
                <RoundedImage src={ preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/users/${user.image}` } alt={user.name}/>
            )}
        </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
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