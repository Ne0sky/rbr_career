import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('useAuthContext must be used inside AuthContextProvider');
    }

    const { user, isLoading, dispatch } = context;

    return { user, isLoading, dispatch };

};

export default useAuthContext;
