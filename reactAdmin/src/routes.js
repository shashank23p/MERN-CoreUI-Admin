import React from "react";

const Logout = React.lazy(() => import("./views/myViews/Logout"));
const Dashboard = React.lazy(() => import("./views/myViews/Dashboard"));
const MemberDashboard = React.lazy(() =>
  import("./views/myViews/MemberDashboard")
);
const ChangePass = React.lazy(() => import("./views/myViews/ChangePass"));

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
  {
    path: "/changepass",
    exact: true,
    name: "Change Password",
    component: ChangePass,
  },
];

export default routes;
