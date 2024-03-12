'use client';
import { auth } from "../../firebase.config";
import { useState, useEffect } from "react";
import React, { createContext, useContext } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
} from "firebase/auth";

// restablecimiento de contraseña
const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
};

export const AuthContext = createContext({});

// hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        console.error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// proveedor del contexto de autenticacion
export const AuthProvider = ({children}) => {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    // registro manual 
    useEffect(() => {
        const registered = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
        setLoading(false);
        return () => registered();
    }, []);


    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // inicio de sesion manual
    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password);
        //console.log(response);
        return response;
    };

    // inicio de sesion con google
    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        const response = await signInWithPopup(auth, googleProvider);
        return response;
    }

    // cerrar sesion
    const logout = async () => {
        setUser(null);
        return await signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{
                signUp,
                login,
                loginWithGoogle,
                resetPassword,
                logout,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}