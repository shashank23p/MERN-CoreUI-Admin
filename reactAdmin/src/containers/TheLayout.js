import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = () => {
  const is_login = useSelector((state) => state.login.is_login);
  if (!is_login) return <Redirect to="/login" />;
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
