/* eslint-disable react/prop-types */

import { createContext, useReducer, useEffect } from 'react';
import Cookies from 'universal-cookie';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload, isLoading: false };
        case 'LOGOUT':
            return { user: null, isLoading: false };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isLoading: true, // Initially set loading to true
    });

    const cookies = new Cookies();

    useEffect(() => {
        const token = cookies.get('token');
        if (token) {
            // Set loading state to true when starting authentication process
            dispatch({ type: 'SET_LOADING', payload: true });

            // Simulate fetching user data
            setTimeout(() => {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user) {
                    dispatch({ type: 'LOGIN', payload: user });
                } else {
                    // If no user data found, mark authentication as complete
                    dispatch({ type: 'SET_LOADING', payload: false });
                }
            }, 1000); // Simulating a 2-second delay for fetching user data
        } else {
            // If no token found, mark authentication as complete
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
    );
};

