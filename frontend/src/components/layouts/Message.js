import {useState , useEffect} from 'react'
import bus from '../../utils/bus'
import styles from './Message.module.css'

function Message() {
    const [visibility, setVisibility] = useState(false)//mostra-a apenas quando necessario
    const [message, setMessage] = useState('')//text message
    const [type, setType] = useState('') //tipo de messagem

    //permitir que o evento seja observado apenas uma vez, evitando loops infinitos
    /*inicializacao da estrutura do useEffect, a ser observado L:13 },[] ), preenchendo o array posteriormente baseado no evento observado*/

    useEffect(() => {
        //bus > evento a ser observado
        bus.addListener('flash', ({ message, type }) => {

            setVisibility(true)
            setMessage(message)
            setType(type)

            setTimeout(()=>{
                setVisibility(false)
            },3000)

        })

    },[] )
    return (
        visibility && ( <div className={`${styles.message} ${styles[type]}`}>{message}</div> )
    )
}

export default Message