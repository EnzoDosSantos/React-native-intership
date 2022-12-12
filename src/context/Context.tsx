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
    const [Iserror, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsError(null)
        const res = window.localStorage.getItem("User")
        if(res !== "undefined" && res){
            const data = JSON.parse(res)
            setUser(data)
        }
    },[])

    useEffect(() => {
        if(error){
            setTimeout(() => {
                setIsError(null)
            },2000)
        }
    },[error])

    const signIn = async (email: string, password: string) => {
        setIsLoading(true)
        setIsError(null)
        try {
            const { data } : any = await login(email, password)
            setUser(data)
            window.localStorage.setItem("User", JSON.stringify(data))
            setLoading(false)
        } catch (error : any) {
            setIsLoading(false)
            setUser(null)
            setIsError(error)
        }
    }
    const logout = () => {
        setIsLoading(true)
        setUser(null)
        setIsError(null)
        window.localStorage.removeItem("User")
        setIsLoading(false)
    }
    const memoedValue = useMemo(() => ({user, isError, isLoading, signIn, logout}), [user, error, isLoading])

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}
export default function useAuth() {
    return useContext(AuthContext)
}