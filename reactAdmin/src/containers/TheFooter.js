import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a
          href="https://twitter.com/iamShashank23"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shashank Padwal
        </a>
        <span className="ml-1">&copy; 2020.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">From</span>
        <a
          href="https://github.com/shashank23p/MERN-CoreUI-Admin"
          target="_blank"
          rel="noopener noreferrer"
        >
          Git Hub
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
