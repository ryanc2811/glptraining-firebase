import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./CreateTeam.css";
import { auth,create_new_team} from "./firebase";

function CreateTeam() {
  const [user, loading, error] = useAuthState(auth);
  const [company, setCompany] = useState("");
  const navigate = useNavigate();
  const team_members=[];
  const admin={"manager_type":"","user_id":user?.uid,"role_type":"admin","managed_by":""};
  team_members.push(admin);
  const manager_types=[];
  const team_requests=[];
  const register_team = () => {
    if (!company) alert("Please enter company name");
    create_new_team(company,team_members,manager_types,team_requests );
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    
  }, [user, loading]);
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Full Name"
        />
      
        <button className="register__btn" onClick={register_team}>
          Register
        </button>
      </div>
    </div>
  );
}
export default CreateTeam;