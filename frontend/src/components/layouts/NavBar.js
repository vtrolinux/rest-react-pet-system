import {Link} from 'react-router-dom'
import logo from '../../assets/img/Cat.gif'
function NavBar(){
    return (
        <nav>
            <div>
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