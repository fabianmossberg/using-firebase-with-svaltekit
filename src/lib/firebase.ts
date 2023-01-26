import type { FirebaseOptions, FirebaseApp } from 'firebase/app';
import { query, getFirestore, collection, getDocs, getDoc, doc, connectFirestoreEmulator } from 'firebase/firestore';
import type { DocumentReference, QueryConstraint, CollectionReference, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter, PartialWithFieldValue } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

import { PUBLIC_FIREBASE_CONFIG, PUBLIC_FIREBASE_USE_EMULATOR } from '$env/static/public';
export const firebaseConfig: FirebaseOptions = JSON.parse(PUBLIC_FIREBASE_CONFIG);

let app: FirebaseApp;
let db: Firestore;

// Returns the app if it is initialized, otherwise initializes the app
const getApp = () => app ?? (app = initializeApp(firebaseConfig));


// Returns the DB if it is initialized, otherwise initializes the DB
const getDb = () => {

  // If it is already there, return it.
  if (db) return db;

  // Otherwise, create it.
  const newDB = getFirestore(getApp())

  // If we want to use the emulator, connect to it.
  if (PUBLIC_FIREBASE_USE_EMULATOR === 'true') {
    connectFirestoreEmulator(newDB, 'localhost', 8080);
  }
  db = newDB;
  return db;
}

/* Collection */

export function colRef<T>(ref: CollectionPredicate<T>): CollectionReference<T> {
  return typeof ref === 'string' ? (collection(getDb(), ref) as CollectionReference<T>) : ref;
}

type CollectionPredicate<T> = string | CollectionReference<T>;

export async function getCollection<T>(
  path: CollectionPredicate<T>,
  queryConstraints: QueryConstraint[] = []
): Promise<T[]> {
  const ref = typeof path === 'string' ? colRef<T>(path) : path;
  const q = query(ref, ...queryConstraints);
  const collectionSnap = await getDocs(q);
  return collectionSnap.docs.map((docSnap) => ({
    ...docSnap.data(),
    id: docSnap.id,
  }));
}

/* Document */
type DocPredicate<T> = string | DocumentReference<T>;

export function docRef<T>(ref: DocPredicate<T>): DocumentReference<T> {
  if (typeof ref === 'string') {
    const pathParts = ref.split('/');
    const documentId = pathParts.pop();
    const collectionString = pathParts.join('/');
    return doc<T>(colRef(collectionString), documentId);
  } else {
    return ref;
  }
}

export async function getDocument<T>(ref: DocPredicate<T>): Promise<T> {
  const docSnap = await getDoc(docRef(ref));
  return docSnap.exists() ? { ...(docSnap.data() as T), id: docSnap.id } : null;
}