import store from "../store";
import { makeReq } from "./apiHandler";
const logout = async () => {
  const { data } = await makeReq("/api/auth/logout", "get");
  console.log(data);
  if (!data.error)
    store.dispatch({
      type: "setLogin",
      is_login: false,
      email: "",
      auth_token: null,
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

export { logout, queryStringParse };
