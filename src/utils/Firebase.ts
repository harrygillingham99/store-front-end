import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyB_SOBfp4UoQMwEdJd_EvRMB68tt1jrK08",
  authDomain: "e-commerce-assignment-295115.firebaseapp.com",
  databaseURL: "https://e-commerce-assignment-295115.firebaseio.com",
  projectId: "e-commerce-assignment-295115",
  storageBucket: "e-commerce-assignment-295115.appspot.com",
  messagingSenderId: "231402939879",
  appId: "1:231402939879:web:dc92f1307204ac98028942",
};

export const signInWithGoogle = async (
  setUser: (user: firebase.User | undefined) => void
) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((res) => setUser(res.user ?? undefined));
};
export const signInAnonymously = async (
  setUser: (user: firebase.User | undefined) => void
) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase
    .auth()
    .signInAnonymously()
    .then((res) => setUser(res.user ?? undefined));
};
export const signInWithEmailPassword = async (
  setUser: (user: firebase.User | undefined) => void, email : string, password: string
) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => setUser(res.user ?? undefined));
};
export const signOut = (setUser: (user: firebase.User | undefined) => void) => {
  firebase
    .auth()
    .signOut()
    .then(() => setUser(undefined));
};
