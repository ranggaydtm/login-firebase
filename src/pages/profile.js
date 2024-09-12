import { useState, useEffect } from "react";
import { auth, dataBase } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(dataBase, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("user not found");
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
      console.log("logout successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Card>
      {userDetails ? (
        <>
          <div className="flex flex-col items-center justify-center p-6">
            <p className="text-3xl font-bold">Welcome {userDetails.firstName}</p>
            <div className="py-4">
              <p>Email: {userDetails.email}</p>
              <p>First Name: {userDetails.firstName}</p>
              <p>Last Name: {userDetails.lastName}</p>
            </div>
            <button className="w-[120px] bg-purple-600 text-white py-2 rounded-md font-bold" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : null}
    </Card>
  );
}

export default Profile;
