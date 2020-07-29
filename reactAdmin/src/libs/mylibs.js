import store from "../store";
import { makeReq } from "./apiHandler";
const logout = async () => {
  const { data } = await makeReq("/api/auth/logout", "get");
  console.log(data);
  if (!data.error)
    store.dispatch({
      type: "setLogin",
      is_login: false,
      name: "",
      email: "",
      groups: "",
      auth_token: null,
      is_admin: false,
    });
};

const queryStringParse = (string) => {
  let parsed = {};
  if (string !== "") {
    string = string.substring(string.indexOf("?") + 1);
    const queryItems = string.split("&");
    queryItems.forEach((item) => {
      let params = item.split("=");
      params[1] = decodeURI(params[1]);
      parsed[params[0]] = params[1];
    });
  }
  return parsed;
};

const getLoginReduxState = (data, headers) => {
  return {
    type: "setLogin",
    name: data.payload.name,
    email: data.payload.email,
    groups: data.payload.groups,
    is_login: true,
    auth_token: headers["auth-token"],
    is_admin: data.payload.is_admin,
  };
};

export { logout, queryStringParse, getLoginReduxState };
