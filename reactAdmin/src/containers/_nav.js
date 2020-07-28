export default [
  {
    _tag: "CSidebarNavItem",
    name: "Home",
    to: "/home",
    icon: "cil-speedometer",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Account"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Logout",
    to: "/logout",
    icon: "cil-account-logout",
  },
];
