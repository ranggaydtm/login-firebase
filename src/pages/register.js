/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { FaFacebookF, FaGithub, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, dataBase } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";

import Card from "../components/Card";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [load, setLoad] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(dataBase, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }
      toast.success("Registered Successfully!!", {
        position: "top-center",
      });
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
          <form className="flex flex-col items-center" onSubmit={handleRegister}>
            <h1 className="text-3xl font-bold">Create Account</h1>
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
            <span className="py-2 text-sm">or register with email</span>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 mb-4 border-none focus:outline-none focus:ring-0 rounded-md bg-stone-100"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="w-full p-2 mb-4 border-none focus:outline-none focus:ring-0 rounded-md bg-stone-100"
            />
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
              className="w-full p-2 mb-4 border-none focus:outline-none focus:ring-0 rounded-md bg-stone-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className={`w-[120px] bg-slate-600 text-white py-2 rounded-md font-bold ${load && "opacity-50"}`} disabled={load}>
              {load ? "Loading" : "Sign Up"}
            </button>
          </form>
          <div className="flex flex-row gap-1 mt-4 items-center justify-center">
            <p className="text-sm">Already registered?</p>
            <a href="/login" className="font-semibold text-sm hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Register;
