/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../components/firebase";
import Card from "../components/Card";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast("Login Successfully", {
        position: "top-center",
      });
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-center">
        <div className="w-full p-8 m-4">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold">Login</h1>
            <div className="px-4 py-5">
              <div className="border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10 cursor-pointer">
                <FaGooglePlusG />
              </div>
              <div className="border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10 cursor-pointer">
                <FaFacebookF />
              </div>
              <div className="border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10 cursor-pointer">
                <FaGithub />
              </div>
              <div className="border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10 cursor-pointer">
                <FaLinkedinIn />
              </div>
            </div>
            <span className="py-2 text-sm">or use email & password</span>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border-none focus:outline-none focus:ring-0 rounded-md bg-stone-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-0.5 border-none focus:outline-none focus:ring-0 rounded-md bg-stone-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="mb-4">
              <a href="#" className="text-sm hover:underline">
                Forget Password?
              </a>
            </span>
            <button className={`w-[120px] bg-purple-600 text-white py-2 rounded-md font-bold ${load && "opacity-50"}`} disabled={load}>
              {load ? "Loading" : "Sign In"}
            </button>
          </form>
          <div className="flex flex-row gap-1 mt-4 items-center justify-center">
            <p className="text-sm">Don't have account?</p>
            <a href="/register" className="font-semibold text-sm hover:underline">
              Register Here
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Login;
