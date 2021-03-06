import api from '../utils/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  useFlashMessage  from './useFlashMessage'

export default function useAuth(){
    const [ authenticated, setAuthenticated] = useState(false)// inicializacao do estado de autenticacao
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    //effect que insere o token no header automaticamente para as requests
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

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
        navigate('/')
    }
    async function login(user){
        let msgText = 'Login Efetuado com sucesso'
        let msgType = 'success'
        try {
            
            const data = await api.post('/auth/login', user).then((response) => { return response.data})
            console.log(data)
            await authUser(data) //autentica e persiste baseado na resposta do backend
        } catch (error) {
            msgText = error.response.data.error.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }
    async function logout(){
        const msgText = 'Logout realizado com sucesso'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined

        navigate('/')
        setFlashMessage(msgText, msgType)
    }
    return { authenticated, register, logout, login }
}