import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//componentes
import NavBar from './components/layouts/NavBar'
import Footer from './components/layouts/Footer'
//pages
import Login from './components/pages/Auth/login'
import Register from './components/pages/Auth/register'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      <NavBar />
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
      <Footer />
    </Router>
  )
}

export default App;
