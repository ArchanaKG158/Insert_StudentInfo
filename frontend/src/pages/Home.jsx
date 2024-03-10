import React, { useEffect } from "react";
import StudentTable from "../components/studentTable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  let navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    } else {
      setToken(JSON.parse(localStorage.getItem("token")));
      setUser(JSON.parse(localStorage.getItem("teacher")));
    }
  }, []);

  const logout = async () => {
    alert("Are you sure you want to logout??");
    // localStorage.removeItem("token");
    // localStorage.removeItem("teacher");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h4>Hy, {user?.name}</h4>
      <Button variant="contained" color="error" onClick={logout}>
        LOGOUT
      </Button>
      <h1 style={{ textAlign: "center" }}>Student Information</h1>
      <StudentTable />
      <Link to={"/student_form"}>
        <Button variant="outlined" fullWidth sx={{ m: 1 }}>
          Insert New
        </Button>
      </Link>
    </div>
  );
}
