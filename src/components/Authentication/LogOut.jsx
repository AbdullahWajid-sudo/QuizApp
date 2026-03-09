import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const LogOut = () => {
  return <button onClick={() => signOut(auth)}>Log Out</button>;
};
export default LogOut;
