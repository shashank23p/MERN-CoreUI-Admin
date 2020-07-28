import React from "react";
import { logout } from "../../libs/mylibs";
const Logout = () => {
  logout();
  return (
    <div className="c-app  flex-row align-items-center justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Logout;
