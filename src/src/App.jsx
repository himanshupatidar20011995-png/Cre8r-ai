import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { auth } from './firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function App(){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading) return <div className='center'>Loading…</div>

  return (
    <div className='app'>
      <header className='header'>
        <h1>Cre8r AI</h1>
        <p>Create. Explore. Rule.</p>
        {user && (
          <div className='userbar'>
            <span>{user.displayName || user.email}</span>
            <button className='outline' onClick={() => signOut(auth)}>Logout</button>
          </div>
        )}
      </header>
      <main className='main'>
        {!user ? <Login /> : <Dashboard user={user} />}
      </main>
      <footer className='footer'>
        <small>© {new Date().getFullYear()} Cre8r AI</small>
      </footer>
    </div>
  )
}
