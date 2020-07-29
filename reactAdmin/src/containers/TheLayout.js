import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = () => {
  const is_login = useSelector((state) => state.login.is_login);
  const is_admin = useSelector((state) => state.login.is_admin);
  if (!is_login) return <Redirect to="/login" />;
  if (!is_admin) console.log("you are not admin");
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
