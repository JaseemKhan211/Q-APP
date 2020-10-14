import React, { useState, useEffect } from 'react';
import Router from './config/Router/index';
import { firebase } from './config/Firebase/index';
import './index.css';



function App() {
  
  const [isLoggedIn, setLoggedIn] = useState(true)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    listenAuthentication()
  }, [])

  const listenAuthentication = () => {
    firebase.auth().onAuthStateChanged(function(user) { 
      setLoading(false)
      setLoggedIn(user ? { email: user.email, uid: user.uid } : false)
    })
  }

  return (
    <>
      <Router isLoggedIn={isLoggedIn} isLoading={isLoading}/>
        <div className="btn-3">
          {
            isLoggedIn 
            && 
            !isLoading 
            && 
            <button 
              className="btn-2" 
              onClick={() => firebase.auth().signOut()}
            >
              Logout
            </button>
          }
        </div>
    </>
  )
}

export default App;