import { useState } from "react"
import { useAuthContext } from "./useAthContext"
import Cookies from "universal-cookie"
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
export const useLogin = () =>{
    const nav = useNavigate()
    const [error, setError] = useState(null)
    
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async(email, password)=>{
        setIsLoading(true);
        setError(null)
        
        const data={
            'email' : email,
            'password' : password,
        }

        
        const response = await fetch(`https://rbrcareers.vercel.app/auth/login`,{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })

        const json = await response.json()

        if(!response.ok)
        {
            setIsLoading(false)
            console.log(json.message)
            toast.error('Invalid credentials')
        }

        if(response.ok)
        {
            // Decode the JWT token
            const decodedData = jwtDecode(json.token)
            // Save the decoded data to cookies
            const cookies = new Cookies()
            cookies.set('token', json.token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }) //expires in 7 days
            toast.success('Logged in successfully')
            localStorage.setItem('user', JSON.stringify({ ...json.data, type: decodedData.type }));
            
            //update AuthContext
            dispatch({type:'LOGIN', payload: { ...json.data, type: decodedData.type }})
            nav(`/admin_panel`)
            setIsLoading(false)
            setError(null)
            
        }
    }
   

    return {login, error, isLoading }
}