import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = (props) => {
    return (
      <div className={styles.navbarContainer}>
        <Link to='/' className={styles.logo}>Header</Link>
        {!props.isLogin && (<div>
          <Link to='/login' className={styles.loginLink}>Login</Link>
          <Link to='/signup' className={styles.loginLink}>Signup</Link>
        </div>)}
        {props.isLogin &&  <Link to='/login' className={styles.loginLink} onClick={()=> props.logoutHandler()}>Logout</Link>}
    </div>
    )
}

export default Header