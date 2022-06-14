import React from 'react'
import styles from './Investor.module.css'
const Startup = ({userdetails}) => {
  return (
    <div className={styles.mainContainer}>
        <h1>Startup Page</h1>
        <h2 className={styles.userHeading}>{userdetails.username}</h2>
    </div>
  )
}

export default Startup