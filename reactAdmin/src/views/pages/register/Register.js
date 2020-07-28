import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import { Redirect, Link } from "react-router-dom";
import { makeReq, refreshAuthToken } from "../../../libs/apiHandler";
const Register = () => {
  const refreshLogin = async () => {
    await refreshAuthToken();
    setPageLoading(false);
  };
  useEffect(() => {
    refreshLogin();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [pageLoding, setPageLoading] = useState(true);
  const [registerd, setRegisterd] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const [isloding, setLoding] = useState(false);
  const regReq = async (e) => {
    e.preventDefault();
    setLoding(true);
    try {
      if (password !== cpassword) {
        setError("Passwords must match");
        setLoding(false);
        return;
      }
      const payload = {
        name: name,
        email: email,
        password: password,
      };
      const { data } = await makeReq("/api/auth/register", "post", {}, payload);
      if (data.error) setError(data.error);
      else if (data.user) {
        setLoding(false);
        setRegisterd(true);
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
  if (registerd) return <Redirect to="/login?message=Register Successfully" />;
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={(e) => regReq(e)} className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Register as a new user</p>
                  <p className="errorText">{error}</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="email"
                      placeholder="Email"
                      required
                      autoComplete="username"
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
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      value={cpassword}
                      onChange={(e) => setCpassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CButton
                    color="success"
                    block
                    type="submit"
                    disabled={isloding}
                  >
                    {isloding ? "Loding..." : "Register"}
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12">
                    <p className="m-0 text-right">
                      Already have an account?
                      <Link to="/login"> Login</Link>
                    </p>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
