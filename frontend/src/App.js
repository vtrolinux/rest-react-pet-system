import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
            <Switch>

              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/register'>
                <Register />
              </Route>
              <Route path='/user/profile'>
                <Profile />
              </Route>
              <Route path='/pet/mypets'>
                <Mypets />
              </Route>
              <Route path="/pet/myadoptions">
                <MyAdoptions />
              </Route>
              <Route path='/pet/add'>
                <AddPet />
              </Route>
              <Route path='/pet/edit/:id'>
                <EditPet />
              </Route>
              <Route path='/pet/:id'>
                <PetDetails />
              </Route>    
              <Route path='/'>
                <Home />
              </Route>

            </Switch>
          </Container>
        <Footer />
      </UserProvider>
    </Router>
  )
}

export default App;
