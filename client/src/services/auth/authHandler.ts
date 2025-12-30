
import API from "@/lib/api"
import { useUser } from "@/stores/userStore";
export const loginHandler = async (username: string, setError: any) => {
    try {
        const res = await API.post('/login', {username});
        setError('');
        console.log(res.data.message); // message recieved
        // console.log(username);
    } catch (error: Error | any) {
        setError(error.response.data.message);
        console.log(error);
    }
}

export const registerHandler = async (username: string, email: string, setError: any) => {
    try {
        const res = await API.post('/register', {username, email});
        console.log(res);
    } catch (error: Error | any) {
        setError(error.response.data.message);
        console.log(error);
    }
}

// cannot use useUser store hook here, instead pass it in a useState ( defined in VerifyPage component ) or return the user data and set it to the store in VerifyPage component
export const verifyHandler = async (token: string, setError: any, setVerified: any, setMessage: any) => {
    try {
        const res = await API.post(`/verify/${token}`, {}, {withCredentials: true});
        setVerified(true);
        setMessage(res.data.message);
        console.log(res);
       return res.data.user;
    } catch (error: Error | any) {
        setError(error.response.data.message);
        console.log(error);
    }
}