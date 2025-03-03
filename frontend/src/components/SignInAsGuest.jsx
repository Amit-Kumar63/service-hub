import axios from "axios";
import { signInAnonymously, auth } from "../firebase-config";

const SignInAsGuest = () => {
  const signInAsGuestHandler = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      await axios.get(`${import.meta.env.VITE_BASE_URL}/users/signin-as-guest`, {
        headers: {
          Authorization: `Bearer ${userCredential.user.accessToken}`,
        }
      } );
    } catch (error) {
      console.error("Error signing in as guest:", error);
    }
  }

  return (
    <button onClick={signInAsGuestHandler}>Continue as Guest</button>
  )
}

export default SignInAsGuest

