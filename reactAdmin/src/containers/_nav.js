const nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
    groups: ["admin"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Member Dashboard",
    to: "/memberdashboard",
    icon: "cil-speedometer",
    groups: ["member"],
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

const getNavigation = (GROUPS) => {
  return nav.filter((item) => {
    if (item.groups) {
      const intersection = item.groups.filter((group) =>
        GROUPS.includes(group)
      );
      if (intersection.length > 0) return true;
    } else {
      return true;
    }
    return false;
  });
};

export { getNavigation };
