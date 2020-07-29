const adminNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Home",
    to: "/dashboard",
    icon: "cil-speedometer",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Account"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Change Password",
    to: "/changepass",
    icon: "cil-lock-unlocked",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Logout",
    to: "/logout",
    icon: "cil-account-logout",
  },
];
const memberNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/memberdashboard",
    icon: "cil-speedometer",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Account"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Change Password",
    to: "/changepass",
    icon: "cil-lock-unlocked",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Logout",
    to: "/logout",
    icon: "cil-account-logout",
  },
];
export { adminNav, memberNav };
