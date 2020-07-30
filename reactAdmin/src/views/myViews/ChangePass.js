import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { makeReq } from "../../libs/apiHandler";
const ChangePass = () => {
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const [isloding, setLoding] = useState(false);
  const auth_token = useSelector((state) => state.login.auth_token);
  const Req = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoding(true);
    try {
      if (newPassword === currentPassword) {
        setError("New Passwords and Current Password is same");
        setLoding(false);
        return;
      }
      if (newPassword !== cpassword) {
        setError("New Passwords and Confirm Password must match");
        setLoding(false);
        return;
      }
      const payload = {
        current_password: currentPassword,
        new_password: newPassword,
      };
      let config = {
        headers: {
          "auth-token": auth_token,
        },
      };
      const { data } = await makeReq(
        "/api/member/changepass",
        "post",
        config,
        payload
      );
      if (data.error) setError(data.error);
      else if (data.message) {
        setCpassword("");
        setCurrentPassword("");
        setNewPassword("");
        setCpassword("");
        setMessage(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoding(false);
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="9" lg="7" xl="6">
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm onSubmit={(e) => Req(e)} className="p-4">
                <h1>Change Password</h1>
                <p className="text-muted">Change your password</p>
                <p className="errorText">{error}</p>
                {message ? (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                ) : (
                  ""
                )}
                <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="password"
                    placeholder="Current Password"
                    autoComplete="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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
                    placeholder="New Password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  color="primary"
                  block
                  type="submit"
                  disabled={isloding}
                >
                  {isloding ? "Loding..." : "Change Password"}
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ChangePass;
