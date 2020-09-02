import { firebaseAuth } from '../firebase-config';
import {verifyStringValue} from '../../../assets/utils.js'
import { document } from "../../firestore";

const onAuthStateChanged = (callback) =>
  firebaseAuth.onAuthStateChanged(callback);

const currentUser = () => {
  const user = firebaseAuth.currentUser;
  return user ? user.uid : ""
};

const signInWithEmailAndPasswordService = (email, password) => {
  return firebaseAuth.signInWithEmailAndPassword(email, password);
};

const createUserWithEmailAndPasswordService = (email, password) => {
  return firebaseAuth.createUserWithEmailAndPassword(email, password);
};

const signOutService = async (isLogin) => {
  try {
    await firebaseAuth.signOut();
    if (!isLogin) {
      localStorage.removeItem("POSITION");
      localStorage.removeItem("TYPE_FLAG");
    }
  } catch (error) {
    if (isLogin) {
      throw new Error("El usuario o contraseña no son válidos.");
    } else {
      throw new Error("Hubo un error al cerrar sesión.");
    }
  }
};

const signInWithEmailAndPassword = async (email, pass) => {
  const emailVerify = verifyStringValue(email.toLowerCase());
  const passwordVerify = verifyStringValue(pass);

  const path = "usuarios";
  const pathSession = "user";

  try {
    const response = await signInWithEmailAndPasswordService(emailVerify, passwordVerify);
    const pathRef = document(`${path}/${response.user.uid}`);
    const isValidUser = await pathRef.get();

    if (isValidUser.exists) {
      localStorage.setItem("TYPE_FLAG", pathSession);
      return true;
    } else {
      await signOutService(true);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  currentUser,
  onAuthStateChanged,
  signInWithEmailAndPasswordService,
  createUserWithEmailAndPasswordService,
  signOutService,
  signInWithEmailAndPassword
};
