import api from '../utils/api'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import  useFlashMessage  from './useFlashMessage'

export default function useAuth(){
    const [ authenticated, setAuthenticated] = useState(false)// inicializacao do estado de autenticacao
    const { setFlashMessage } = useFlashMessage()
    const history = useHistory()

    async function register(user){

        let msgMessage = 'Cadastro realizado com sucesso'
        let msgType = 'success'
        try {
            const data = await api.post('/auth/register', user).then((response) => { return response.data })
            
            console.log(data)
            await authUser(data)

        } catch (error) {
            //console.log(error)
            msgMessage = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgMessage, msgType)

    }
    async function authUser(data){

        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        history.push('/')
    }
    return { register }
}