import api from '../utils/api'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import  useFlashMessage  from './useFlashMessage'

export default function useAuth(){

    const { setFlashMessage } = useFlashMessage()

    async function register(user){

        let msgMessage = 'Cadastro realizado com sucesso'
        let msgType = 'success'
        try {
            const data = await api.post('/auth/register', user).then((response) => {
                return response.data
            })
            
            console.log(data)
        } catch (error) {
            //console.log(error)
            msgMessage = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgMessage, msgType)

    }
    return { register }
}