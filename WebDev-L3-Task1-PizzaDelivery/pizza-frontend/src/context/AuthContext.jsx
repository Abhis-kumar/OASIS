import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../services/authApi";

const AuthContext = createContext();


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadProfile();

  }, []);




  const loadProfile = async () => {

    try {

      const token = localStorage.getItem("token");


      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }


      const res = await authApi.getProfile();

      setUser(res.user);


    } catch(error) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);

    } finally {

      setLoading(false);

    }

  };





  const login = async (data) => {

    const res = await authApi.login(data);


    localStorage.setItem(
      "token",
      res.token
    );


    localStorage.setItem(
      "user",
      JSON.stringify(res.user)
    );


    setUser(res.user);


    return res;

  };





  const register = async (data) => {

    return await authApi.register(data);

  };





  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

  };





  return (

    <AuthContext.Provider

      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}

    >

      {children}

    </AuthContext.Provider>

  );

}



export const useAuth = () => useContext(AuthContext);