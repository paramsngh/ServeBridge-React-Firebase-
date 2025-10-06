import React, { useState } from 'react'
import { auth, db } from '../lib/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useToast } from '../lib/toast.jsx'

function authErrorMessage(err) {
  const code = err?.code || ''
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This account already exists. Please sign in instead.'
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Wrong password. Please try again.'
    case 'auth/user-not-found':
      return 'No account found for this email. Please sign up first.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

export default function Login() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('volunteer') // only used on Sign Up
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function signUp() {
    setError(''); setLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', user.uid), { uid: user.uid, email, role })
      toast.success('Account created', 'You can sign in now.')
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  async function signIn() {
    setError(''); setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Welcome back', '')
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Login / Sign up</h2>

        {error && (
          <div className="mb-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}

        <label className="block text-sm mb-2">Email
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            type="email"
            autoComplete="email"
          />
        </label>

        <label className="block text-sm mb-3">Password
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            autoComplete="current-password"
          />
        </label>

        <label className="block text-sm mb-4">Role (only used when signing up)
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="volunteer">Volunteer</option>
            <option value="org">Organization</option>
          </select>
        </label>

        <div className="flex gap-3">
          <button
            onClick={signIn}
            disabled={loading || !email || !password}
            className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 disabled:opacity-50"
          >
            {loading ? 'Please wait…' : 'Sign In'}
          </button>
          <button
            onClick={signUp}
            disabled={loading || !email || !password}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-50"
          >
            {loading ? 'Please wait…' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  )
}
