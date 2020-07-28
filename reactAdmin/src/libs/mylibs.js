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

export { logout };
