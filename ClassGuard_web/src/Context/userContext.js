import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../Firebase/Config";
import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';
const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);
export const ContextProivider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  //signInWithPassword
  const signInWithPassword = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    navigate("/");
  };

  // query check email already exist
  const checkEmailAlreadyExist = async (user, idUser) => {
    const q = query(collection(db, "user"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      await setDoc(doc(db, "user", user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: idUser,
        timestamp: serverTimestamp(),
        roles: "user",
      });
      await setDoc(doc(db, "usersPosts", idUser), { messages: [] });
      navigate("/");
    } else {
      navigate("/");
    }
  };

  // signInWithGoogle
  const signInWithGoogle = async () => {
    const ggProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, ggProvider)
      .then(async (result) => {
        const user = result.user;
        const idUser = user.uid;
        checkEmailAlreadyExist(user, idUser);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  // signInWithFaceBook
  const signInWithFaceBook = async () => {
    const fbProvider = new FacebookAuthProvider();
    await signInWithPopup(auth, fbProvider)
      .then(async (result) => {
        const user = result.user;
        const idUser = user.uid;
        checkEmailAlreadyExist(user, idUser);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  // signInWithGitHub
  const signInWithGithub = async () => {
    const ghProvider = new GithubAuthProvider();
    await signInWithPopup(auth, ghProvider)
      .then(async (result) => {
        const user = result.user;
        const idUser = user.uid;
        checkEmailAlreadyExist(user, idUser);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  //onAuthStateChanged
  useEffect(() => {
    setLoading(true);
    const unsubcribe = onAuthStateChanged(auth, async (res) => {
      if (res) {
        setLoading(false);
        const { displayName, email, photoURL, uid, roles } = res;
        setUser({
          displayName: displayName,
          photoURL: photoURL,
          email,
          uid,
          roles,
        });
        // admin
        await getDoc(doc(db, "user", res.uid)).then((doc) => {
          if (doc.data().roles === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        });
        //If the account does not exist in the database => login
      } else if (doc.data().roles !== "admin") {
        setLoading(false);
        navigate("/login");

      }
    });
    return () => {
      unsubcribe();
    };
  }, []);
  const contextValue = {
    user,
    loading,
    signInWithPassword,
    signInWithGoogle,
    signInWithFaceBook,
    signInWithGithub,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
