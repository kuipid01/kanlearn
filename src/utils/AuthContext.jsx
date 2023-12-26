// Import necessary modules and functions
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, sendEmailVerification, signInWithPopup } from "firebase/auth";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,sendSignInLinkToEmail 
} from "firebase/auth";
import { collection, addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { app, db } from "../../firebase";
import Spin from "../comp/spinner/Spin";
import { toast } from "react-toastify";

// Create a context for authentication
const AuthContext = createContext();

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State for loading status and user information
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Get authentication instance and navigation hook
  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup the subscription on unmount or if dependencies change
    return () => unsubscribe();
  }, [auth]);

  // Function to log in user with email and password
  const loginUser = async (userInfo) => {
    const { email, password } = userInfo;
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setLoading(false)
      toast.success('Login Successful!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      navigate("/");
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      toast.error('An error occured,Try again!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  // Function to log in user with Google
  const loginUserUsingGoogle = async () => {

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("User UID:", user.uid);
      
      // Check if the user document already exists in Firestore based on userId
      const userQuery = query(collection(db, "users"), where("userId", "==", user.uid));
      const userQuerySnapshot = await getDocs(userQuery);
    
      // If a user with the same userId exists, do not create a new document
      if (userQuerySnapshot.size > 0) {
        console.log("User document already exists with the same userId.");
      } else {
        // Add user data to Firestore collection if it doesn't exist
        console.log("User document does not exist. Creating a new one...");
    
        const docRef = await addDoc(collection(db, "users"), {
          email: user.email,
          name: user.displayName,
          userId: user.uid,
        });
        console.log("New user document created with ID:", docRef.id);
      }
    
      setUser(user);
      navigate("/");

    } catch (error) {
    
      console.error("Error signing in with Google:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
    
  };

  // Function to log out user
  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
      toast.success('Logout Successful!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      toast.error('An error occured,Try again!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  // Function to register a new user
  const registerUser = async (userInfo) => {
    setLoading(true);
    const { email, password1: password, name } = userInfo;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      // Add user data to Firestore collection
      const docRef = await addDoc(collection(db, "users"), {
        email,
        name,
        userId: user.uid,
      });
      toast.success('Registration Successful!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        toast.success('Check your mail to confirm your account!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      setUser(user);
      navigate("/");
    } catch (error) {
      toast.error('An error occured,Try again!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } finally {
      setLoading(false);
    }
  };

  // Context data to be provided
  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    loginUserUsingGoogle,
  };

  // Provide the context to the component tree
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <Spin/> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
