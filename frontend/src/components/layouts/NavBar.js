import {Link} from 'react-router-dom'
import styles from './NavBar.module.css'
import logo from '../../assets/img/petlogo.png'
//context
import { useContext } from 'react'
import { Context } from '../../context/UserContext'
import { FaPaw } from 'react-icons/fa';


function NavBar(){

    const {authenticated, logout} = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={logo} alt='pet system'/>
                <h2>Pet System <FaPaw /></h2>
            </div>
            <ul>
                <li>
                    <Link to='/pet/myadoptions'>Minhas Adoções</Link>
                </li>
                <li>
                    <Link to='/'>Adotar</Link>
                </li>
                {authenticated ? 
                (<>
                <li>
                    <Link to='/pet/mypets'>Meus Pets</Link>
                </li>
                <li>
                    <Link to='/user/profile'>Perfil</Link>
                </li>
                <li onClick={logout}>Sair</li>
                </>
                ) : (
                <>
                    <li>
                        <Link to='/login'>Entrar</Link>
                    </li>
                    <li>
                        <Link to='/register'>Cadastrar</Link>
                    </li>
                </>)}
            </ul>
        </nav>
    )
}
export default NavBar