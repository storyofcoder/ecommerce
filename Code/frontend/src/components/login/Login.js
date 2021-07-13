import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";
import Modal from "react-bootstrap/Modal";
import { setAuthDialog } from "../../redux/header/Action";
import { auth } from "../../redux/user/Action";
import PhoneInput from "react-phone-input-2";
import { setAuth, confirmAuth } from "../../apis/get/Index";

const Auth = (props) => {
  const [userAddress, setUserAddress] = useState('')
  const [isAddressFilled, setIsAddressFilled] = useState(false)
  const [code, setCode] = useState();
  const [isEmail, setIsEmail] = useState(true);
  const [OTP, setOTP] = useState('');
  const [apiLoading, setApiLoading] = useState(false);
  let disabled = true;

  const hideModal = () => {
    props.setAuthDialog(false);
  };

  const handleAddressInput = (value) => {
    if (value.length > 5 && !value.includes('.') && !value.includes('@')) {
      if (!isNaN(value)) {
        setIsEmail(false);
      } else {
        setIsEmail(true);
      }
    } else if (value.length === 0) {
      setIsEmail(true);
    }
    setUserAddress(value)
  };

  const getOTP = async () => {
    setApiLoading(true);
    setAuth(userAddress).then(data => {
      props.alert.show('OTP send succesfully.', {
        timeout: 5000,
        type: "success"
      });
      setIsAddressFilled(true);
    }).catch(error => {
      props.alert.show(error?.response?.data?.message, {
        timeout: 5000,
        type: "error"
      });
    }).finally(f => {
      setApiLoading(false);
    })
  }

  const confirmOTP = () => {
    setApiLoading(true);
    let data = {
      id: userAddress,
      otp: Number(OTP)
    }
    confirmAuth(data)
      .then(data => {
        if (data?.data?.token) {
          localStorage.setItem('accessToken', data?.data?.token);
          setIsAddressFilled(false);
          props.setAuthDialog(false);
          console.log('yess');
          props.auth();
        }
      }).catch(error => {
        props.alert.show(error?.response?.data?.message, {
          timeout: 5000,
          type: "error"
        });
      }).finally(f => {
        setApiLoading(false);
      })
  }

  const handleNext = () => {
    if (isAddressFilled) {
      confirmOTP();
    } else {
      getOTP();
    }
  };

  if (apiLoading) disabled = true;
  else if (isAddressFilled && (OTP.toString().length < 4)) disabled = true;
  else if (isEmail && (!userAddress || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userAddress)))) disabled = true;
  else disabled = false;

  return (
    <>
      <Modal show={props.authDialogOpen} onHide={hideModal} >
        <div className="login_container">
          <div>{isAddressFilled ? 'Verify OTP' : 'Moblie Number / Email'}</div>
          <div classNam="mt-1">
            {
              isAddressFilled ?
                <input type="text" className="login_input" oautoFocus value={OTP}
                  onKeyPress={event => {
                    if (event.key === 'Enter' && !disabled) {
                      handleNext()
                    }
                  }}
                  onChange={(e) => { if (OTP.length < 4) setOTP(e.target.value) }} />
                :
                isEmail ?
                  <input type="text" className="login_input" autoFocus value={userAddress}
                    onKeyPress={event => {
                      if (event.key === 'Enter' && !disabled) {
                        handleNext()
                      }
                    }}
                    onChange={(e) => handleAddressInput(e.target.value)} />
                  :
                  <div className="w-100">
                    <PhoneInput
                      country={"us"}
                      value={userAddress}
                      inputProps={{
                        autoFocus: true
                      }}
                      autoFocus={true}
                      onChange={(value, data) => {
                        let { dialCode } = data;
                        setCode(dialCode);
                        if (value !== dialCode) {
                          handleAddressInput(value.replace(/[^0-9]+/g, ""))
                        }
                      }}
                    />
                  </div>
            }
          </div>
          <div className="login_actions">
            <button className="w-100 header_login_btn" style={{ opacity: disabled ? '0.6' : '1' }} disabled={disabled} onClick={handleNext}> {isAddressFilled ? 'Confirm' : 'Next'}</button>
            <div className="mt-1" style={{ fontSize: '12px' }}>By continuing, you agree to our Terms and Conditions and Privacy Policy.</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = state => ({
  authDialogOpen: state.header.authDialogOpen,
  error: state.home.error
});

const mapDispatchToProps = dispatch => ({
  setAuthDialog: data => dispatch(setAuthDialog(data)),
  auth: data => dispatch(auth(data)),
});
export default compose(
  withAlert(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Auth);