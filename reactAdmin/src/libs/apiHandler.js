import axios from "axios";
import { logout } from "./mylibs";
import store from "../store";

const makeCall = async (url, methode, config, payload) => {
  try {
    if (methode === "get") {
      const { data, headers } = await axios.get(url, config);
      return { data, headers };
    } else if (methode === "post") {
      const { data, headers } = await axios.post(url, payload, config);
      return { data, headers };
    }
  } catch (error) {
    return { data: { error: error } };
  }
};
const makeReq = async (url, methode, config = {}, payload = {}) => {
  try {
    const { data, headers } = await makeCall(url, methode, config, payload);
    if (data.noLogin) {
      const auth_token = await refreshAuthToken();
      if (!auth_token) {
        console.log("Unable to refresh login, loging out");
        logout();
      } else {
        config.headers["auth-token"] = auth_token;
        //making call again
        const { data, headers } = await makeCall(url, methode, config, payload);
        if (data.noLogin) {
          logout();
        }
        return { data, headers };
      }
    }
    return { data, headers };
  } catch (error) {
    return { data: { error: error } };
  }
};

const refreshAuthToken = async () => {
  const { data, headers } = await axios.get("/api/auth/refresh");
  if (data.error) {
    console.log(data.error);
    return false;
  } else {
    console.log("login refreshed");
    store.dispatch({
      type: "setLogin",
      email: data.payload.email,
      is_login: true,
      auth_token: headers["auth-token"],
    });
    console.log("store updated");
    return headers["auth-token"];
  }
};
export { makeReq, refreshAuthToken };
