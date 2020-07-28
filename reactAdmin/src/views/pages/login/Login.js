import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { makeReq, refreshAuthToken } from "../../../libs/apiHandler";
const Login = () => {
  const refreshLogin = async () => {
    await refreshAuthToken();
    setPageLoading(false);
  };
  useEffect(() => {
    refreshLogin();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const dispatch = useDispatch();
  const [pageLoding, setPageLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloding, setLoding] = useState(false);
  let subButton;
  const is_login = useSelector((state) => state.login.is_login);
  if (is_login) return <Redirect to="/" />;
  const loginReq = async (e) => {
    e.preventDefault();
    setLoding(true);
    try {
      const payload = {
        email: email,
        password: password,
      };
      const { data, headers } = await makeReq(
        "/api/auth/login",
        "post",
        {},
        payload
      );
      if (data.error) setError(data.error);
      else if (data.refresh_token) {
        dispatch({
          type: "setLogin",
          is_login: true,
          email: email,
          auth_token: headers["auth-token"],
        });
      }
    } catch (error) {
      setError(error.message);
    }
    setLoding(false);
  };
  if (!isloding) {
    subButton = (
      <CButton color="primary" className="px-4" type="submit">
        Login
      </CButton>
    );
  } else {
    subButton = (
      <CButton color="primary" className="px-4" type="submit" disabled>
        Loding..
      </CButton>
    );
  }
  if (pageLoding) {
    return (
      <div className="c-app  flex-row align-items-center justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={(e) => loginReq(e)}>
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <p className="errorText">{error}</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs="6">{subButton}</CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
