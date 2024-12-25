import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext'
import { useContext } from 'react'
import axios from 'axios'

const UserProtectWrapper = ({children}) => {
    const { isLoading, setIsLoading, setUser } = useContext(UserDataContext)

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('/login')
        } else {
            setIsLoading(false)
        }
    }, [token, navigate])

    useEffect(()=> {
        async () => {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.status === 200) {
                    setIsLoading(false)
                    setUser(res.data.user)
                }
    
            }).catch(error => {
                console.error(error)
                localStorage.removeItem('token')
                navigate('/login')
            }) 
        }, [ isLoading ]
    })

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default UserProtectWrapper