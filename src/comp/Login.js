import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
// import { json } from 'react-router-dom';
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const [islogin, setislogin] = useState(true);
  const [errormsg, seterror] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setavatar] = useState(null);
  const [coverImage, setcoverimg] = useState(null);
  const fullName = useRef(null);

  const handlelogin = () => {
    if (islogin) {
      //logic of account creation
      console.log("login");
      // const userdata={
      //     "email":email?.current?.value,
      //     "password":password?.current?.value
      // }
      // const body=JSON.stringify(userdata);
      const body = new FormData();
      body.append("email", email?.current?.value);
      body.append("password", password?.current?.value);

      console.log(body);
      axios
        .post("/api/v1/users/login", body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.data.user);
          dispatch(addUser(res.data.data.user));
          seterror(res.statusText);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
          //seterror(err.response.statusText)

          navigate("/login", { replace: true });
        });
    } else {
      //login of logining
      const body = new FormData();
      body.append("email", email?.current?.value);
      body.append("password", password?.current?.value);
      body.append("username", username?.current?.value);
      body.append("fullName", fullName?.current?.value);
      body.append("avatar", avatar);
      body.append("coverImage", coverImage);

      //to check data only befor reuest
      for (var pair of body.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      axios
        .post("/api/v1/users/register", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.data);
          dispatch(addUser(res.data.data));
          seterror(res.statusText);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
          //seterror(err.response.statusText)
          navigate("/login", { replace: true });
        });

      console.log("create");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {islogin ? "Log in" : "Sign up"} to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
            action="#"
            method="POST"
          >
           
            {!islogin && (
              <>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      ref={username}
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Fullname
                  </label>
                  <div className="mt-2">
                    <input
                      ref={fullName}
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Avatar
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => {
                        setavatar(e.target?.files[0]);
                      }}
                      id="avatar"
                      name="avatar"
                      type="file"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    CoverImage
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => {
                        setcoverimg(e.target?.files[0]);
                      }}
                      id="coverImage"
                      name="coverImage"
                      type="file"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  ref={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handlelogin}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {islogin ? "Log in" : "Sign up"}
              </button>
              {errormsg}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <button
              onClick={() => {
                setislogin(!islogin);
              }}
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {!islogin ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
