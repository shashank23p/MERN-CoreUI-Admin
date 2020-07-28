const initialState = {
  is_login: false,
  email: "",
  auth_token: null,
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
