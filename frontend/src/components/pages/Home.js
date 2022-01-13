import api from '../../utils/api'
import {Link} from  'react-router-dom'
import {useState, useEffect} from 'react'
import styles from './Home.module.css'

import {GiDogHouse, GiSittingDog} from  'react-icons/gi';


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
            <div className={styles.pet_home_header}>
                <h1>Adote um pet <GiDogHouse /></h1>
                <p>Veja os detalhes sobre o pet e conheça o seu tutor </p>
            </div>
            <div className={styles.pet_container}>
                {petList.length > 0 && (
                    petList.map((pet) => (
                        <div className={styles.pet_card} key={pet._id}>
                            <div
                                style={{ backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,}}
                                className={styles.pet_card_image}
                            ></div>
                            <h3>{pet.name}</h3>
                            <p>
                                <span className='bold'>Peso: </span> {pet.weight}kg
                            </p>
                            {pet.available ? ( <Link to={`/pet/${pet._id}`}> <GiSittingDog /> Mais detalhes </Link> 
                            ) : (
                                <p className={styles.adopted_text}> <GiDogHouse /> Adotado!</p>
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