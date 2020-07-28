import React from "react";

const Logout = React.lazy(() => import("./views/myViews/Logout"));
const Home = React.lazy(() => import("./views/myViews/Home"));

const routes = [
  { path: "/logout", exact: true, name: "Logout", component: Logout },
  { path: "/home", exact: true, name: "Home", component: Home },
];

export default routes;
