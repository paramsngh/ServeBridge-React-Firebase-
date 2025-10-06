import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import VolunteerFeed from './pages/VolunteerFeed'
import OrgDashboard from './pages/OrgDashboard'
import NewOpportunity from './pages/NewOpportunity'

export default function RoutesView() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed" element={<VolunteerFeed />} />
      <Route path="/org" element={<OrgDashboard />} />
      <Route path="/new" element={<NewOpportunity />} />
    </Routes>
  )
}
