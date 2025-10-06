import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HeartHandshake } from 'lucide-react'
import { useAuth } from '../lib/auth'

export default function NavBar(){
  const { user, profile, signOut, loading } = useAuth()
  const link = 'text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition'
  const active = ({ isActive }) => isActive ? link + ' bg-slate-200' : link

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white">
              <HeartHandshake size={18} />
            </div>
            <span className="font-semibold text-slate-800">Volunteer Finder</span>
          </Link>

          <nav className="flex items-center gap-1">
            <NavLink to="/" className={active}>Home</NavLink>
            <NavLink to="/feed" className={active}>Volunteer Feed</NavLink>

            {profile?.role === 'volunteer' && (
              <NavLink to="/applications" className={active}>My Applications</NavLink>
            )}

            {profile?.role === 'org' && (
              <>
                <NavLink to="/org" className={active}>Org Dashboard</NavLink>
                <NavLink to="/new" className={active}>Post Opportunity</NavLink>
              </>
            )}

            {!loading && (
              user ? (
                <>
                  <span className="text-xs px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {profile?.role ?? 'user'}
                  </span>
                  <button onClick={signOut} className={link}>Sign out</button>
                </>
              ) : (
                <NavLink to="/login" className={active}>Login</NavLink>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
