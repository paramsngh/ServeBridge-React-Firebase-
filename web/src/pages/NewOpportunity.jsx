import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { createOpp } from '../lib/api'
import { useToast } from '../lib/toast.jsx'

export default function NewOpportunity(){
  const { user, profile, loading } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'org')) navigate('/login')
  }, [user, profile, loading, navigate])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('Toronto')
  const [type, setType] = useState('volunteer_shift')

  async function create(){
    try {
      const id = await createOpp({ title, description, city, type })
      toast.success('Opportunity posted', 'Your post is now live.')
      setTitle(''); setDescription('')
    } catch (e) {
      toast.error('Could not post opportunity', e?.message || 'Please try again.')
    }
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-3">Post a New Opportunity</h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <label className="block text-sm">Title
          <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} />
        </label>
        <label className="block text-sm">Description
          <textarea className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" rows="4" value={description} onChange={e=>setDescription(e.target.value)} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">City
            <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={city} onChange={e=>setCity(e.target.value)} />
          </label>
          <label className="block text-sm">Type
            <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={type} onChange={e=>setType(e.target.value)}>
              <option value="volunteer_shift">Volunteer Shift</option>
              <option value="donation_request">Donation Request</option>
            </select>
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={create} className="px-4 py-2 rounded-xl bg-slate-900 text-white">Create</button>
          <button onClick={() => { setTitle(''); setDescription('') }} className="px-4 py-2 rounded-xl border border-slate-300">Clear</button>
        </div>
      </div>
    </div>
  )
}
