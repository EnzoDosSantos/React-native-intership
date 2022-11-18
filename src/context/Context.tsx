import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import login from "../api/index"

interface User {
    avatar : string,
    name : string
}

interface Error {
    error: string
}

interface IAuth {
    user: User | null
    signIn: (email: string, password: string) => Promise<void>
    logout: () => void
    error: Error | null
    loading: boolean
}

const AuthContext = createContext<IAuth>({
    user: null,
    signIn: async () => { },
    logout: () => { },
    error: null,
    loading: false,
})

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setError(null)
        const res = window.localStorage.getItem("User")
        if(res !== "undefined" && res){
            const data = JSON.parse(res)
            setUser(data)
        }
    },[])

    useEffect(() => {
        if(error){
            setTimeout(() => {
                setError(null)
            },2000)
        }
    },[error])

    const signIn = async (email: string, password: string) => {
        setLoading(true)
        setError(null)
        try {
            const { data } : any = await login(email, password)
            setUser(data)
            window.localStorage.setItem("User", JSON.stringify(data))
            setLoading(false)
        } catch (error : any) {
            setLoading(false)
            setUser(null)
            setError(error)
        }
    }
    const logout = () => {
        setLoading(true)
        setUser(null)
        setError(null)
        window.localStorage.removeItem("User")
        setLoading(false)
    }
    const memoedValue = useMemo(() => ({user, error, loading, signIn, logout}), [user, error, loading])

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}
export default function useAuth() {
    return useContext(AuthContext)
}