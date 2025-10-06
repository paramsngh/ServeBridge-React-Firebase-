import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react'

const Ctx = createContext(null)
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

const VARIANTS = {
  success: { ring: 'ring-emerald-200', bg: 'bg-white/90', icon: <CheckCircle size={18} className="text-emerald-600" /> },
  error:   { ring: 'ring-rose-200',    bg: 'bg-white/90', icon: <XCircle size={18} className="text-rose-600" /> },
  warning: { ring: 'ring-amber-200',   bg: 'bg-white/90', icon: <AlertTriangle size={18} className="text-amber-600" /> },
  info:    { ring: 'ring-indigo-200',  bg: 'bg-white/90', icon: <Info size={18} className="text-indigo-600" /> },
}

function ToastCard({ t, onClose }) {
  const { ring, bg, icon } = VARIANTS[t.variant] || VARIANTS.info
  const [pct, setPct] = useState(100)

  useEffect(() => {
    const started = Date.now()
    const i = setInterval(() => {
      const elapsed = Date.now() - started
      const left = Math.max(0, t.duration - elapsed)
      setPct((left / t.duration) * 100)
      if (left <= 0) onClose()
    }, 30)
    return () => clearInterval(i)
  }, [t.duration, onClose])

  return (
    <div className={`group relative w-80 overflow-hidden rounded-2xl border border-slate-200 ${bg} backdrop-blur shadow-lg ring-1 ${ring} transition-all`}>
      <div className="flex items-start gap-3 p-4">
        <div className="mt-0.5">{icon}</div>
        <div className="flex-1">
          <div className="font-medium text-slate-900">{t.title}</div>
          {t.desc && <div className="text-sm text-slate-600 mt-0.5">{t.desc}</div>}
        </div>
        <button onClick={onClose} className="opacity-60 hover:opacity-100 transition">
          <X size={16} />
        </button>
      </div>
      <div className="h-1 w-full bg-slate-100">
        <div className="h-1 bg-slate-900/70 transition-[width] duration-100" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const api = useMemo(() => {
    const remove = id => setToasts(list => list.filter(x => x.id !== id))
    const push = (title, desc, variant = 'info', duration = 3000) => {
      const id = uid()
      setToasts(list => [...list, { id, title, desc, variant, duration }])
      return id
    }
    return {
      toast: {
        show:    (title, desc, ms) => push(title, desc, 'info', ms),
        success: (title, desc, ms) => push(title, desc, 'success', ms),
        error:   (title, desc, ms) => push(title, desc, 'error', ms),
        warning: (title, desc, ms) => push(title, desc, 'warning', ms),
        info:    (title, desc, ms) => push(title, desc, 'info', ms),
        dismiss: remove,
      }
    }
  }, [])

  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed top-5 right-5 z-[9999] flex flex-col gap-3">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <ToastCard t={t} onClose={() => api.toast.dismiss(t.id)} />
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}

export const useToast = () => useContext(Ctx)
