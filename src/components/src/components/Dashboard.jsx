import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

export default function Dashboard({ user }) {
  return (
    <div className="card">
      <h2>Welcome, {user.email || user.displayName} 👋</h2>
      <p>You are logged in to <strong>Cre8r AI</strong>.</p>

      <div className="tools">
        <h3>Creator Tools</h3>
        <ul>
          <li>🖋️  AI Text Generator</li>
          <li>🎨  Image Creator</li>
          <li>🎥  Video Script Helper</li>
          <li>🎙️  Voiceover Assistant</li>
        </ul>
      </div>

      <button onClick={() => signOut(auth)}>
        Log Out
      </button>
    </div>
  )
}
