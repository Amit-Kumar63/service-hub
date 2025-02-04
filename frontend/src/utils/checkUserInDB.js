import axios from "axios";

export default async function checkUserInDB(uid) {
    try {
        if(!uid) return new Error('Uid is required')
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/check-user-in-db`, uid);
        return response.data?.users
    } catch (error) {
        console.error('Error while checking user in DB', error);
        return false
    }
    
}