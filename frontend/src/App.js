import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//componentes
import NavBar from './components/layouts/NavBar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'
import Message from './components/layouts/Message'
//pages
import Login from './components/pages/Auth/login'
import Register from './components/pages/Auth/register'
import Home from './components/pages/Home'
import Profile from './components/pages/User/profile'
import Mypets from  './components/pages/Pet/MyPets'
import AddPet from './components/pages/Pet/AddPet'
import EditPet from './components/pages/Pet/EditPet'
import PetDetails from './components/pages/Pet/PetDetails'
import MyAdoptions from './components/pages/Pet/MyAdoptions'
//contexts
import {UserProvider} from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <NavBar />
        <Message />
          <Container>
            <Routes>

              <Route path='/login' element={<Login />} />
                      
              <Route path='/register' element={<Register />} />
                            
              <Route path='/user/profile' element={<Profile />}/>
                
              <Route path='/pet/mypets' element={<Mypets />} />
                
              <Route path="/pet/myadoptions" element={<MyAdoptions />} />
                
              <Route path='/pet/add' element={<AddPet />} />

              <Route path='/pet/edit/:id' element={<EditPet />} />
                
              <Route path='/pet/:id' element={<PetDetails />} />
                    
              <Route path='/' element={<Home />} />

            </Routes>
          </Container>
        <Footer />
      </UserProvider>
    </Router>
  )
}

export default App;
