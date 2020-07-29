const initialState = {
  is_login: false,
  name: "",
  email: "",
  auth_token: null,
  is_admin: "",
};

const loginReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "setLogin":
      return { ...state, ...rest };
    default:
      return state;
  }
};

export default loginReducer;
