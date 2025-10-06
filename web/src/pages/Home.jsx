import React from 'react'
import { motion } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-8 md:p-12 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/15 rounded-2xl"><HeartHandshake /></div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Volunteer Finder</h1>
            <p className="mt-2 text-white/90 max-w-2xl">Connect volunteers and donations with local organizations. Simple posting for orgs, beautiful browsing for volunteers.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/feed" className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-xl font-semibold">Browse Opportunities</Link>
              <Link to="/new" className="inline-flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl text-white">Post an Opportunity</Link>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="rounded-2xl border border-slate-200 p-6 bg-white">
          <h3 className="font-semibold">For Volunteers</h3>
          <p className="text-slate-600 text-sm mt-1">Find nearby shifts or donation requests that match your interests and availability.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6 bg-white">
          <h3 className="font-semibold">For Organizations</h3>
          <p className="text-slate-600 text-sm mt-1">Post needs in minutes and manage applications in a clean dashboard.</p>
        </div>
      </div>
    </section>
  )
}
