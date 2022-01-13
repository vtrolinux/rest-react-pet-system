import styles from './Footer.module.css'
import {FaPaw} from  'react-icons/fa'

function Footer(){
    return (
        <footer className={styles.footer}>
            <p> <span className='bold'><FaPaw/> Pet System</span> &copy; 2022 <FaPaw/></p>
        </footer>
    )
}
export default Footer