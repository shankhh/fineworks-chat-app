import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {  GoogleOutlined,  GithubOutlined,} from "@ant-design/icons";
// import { auth } from '../firebase'
import axios from 'axios';
import firebase from "firebase/app";
import {auth} from "../firebase";
import "./Login.css";

//toast
import {toast} from 'react-toastify';

//validator
import {submitValidator} from '../utils/registrationValidator';

const Login = () => {

  const history = useHistory();

  const [cssClass, setCssClass] = useState({
    click: false,
    name: "",
  });

  const onClickCssHandler = (mode) => {
    setCredentials({
      email: "",
      password: "",
      username: ""
    })
    if (mode === "signup") {
      setCssClass({
        click: true,
        name: "sign-up-mode",
      });

    } else {
      setCssClass({
        click: false,
        name: "",
      });
    }
  };  
  
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });

  const credentialChange = (e, type) => {
    const value = e.target.value;

    switch(type) {
      case "email": setCredentials({...credentials, email: value}); break;
      case "password": setCredentials({...credentials, password:value}); break;
      case "username": setCredentials({...credentials, username: value}); break;
      default: return;
    }
  }

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    const {email, password} = credentials;

    submitValidator(credentials,"signup", (error, message) => {
      console.log(error, message);
      if(error) {
        toast.error(message);
        return;
      } 
      console.log("should execute signup");

      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential);
        const user = userCredential.user;

        axios.post('https://api.chatengine.io/users/', {
          "username": credentials.email,
          "email": credentials.email,
          "secret": user.uid,
        }, {
          headers: {
            "PRIVATE-KEY": process.env.REACT_APP_CHAT_ENGINE_KEY
          }
        })
        .then(response => {
          console.log("in chat engine creation",  response)
        })
        .catch(e => {
          console.log(e);
        })
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    })
  }

  const signinSubmitHandler = (e) => {
    e.preventDefault();
    const {email, password} = credentials;

    submitValidator(credentials, "signin", (error, message) => {
      if(error) {
        toast.error(message);
        return
      }
      
      auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential);
        const user = userCredential.user;

        history.replace("/chats");
        // window.location.reload();

          // ...
        })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    })  
  }

  return (
    <div class={`container ${cssClass ? cssClass.name : ""}`}>
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input onChange={e => credentialChange(e, "email")} value={credentials.email} type="email" placeholder="Email" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input onChange={e => credentialChange(e, "password")} value={credentials.password} type="password" placeholder="Password" />
            </div>
            <input 
            onClick={signinSubmitHandler}
            type="submit" value="Login" class="btn solid" />
            <p class="social-text">Or Sign in with social platforms</p>
            <div class="social-media">
              <div
                className="login-button google"
                onClick={() =>
                  auth.signInWithRedirect(
                    new firebase.auth.GoogleAuthProvider()
                  )
                }
              >
                <GoogleOutlined /> Sign In with Google
              </div>
              <div 
                className="login-button github"
                onClick={() =>
                  auth.signInWithRedirect(
                    new firebase.auth.GithubAuthProvider()
                  )
                }
              >
                <GithubOutlined /> Sign In with Github
              </div>
            </div>
          </form>
          <form action="#" class="sign-up-form">
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input onChange={e => credentialChange(e, "username")} value={credentials.username} type="text" placeholder="Username" />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input onChange={e => credentialChange(e, "email")} value={credentials.email} type="email" placeholder="Email" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input onChange={e => credentialChange(e, "password")} value={credentials.password} type="password" placeholder="Password" />
            </div>
            <input 
            onClick={signupSubmitHandler}
            type="submit" class="btn" value="Sign up" />
            <p class="social-text">Or Sign up with social platforms</p>
            <div class="social-media">
              <div
                className="login-button google"
                onClick={() =>
                  auth.signInWithRedirect(
                    new firebase.auth.GoogleAuthProvider()
                  )
                }
              >
                <GoogleOutlined /> Sign In with Google
              </div>
              <div
                className="login-button github"
                onClick={() =>
                  auth.signInWithRedirect(
                    new firebase.auth.GithubAuthProvider()
                  )
                }
              >
                <GithubOutlined /> Sign In with Github
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              class="btn transparent"
              id="sign-up-btn"
              onClick={() => onClickCssHandler("signup")}
            >
              Sign up
            </button>
          </div>
          <img src="img/log.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              class="btn transparent"
              id="sign-in-btn"
              onClick={() => onClickCssHandler("signin")}
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
