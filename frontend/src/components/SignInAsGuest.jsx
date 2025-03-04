import axios from "axios";
import { signInAnonymously, auth } from "../firebase-config";
import { toast } from "react-toastify";

const SignInAsGuest = ({redirectTo}) => {
  
  const signInAsGuestHandler = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      toast.loading('Please wait...', {toastId: 'loading'})
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${redirectTo}s/signin-as-guest`, {
        headers: {
          Authorization: `Bearer ${userCredential.user.accessToken}`,
        }
      } );
      if (response.status === 200) {
        toast.dismiss('loading')
        localStorage.setItem('token', response.data.token);
        toast.success('Logged in successfully! you will be redirected to home page', {toastId: 'success'})
        setTimeout(() => {
          location.replace(`/${redirectTo}/info-for-guest`)
        }, 1500);
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

