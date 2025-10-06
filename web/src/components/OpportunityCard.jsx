import React from 'react'
import { Calendar, MapPin, HandHeart } from 'lucide-react'

export default function OpportunityCard({ opp, onApply }) {
  const isDonation = opp.type === 'donation_request'
  const showApply = typeof onApply === 'function'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-1 rounded-full ${isDonation ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`}>
              {isDonation ? 'Donation' : 'Volunteer Shift'}
            </span>
          </div>
          <h3 className="text-lg font-semibold leading-snug">{opp.title}</h3>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{opp.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-slate-500 text-sm mt-3">
            {opp.city && (
              <span className="inline-flex items-center gap-1"><MapPin size={16}/> {opp.city}</span>
            )}
            {(opp.startTime || opp.endTime) && (
              <span className="inline-flex items-center gap-1"><Calendar size={16}/> {opp.startTime || ''}</span>
            )}
          </div>
        </div>

        {showApply && (
          <button
            onClick={() => onApply(opp.id)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 active:scale-[0.99]"
          >
            <HandHeart size={16}/> Apply / Pledge
          </button>
        )}
      </div>

      {Array.isArray(opp.skillsRequired) && opp.skillsRequired.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {opp.skillsRequired.map((s, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">{s}</span>
          ))}
        </div>
      )}
    </div>
  )
}
