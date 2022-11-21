import { initializeApp } from "firebase/app";
import { DocumentData, FieldValue, getDoc, getFirestore, increment, onSnapshot, QuerySnapshot, updateDoc } from 'firebase/firestore'
import { collection, doc, addDoc, getDocs } from 'firebase/firestore'
import { Unsubscribe } from "redux";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const USERS_COL = "users"
const CANDIDATES_COL = "candidates"

export const getCandidates = async () => {
    const query = await getDocs(collection(db, CANDIDATES_COL))
    return query
}

export const getUserInfo = async (id: string) => {
    const query = await getDoc(doc(db, USERS_COL, id))
    return query
}
/**
 * 
 * @param vote Id of the voted candidate 
 * @param userId Id of the user that is voting
 */
export const setUserVoteFB = async (vote: string, userId: string) => {
    const userDocRef = doc(db, USERS_COL, userId)
    const candDocRef = doc(db, CANDIDATES_COL, vote)
    await updateDoc(userDocRef, { vote });

    await updateDoc(candDocRef, {
        votes: increment(1)
    });
}
interface ICallback {
    (snapshot: QuerySnapshot<DocumentData>): void
}
export const SubscribeToVotesChanges = (callback: ICallback) => {
    const candidatesRef = collection(db, CANDIDATES_COL)
    const unsubscribe = onSnapshot(candidatesRef, callback)
    return unsubscribe
}

export const addUser = async (username: string) => await addDoc(collection(db, USERS_COL), { username, vote: null })