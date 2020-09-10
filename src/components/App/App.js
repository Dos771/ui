import React, {useState} from 'react'
import TableList from '../TableList'
import TableTabs from '../TableTabs'
import TableAddItem from '../TableAddItem'
import Auth from '../Auth'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PrivateRoute from '../../service/PrivateRoute'
import { AuthContext } from '../../context/auth'

import './App.sass'

const App = (props) => {

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const existingTokens = JSON.parse(localStorage.getItem('token'))
  const [authTokens, setAuthTokens] = useState(existingTokens || '')

  const setTokens = (data) => {
    if (data) {
      localStorage.setItem('token', JSON.stringify(data))
    } else {
      localStorage.removeItem("token")
    }
    setAuthTokens(data)
  }

  const logOut = () => {
    setAuthTokens()
  }


  return(
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div className="block-app">

          <div className="left-side">
            <Link className="logo" to="/">&nbsp;</Link>
            <ul className='menu-app'>
              <li>
                <Link to="/">Клиенты</Link>
              </li>
              <li>
                <Link className="exit" to="/login" onClick={logOut}>Выход</Link>
              </li>
            </ul>
          </div>

          <div className="right-side">
            <div className="top">
              <h2>Клиенты</h2>
              <div className="section-btn">
                <button className='add-item-btn' onClick={handleOpen}>Добавить</button>
                <TableAddItem open={open} handleClose={handleClose} />
              </div>
            </div>

            <div className="bottom">
              <PrivateRoute path="/companies/:id" component={TableTabs} />
              <PrivateRoute exact path="/" component={TableList} />
              <Route path="/login" component={Auth} />
            </div>
          </div>

        </div>
      </Router>
    </AuthContext.Provider>
  )

}

export default App