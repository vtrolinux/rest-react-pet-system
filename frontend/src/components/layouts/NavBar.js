import {Link} from 'react-router-dom'
import styles from './NavBar.module.css'
import logo from '../../assets/img/petlogo.png'

function NavBar(){
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={logo} alt='pet system'/>
                <h2>Pet System</h2>
            </div>
            <ul>
                <li>
                    <Link to='/'>Adotar</Link>
                </li>
                <li>
                    <Link to='/login'>Entrar</Link>
                </li>
                <li>
                    <Link to='/register'>Cadastrar</Link>
                </li>
            </ul>
        </nav>
    )
}
export default NavBar