import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, dataBase } from "../components/firebase";

import Card from "../components/Card";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(dataBase, "Users", user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("user not found");
        }
      }
    });

    return () => fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Card>
      {userDetails ? (
        <>
          <div className="flex flex-col py-10 h-full">
            <div className="flex flex-row items-center justify-center gap-1">
              <p className="text-3xl font-bold">Hello,</p>
              <p className="text-3xl font-bold">
                {userDetails.firstName} {userDetails.lastName}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center pt-12">
              <p>Here is your personal detail :</p>
              <div className="text-start">
                <p>First Name : {userDetails.firstName ?? "-"}</p>
                <p>Last Name : {userDetails.lastName ?? "-"}</p>
                <p>Email : {userDetails.email ?? "-"}</p>
                <p>Password : {userDetails.password ?? "******"}</p>
              </div>
            </div>
            <p className="text-center text-lg font-bold pt-2">Hope your days all well.</p>
            <div className="flex items-end justify-center h-full">
              <button className="w-[120px] bg-slate-600 text-white py-2 rounded-md font-bold" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </>
      ) : null}
    </Card>
  );
}

export default Profile;
