import { getAuth } from "firebase/auth"
import React, { useContext, useState, useEffect } from "react"

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
