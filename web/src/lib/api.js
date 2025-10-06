import { db, auth } from './firebase'
import {
  collection, addDoc, getDocs, getDoc, doc,
  query, where, limit, serverTimestamp
} from 'firebase/firestore'

// Feed (open opps), sorted client-side to avoid composite index requirement
export async function listOpenOpportunities() {
  const col = collection(db, 'opportunities')
  const q = query(col, where('status','==','open'), limit(50))
  const snap = await getDocs(q)
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  items.sort((a,b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
  return items
}

export async function createOpp({ title, description, city, type }) {
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error('Must be signed in as an Organization')
  const ref = await addDoc(collection(db, 'opportunities'), {
    orgId: uid, title, description, city, type,
    status: 'open', createdAt: serverTimestamp()
  })
  return ref.id
}

export async function applyToOpp(oppId) {
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error('Must be signed in as a Volunteer')
  const ref = await addDoc(collection(db, 'applications'), {
    oppId, volunteerId: uid, status: 'pending', createdAt: serverTimestamp()
  })
  return ref.id
}

// NEW: list applications for the signed-in volunteer (with joined opportunity)
export async function listMyApplications() {
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error('Must be signed in')

  const col = collection(db, 'applications')
  const q = query(col, where('volunteerId','==', uid), limit(50))
  const snap = await getDocs(q)
  const apps = snap.docs.map(d => ({ id: d.id, ...d.data() }))

  const enriched = await Promise.all(apps.map(async a => {
    try {
      const ds = await getDoc(doc(db, 'opportunities', a.oppId))
      return { ...a, opp: ds.exists() ? { id: ds.id, ...ds.data() } : null }
    } catch {
      return { ...a, opp: null }
    }
  }))

  enriched.sort((a,b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
  return enriched
}
