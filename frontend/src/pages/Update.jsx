import React from "react";
import UpdateForm from "../components/UpdateForm";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Update() {
  const [token, setToken] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    } else {
      setToken(JSON.stringify(localStorage.getItem("token")));
    }
  }, []);

  let params = useParams();
  //   console.log(params);
  let userId = params.id;
  console.log(userId);
  const [selectedStudent, setSelectedStudent] = useState(null);
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("http://localhost:7000/api/student/viewSingleUser/" + userId, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        console.log(response);
        setSelectedStudent(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(selectedStudent);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Update Form</h1>
      <UpdateForm
        setSelectedStudent={setSelectedStudent}
        selectedStudent={selectedStudent}
      />
    </div>
  );
}
