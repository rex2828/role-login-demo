import './App.css';
import {Navigate, Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Header from './components/Header';
import Signup from './pages/Signup';
import { useState,useEffect } from 'react';
import Startup from './pages/Startup';
import Investor from './pages/Investor';
function App() {
  const [isLogin,setIsLogin] = useState(false)
  const [userdetails,setUserdetails] = useState(null)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
    setUserdetails(user)
    setIsLogin(true)
    }
  },[])


  const loginHandler = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      setUserdetails(user)
      setIsLogin(true)
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem('user')
    setUserdetails(null)
    setIsLogin(false)
  }

  return (
    <div>
      <Header isLogin={isLogin} logoutHandler={logoutHandler}/>
      <Routes>
        <Route path='/' element={<Home userdetails={userdetails}/>}/>
        <Route path='/startup' element={<ProtectedRoute isLogin={isLogin}><Startup userdetails={userdetails}/></ProtectedRoute>}/>
        <Route path='/investor' element={<ProtectedRoute isLogin={isLogin}><Investor userdetails={userdetails}/></ProtectedRoute>}/>
        <Route path='/login' element={<AuthProtectedRoute userdetails={userdetails}><Login loginHandler={loginHandler}/></AuthProtectedRoute>}/>
        <Route path='/signup' element={<AuthProtectedRoute userdetails={userdetails}><Signup/></AuthProtectedRoute>}/>
      </Routes>
    </div>
  );
}

const ProtectedRoute = ({ isLogin, children }) => {
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AuthProtectedRoute = ({ userdetails, children }) => {
  if (userdetails) {
    return <Navigate to="/" replace />;
  }
  return children;
};


export default App;
