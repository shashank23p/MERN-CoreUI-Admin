import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
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
  CCardGroup,
  CCardFooter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { makeReq, refreshAuthToken } from "../../../libs/apiHandler";
import { queryStringParse, getLoginReduxState } from "../../../libs/mylibs";

const Login = () => {
  const message = queryStringParse(window.location.hash).message;
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
        dispatch(getLoginReduxState(data, headers));
      }
    } catch (error) {
      setError(error.message);
    }
    setLoding(false);
  };

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
            <CCardGroup>
              <CCard>
                <CCardBody>
                  <CForm onSubmit={(e) => loginReq(e)} className="p-4">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    {message ? (
                      <div className="alert alert-success" role="alert">
                        {message}
                      </div>
                    ) : (
                      ""
                    )}
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
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          type="submit"
                          disabled={isloding}
                        >
                          {isloding ? "Loding..." : "Login"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol xs="12" sm="6">
                      <p className="m-0">
                        <Link to="/"> Forget Password?</Link>
                      </p>
                    </CCol>
                    <CCol xs="12" sm="6">
                      <p className="m-0 text-right">
                        Are you New Here?
                        <Link to="/register"> Register Now!</Link>
                      </p>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
