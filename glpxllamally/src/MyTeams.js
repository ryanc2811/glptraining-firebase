import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./MyTeams.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where} from "firebase/firestore";
function MyTeams() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [teams, setTeams]=useState([])
  const fetchUserTeams = async () => {
    try {
      const q = query(collection(db, "teams"), where("team_members","array-contains",{user_id:user?.uid}));
      const document = await getDocs(q);
      if(document.docs.length>0){
        //const data = document.docs[0].data();
      const data = document.docs.map((item)=>{
        return item.data();
      });
      setTeams(data);
      console.log(user?.uid)
      }
      
      
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserTeams();
  }, [user, loading]);
  return (
    <div className="dashboard">
       <div className="dashboard__container">
        My Teams
         <div>
            <ul>{teams.map((item,index)=>{
            return <li key={index}>{item.team_name}</li>
         })}</ul></div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
     </div>
  );
}
export default MyTeams;