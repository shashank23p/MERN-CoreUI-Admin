import React from "react";

const Logout = React.lazy(() => import("./views/myViews/Logout"));
const Dashboard = React.lazy(() => import("./views/myViews/Dashboard"));
const MemberDashboard = React.lazy(() =>
  import("./views/myViews/MemberDashboard")
);

const routes = [
  { path: "/logout", exact: true, name: "Logout", component: Logout },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/memberdashboard",
    exact: true,
    name: "Dashboard",
    component: MemberDashboard,
  },
];

export default routes;
