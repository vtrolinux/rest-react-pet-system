import {useState} from 'react'
import styles from './Message.module.css'

function Message() {

    const [type, setType] = useState('') //tipo de messagem

    return (
        <div className={`${styles.message} ${styles.type}`}>minha mensagem</div>
    )
}

export default Message