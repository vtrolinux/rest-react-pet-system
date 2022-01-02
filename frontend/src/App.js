import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//pages
import Login from './components/pages/Auth/login'
import Register from './components/pages/Auth/register'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App;
