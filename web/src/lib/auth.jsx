import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const AuthCtx = createContext({ user: null, profile: null, loading: true, signOut: () => {} })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        const snap = await getDoc(doc(db, 'users', u.uid))
        setProfile(snap.exists() ? snap.data() : null)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const signOut = () => fbSignOut(auth)

  return (
    <AuthCtx.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
