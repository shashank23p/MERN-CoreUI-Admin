import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeReq } from "../../libs/apiHandler";
const Dashboard = () => {
  const [res, setRes] = useState("");
  const auth_token = useSelector((state) => state.login.auth_token);
  const getAdmin = async () => {
    let config = {
      headers: {
        "auth-token": auth_token,
      },
    };
    try {
      const { data } = await makeReq("/api/admin/", "get", config);
      if (data) {
        //handel  errors
        if (data.error) console.log(data.error);
        //handel success
        else setRes(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAdmin();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <h1>res:{res}</h1>;
};

export default Dashboard;
