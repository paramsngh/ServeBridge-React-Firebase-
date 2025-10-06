import * as functions from "firebase-functions";
import admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

export const createOpportunity = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required');
  const uid = context.auth.uid;
  const {
    title, description, type, skillsRequired = [], startTime = null, endTime = null,
    city, lat = null, lng = null, neededCount = 1, itemNeeded = null, quantity = null
  } = data || {};

  if (!title || !description || !city || !type) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  const opp = {
    orgId: uid,
    title, description, type, skillsRequired,
    startTime, endTime, city, lat, lng,
    neededCount, itemNeeded, quantity,
    status: 'open',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };
  const ref = await db.collection('opportunities').add(opp);
  return { id: ref.id };
});

export const applyToOpportunity = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required');
  const uid = context.auth.uid;
  const { oppId, message = '' } = data || {};
  if (!oppId) throw new functions.https.HttpsError('invalid-argument', 'oppId required');

  const app = {
    oppId, volunteerId: uid, message, status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };
  const ref = await db.collection('applications').add(app);
  return { id: ref.id };
});

export const reviewApplication = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required');
  const uid = context.auth.uid;
  const { applicationId, decision } = data || {};
  if (!applicationId || !['accepted','declined'].includes(decision)) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid args');
  }
  const doc = await db.collection('applications').doc(applicationId).get();
  if (!doc.exists) throw new functions.https.HttpsError('not-found', 'Application missing');
  const app = doc.data();
  const opp = await db.collection('opportunities').doc(app.oppId).get();
  if (!opp.exists || opp.data().orgId !== uid) {
    throw new functions.https.HttpsError('permission-denied', 'Only org owner can review');
  }
  await doc.ref.update({ status: decision });
  return { ok: true };
});
