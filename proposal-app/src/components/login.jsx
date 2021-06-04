import React, { useEffect, useState } from "react";
import axios from "axios";

async function loginUser(credentials) {
  return axios({
    url: "https://y4t713ac8j.execute-api.us-east-1.amazonaws.com/dev/",
    method: "post",
    data: JSON.stringify(credentials),
  }).then(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}

function Login({ setToken }) {
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      account,
      password,
    });
    setToken(token);
  };
  return (
    <div className="container">
      <div className="row text-center " style={{ paddingTop: "100px" }}>
        <div className="col-md-12">
          <h2>
            <b>Chapter / APS President Login</b>
          </h2>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
          <div className="panel-body">
            <hr />
            if ()
            {
              <div className="alert alert-danger alert-dismissable">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
            }
            <form onSubmit={handleSubmit}>
              <div className="form-group input-group">
                <span className="input-group-addon">
                  <i className="fa fa-tag"></i>
                </span>
                <input
                  name="txt_id"
                  type="text"
                  className="form-control"
                  placeholder="KSEA Login ID "
                  onChange={(e) => setAccount(e.target.value)}
                />
              </div>
              <div className="form-group input-group">
                <span className="input-group-addon">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  name="txt_pwd"
                  type="password"
                  className="form-control"
                  placeholder="KSEA Login Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="checkbox-inline">
                  <input type="checkbox" /> Remember me
                </label>
                <span className="pull-right">
                  <a
                    href="https://www.ksea.org/user/FindPassword.aspx"
                    target="_blank"
                  >
                    Forget password ?
                  </a>
                </span>
              </div>
              <button className="btn btn-primary" id="btn_login">
                Login
              </button>
              <hr />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
