import React, { useState } from 'react'
import { auth, googleProvider } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handle = async (fn) => {
    try {
      setBusy(true); setError('')
      await fn()
    } catch (e) {
      setError(e.message || String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className='card'>
      <h2>Login to Cre8r AI</h2>
      <input
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete='email'
      />
      <input
        placeholder='Password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete='current-password'
      />
      <div className='row'>
        <button disabled={busy} onClick={() => handle(() => signInWithEmailAndPassword(auth, email, password))}>
          {busy ? 'Please wait…' : 'Login'}
        </button>
        <button className='outline' disabled={busy} onClick={() => handle(() => createUserWithEmailAndPassword(auth, email, password))}>
          {busy ? 'Please wait…' : 'Sign up'}
        </button>
      </div>
      <div className='divider'><span>OR</span></div>
      <button onClick={() => handle(() => signInWithPopup(auth, googleProvider))}>
        Continue with Google
      </button>
      {error && <p className='error'>{error}</p>}
      <p className='hint'>Tip: enable Email/Password and Google providers in Firebase → Authentication.</p>
    </div>
  )
}
