import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import VolunteerFeed from './pages/VolunteerFeed'
import OrgDashboard from './pages/OrgDashboard'
import NewOpportunity from './pages/NewOpportunity'
import Login from './pages/Login'
import MyApplications from './pages/MyApplications'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <NavBar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<VolunteerFeed />} />
          <Route path="/org" element={<OrgDashboard />} />
          <Route path="/new" element={<NewOpportunity />} />
          <Route path="/applications" element={<MyApplications />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}
