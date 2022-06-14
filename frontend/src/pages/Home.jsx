import React from 'react'
import styles from './Home.module.css'
import {Link} from 'react-router-dom';
const Home = ({userdetails}) => {

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.userHeading}>Welcome {userdetails?.username || 'User'}</h1>
      {userdetails && <Link className={styles.link} to={userdetails.usertype === 'STARTUP' ? '/startup' : '/investor'}>Go to {userdetails.usertype} Page</Link>}
    </div>
  )
}

export default Home