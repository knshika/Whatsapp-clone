import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import "../stylings/Login.css";
import whatsappImg from "../stylings/WhatsApp.svg.png";

function Login() {
  const [,dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img src={whatsappImg} alt="whatsapp-img" />
        <div className="login_text">
          <h2>Sign In to WhatsaApp</h2>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In with google
        </Button>
      </div>
    </div>
  );
}

export default Login;
