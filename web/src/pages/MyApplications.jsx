import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { listMyApplications } from '../lib/api'
import { useToast } from '../lib/toast.jsx'
import { MapPin, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

function StatusChip({ status = 'pending' }) {
  const map = {
    pending:  'bg-amber-50 text-amber-700',
    accepted: 'bg-emerald-50 text-emerald-700',
    declined: 'bg-rose-50 text-rose-700',
  }
  const icons = {
    pending:  <Clock size={14} />,
    accepted: <CheckCircle size={14} />,
    declined: <XCircle size={14} />,
  }
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${map[status] || map.pending}`}>
      {icons[status] || icons.pending} {status}
    </span>
  )
}

export default function MyApplications() {
  const { user, profile, loading } = useAuth()
  const [items, setItems] = useState([])
  const [busy, setBusy] = useState(false)
  const nav = useNavigate()
  const { toast } = useToast()

  async function load() {
    setBusy(true)
    try {
      const data = await listMyApplications()
      setItems(data)
    } catch (e) {
      toast.error('Could not load applications', e?.message || 'Please try again.')
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      if (!user || profile?.role !== 'volunteer') nav('/login')
      else load()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile, loading])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Applications</h2>
        <button onClick={load} disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50">
          <RefreshCw size={16}/> Refresh
        </button>
      </div>

      {items.length === 0 && !busy && (
        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-slate-500">
          You haven’t applied to anything yet.
        </div>
      )}

      <div className="grid gap-4">
        {items.map(a => {
          const opp = a.opp
          const d = a.createdAt?.toDate ? a.createdAt.toDate() : null
          const when = d ? d.toLocaleString() : '—'
          return (
            <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1"><StatusChip status={a.status || 'pending'} /></div>
                  <div className="font-semibold text-lg">
                    {opp?.title || 'Opportunity unavailable'}
                  </div>
                  {opp?.description && (
                    <div className="text-sm text-slate-600 mt-1 line-clamp-2">{opp.description}</div>
                  )}
                  <div className="flex flex-wrap items-center gap-3 text-slate-500 text-sm mt-3">
                    {opp?.city && <span className="inline-flex items-center gap-1"><MapPin size={16}/> {opp.city}</span>}
                    <span className="inline-flex items-center gap-1"><Clock size={16}/> Applied {when}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
