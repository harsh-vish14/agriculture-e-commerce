import GoogleButton from "react-google-button";
import { Button } from "antd";
import { Divider } from "antd";
import { useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { signInWithCredentials } from "../../lib/gettingAndSetting";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import classes from "./login.module.scss";
import login_lottie from "../../animation/login.json";
import LottieAnimation from "../lottie/lottieAnimation";
import openNotification from "../../lib/notifications";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const signInHandler = () => {
    setIsLogin(false);
  };
  const loginHandler = () => {
    setIsLogin(true);
  };
  const authUserHandler = async () => {
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: email.current.value,
        password: password.current.value,
      });
      if (!result.error) {
        openNotification(
          "Logged In Successfully",
          "User has logged in successfully"
        );
        router.push("/", undefined, { shallow: true });
      } else {
        openNotification("Error happened", result.error);
      }
      email.current.value = "";
      password.current.value = "";
      return;
    }
    const result = await signInWithCredentials({
      name: username.current.value,
      email: email.current.value,
      password: password.current.value,
    });
    if (result.status === "error") {
      openNotification("Error happened", result.message);
    } else {
      openNotification("Success", result.message);
      setIsLogin(true);
    }
    email.current.value = "";
    password.current.value = "";
  };
  return (
    <div className={classes.login}>
      <div className={classes.loginPart}>
        <div className={classes.loginTitle}>
          {isLogin ? "Login" : "Sign In"}
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="username">Name</label>
            <input type="text" id="username" ref={username} />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" ref={email} />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input type="password" id="Password" ref={password} />
        </div>
        <div>
          <Button variant="success" onClick={authUserHandler}>
            {isLogin ? "Login" : "Sign In"}
          </Button>
        </div>
        <div>
          {isLogin ? (
            <div className={classes.link} onClick={signInHandler}>
              New Here?
            </div>
          ) : (
            <div className={classes.link} onClick={loginHandler}>
              Having Account?
            </div>
          )}
          {/* <Divider>OR</Divider> */}
          {/* <div className={classes.separator}>
            <span>OR</span>
          </div> */}
          {/* <div>
            <GoogleButton type="light" onClick={googleSignedIn} />
          </div> */}
        </div>
      </div>
      <div>
        {/* <Image src="/login.svg" height={300} width={300} /> */}
        <LottieAnimation lottie={login_lottie} width={400} height={400} />
        {/* {showAlertBox && (
          <div className={classes.alertBox}>
            <Alert variant={alertBoxState.state}>{alertBoxState.message}</Alert>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Login;
