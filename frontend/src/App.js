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
