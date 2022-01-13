import api from '../../utils/api'
import {Link} from  'react-router-dom'
import {useState, useEffect} from 'react'
import styles from './Home.module.css'

function Home(){

    const [petList, setPets] = useState([])

    useEffect(() => {
        api.get('/pets').then((response) => {
            setPets(response.data.petList) 
        }).catch((error) => {
            
        })
    },[])

    return (
        <section>
            <div>
                <h1>Adote um pet</h1>
                <p>Veja os detalhes sobre o pet e conheça o seu tutor </p>
            </div>
            <div>
                {petList.length > 0 && (
                    petList.map((pet) => (
                        <div>
                            <p>Imagem do pet</p>
                            <h3>{pet.name}</h3>
                            <p>
                                <span className='bold'>Peso: </span> {pet.weight}kg
                            </p>
                            {pet.available ? ( <Link to={`/pet/${pet._id}`}>Mais detalhes</Link> 
                            ) : (
                                <p className={styles.adopted_text}>Adotado!</p>
                            )}
                        </div>
                    ))
                )}
                {petList.length === 0 && (
                    <p>Nao existem pets registrados no sistema de adocao</p>
                )}
            </div>
        </section>
        
    )
}
export default Home