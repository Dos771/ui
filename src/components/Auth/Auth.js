import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../context/auth'

import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import './Auth.sass'



const Auth = (props) => {

  const referer = props.location.state ? props.location.state.referer : '/'

  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isError, setIsError] = useState(false)
  const [userName, setUserName] = useState("")
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  })
  const { setAuthTokens } = useAuth()

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }


  const authLogin = (e) => {
    e.preventDefault()

    axios.post('http://94.130.172.45:8000/api/v1/token/', {
      email: userName, password: values.password
    }).then(result => {

      if (result.status === 200) {
        setAuthTokens(result.data.access)
        setLoggedIn(true)
      } else {
        setIsError(true)
      }

    }).catch(e => {
      setIsError(true)
    })


  }

  if (isLoggedIn) {
    return <Redirect to={referer} />
  }


  return (
    <div className="wrap-auth">
      <div className='block-auth'>
        <form noValidate autoComplete="off" onSubmit={authLogin}>
          <h2 className='name-auth'>Авторизация</h2>

          <div className="section-auth">
            <TextField
              id="email-auth"
              label="Email"
              variant="outlined"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>

          <div className="section-auth">
            <FormControl variant="outlined">
              <InputLabel htmlFor="password-auth">Пароль</InputLabel>
              <OutlinedInput
                id="password-auth"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
          </div>

          <div className="section-btn">
            <Button variant="contained" type="submit" color="primary">Войти</Button>
          </div>

          { isError &&<b className="errorText">Указанное имя пользователя или пароль неверны!</b> }

        </form>
      </div>
    </div>
  )
  
}

export default Auth
















