import React from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import authActions from "store/auth/actions";

const { login, logout } = authActions;

const Login = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(login({ email: "abc@gmail.com", password: "1244" }));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Button onClick={loginHandler}>Login</Button>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

// Login.getInitialProps = async (ctx) => {
//     // ctx.store.dispatch({
//     //   type: 'ACCESS_FROM_GET_INITIAL_PROPS'
//     // }) // We can dispatch actions too
// }

export default Login;
