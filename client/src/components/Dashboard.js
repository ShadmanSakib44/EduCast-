import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

const Dashboard = () => {
  const history = useNavigate();

  const { logindata, setLoginData } = useContext(LoginContext);

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    // eslint-disable-next-line
    if (data.status == 401 || !data) {
      history("*");
    } else {
      console.log("verified");
      setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="./man.webp"
          style={{ width: "200px", marginTop: 20 }}
          alt=""
        />
        <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
      </div>
    </>
  );
};

export default Dashboard;
