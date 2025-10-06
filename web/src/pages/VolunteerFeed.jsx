import React, { useEffect, useState } from 'react'
import OpportunityCard from '../components/OpportunityCard'
import { listOpenOpportunities, applyToOpp } from '../lib/api'
import { useAuth } from '../lib/auth.jsx'
import { useToast } from '../lib/toast.jsx'

export default function VolunteerFeed(){
  const [opps, setOpps] = useState([])
  const { profile, loading } = useAuth()
  const { toast } = useToast()

  useEffect(() => { listOpenOpportunities().then(setOpps) }, [])

  async function apply(oppId){
    try {
      await applyToOpp(oppId)
      toast.success('Application sent', 'The organization will review your application.')
    } catch (e) {
      toast.error('Could not apply', e?.message || 'Please try again.')
    }
  }

  const canApply = !loading && profile?.role === 'volunteer'

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Open Opportunities</h2>
      {opps.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-slate-500">
          No posts yet. Check back soon!
        </div>
      )}
      {opps.map(o => (
        <OpportunityCard
          key={o.id}
          opp={o}
          onApply={canApply ? apply : undefined}
        />
      ))}
    </div>
  )
}
