import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default function OrgDashboard(){
  const { user, profile, loading } = useAuth()
  const [myOpps, setMyOpps] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const col = collection(db, 'opportunities')
      const q = query(col, where('orgId', '==', user.uid))
      const snap = await getDocs(q)
      setMyOpps(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    }
    if (!loading) {
      if (!user || profile?.role !== 'org') navigate('/login')
      else load()
    }
  }, [user, profile, loading, navigate])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">My Opportunities</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {myOpps.map(o => (
          <div key={o.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-sm text-slate-500 mb-1">{o.type}</div>
            <div className="font-semibold">{o.title}</div>
            <div className="text-sm text-slate-600 mt-1 line-clamp-2">{o.description}</div>
            <div className="text-xs text-slate-500 mt-2">Status: {o.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
