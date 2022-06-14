import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

const Login = (props) => {

  const [user,setUser] = useState('INVESTOR')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(false);
  const navigate = useNavigate()

  const formSubmitHandler = async (e) => {
    e.preventDefault()
      setError(false)
      if(!name || !password) {
        setError(true)
        return
      }
      const passedObj = {
        username: name,
        password,
        usertype: user
      }
      const rawResponse = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passedObj)
      });
      const response = await rawResponse.json();
      if(response.status === "failed"){
        setError(true)
        return;
      }
      localStorage.setItem('user',JSON.stringify(response.user))
      props.loginHandler()
      if(response.user.usertype === "STARTUP"){
        navigate('/startup')
      } else {
        navigate('/investor')
      }
      setError(false)
  }

  return (
    <div className={styles.loginFormContainer}>
        <form className={styles.loginForm} onSubmit={formSubmitHandler}>
            <input type='text' placeholder='username' className={styles.usernameInput + ' ' + (error ? styles.error : '')} value={name} onChange={(e) => setName(e.target.value)}/>
            <input type='password' placeholder='password' className={styles.passwordInput + ' ' + (error ? styles.error : '')} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="true" />
            <div className={styles.customSelect}>
              <select onChange={(e) => setUser(e.target.value)}>
                <option value="INVESTOR">Investor</option>
                <option value="STARTUP">Startup</option>
              </select>
              <span className={styles.customArrow}></span>
            </div>
            <button className={styles.loginButton} type="submit">Login as {user}</button>
        </form>
    </div>
  )
}

export default Login