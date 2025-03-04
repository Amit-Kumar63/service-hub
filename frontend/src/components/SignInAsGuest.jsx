import axios from "axios";
import { signInAnonymously, auth } from "../firebase-config";
import { toast } from "react-toastify";

const SignInAsGuest = ({redirectTo}) => {
  
  const signInAsGuestHandler = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${redirectTo}s/signin-as-guest`, {
        headers: {
          Authorization: `Bearer ${userCredential.user.accessToken}`,
        }
      } );
      if (response.status === 200) {
        location.replace(`/${redirectTo}/home`)
      }
    } catch (error) {
      console.error("Error signing in as guest:", error);
    }
  }

  return (
    <button 
    onClick={signInAsGuestHandler}
    className="w-full p-4 font-semibold mb-4 bg-slate-500 text-white rounded-xl"
    >
    Continue as Guest
    </button>
  )
}

export default SignInAsGuest

