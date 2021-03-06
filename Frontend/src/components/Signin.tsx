import React, { useState } from "react";
import PropTypes from "prop-types";
import imgLogin from "../logos/imgLogin.png";
import imgTest from "../logos/testLogin.jpg";
import logo1 from "../logos/fox.png";
import { BsEnvelope, BsPerson } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { GoMailRead } from "react-icons/go";
import { RouteProps } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import axios from "axios";
import { O_NOCTTY } from "constants";

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function postDataSignIn(props: any) {
  const inputUsername = (document.getElementById("emailSignIn") as HTMLInputElement).value;
  const inputPassword = (document.getElementById("passwordSignIn") as HTMLInputElement).value;
  const output = document.getElementById("notiSignIn");
  if (validateEmail(inputUsername)) {
    if (inputPassword === "") {
      console.log(output)
      if (output)
        output.innerHTML = "Mật khẩu không được để trống";
    }
    else {
      if (output)
        output.innerHTML = "";
      var dataSignIn = {
        email: inputUsername,
        password: inputPassword
      }
      axios
        .post("http://localhost:3000/sign-in", dataSignIn)
        .then(function (response) {
          console.log(response);
          if (response.data.error) {
            if (output)
              output.innerHTML = "Tài khoản hoặc mật khẩu không đúng";
          }
          else {
            if (output)
              output.innerHTML = "Đăng nhập thành công";
            console.log(response.data)
            props.setToken(response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.user.email);
            localStorage.setItem("password", inputPassword);
            localStorage.setItem("level", response.data.user.level + "");
            offLogin();
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  else {
    const output = document.getElementById("notiSignIn");
    console.log(output)
    if (output)
      output.innerHTML = "Email không đúng định dạng";
  }

}
// postDataSignIn.propTypes = {
//   setToken: true,
// }
// var dataSignUp = {
//   email: "testUserName@gmail.com",
//   password: "123"
// };

function postDataSignUp() {
  const inputUsernameSU = (document.getElementById("emailSignUp") as HTMLInputElement).value;
  const inputPasswordSU = (document.getElementById("passwordSignUp") as HTMLInputElement).value;
  const inputCPasswordSU = (document.getElementById("passwordSignUp") as HTMLInputElement).value;
  const inputNickname = (document.getElementById("nickname") as HTMLInputElement).value;
  const output = document.getElementById("notiSignUp");
  if (inputUsernameSU === "" || inputPasswordSU === "" || inputCPasswordSU === "" || inputNickname === "") {
    if (output)
      output.innerHTML = "Vui lòng điền đầy đủ thông tin."
  }
  else if (validateEmail(inputUsernameSU) === false) {
    if (output) {
      output.innerHTML = "Tài khoản không đúng định dạng."
    }
  }
  else if (String(inputPasswordSU) != String(inputCPasswordSU)) {
    if (output)
      output.innerHTML = "Mật khẩu xác thực không đúng."
  }
  else {
    if (output)
      output.innerHTML = ""
    var dataSignUp = {
      email: inputUsernameSU,
      password: inputPasswordSU,
      nickname: inputNickname
    };
    console.log(dataSignUp);
    axios
      .post("http://localhost:3000/sign-up", dataSignUp)
      .then(function (response) {
        console.log(response.data.error);
        if (response.data.error === undefined) {
          if (output)
            output.innerHTML = "Đăng kí thành công."
        }
        else {
          if (output)
            output.innerHTML = "Tài khoản đã được đăng kí."
        }
      })
      .catch(function (error) {
        if (output)
          output.innerHTML = "Không thể kết nối tới máy chủ."
        console.log(error);
      });
  }
}
function checkMailForgot() {
  const inputUsernameSU = (document.getElementById("emailForgotPassword") as HTMLInputElement).value;
  const output = document.getElementById("notiForgotPass");
  if (validateEmail(inputUsernameSU) === false) {
    if (output)
      output.innerHTML = "Email không đúng định dạng."
    return false;
  }
  else {
    const inputUsernameSU = (document.getElementById("emailForgotPassword") as HTMLInputElement).value;
    (document.getElementById("emailConfirmPass") as HTMLInputElement).value = inputUsernameSU;
    axios
      .get("http://localhost:3000/forgot-password?email=" + inputUsernameSU)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return true;
}
function confirmForgotPass(){
  const inputUsernameSU = (document.getElementById("emailForgotPassword") as HTMLInputElement).value;
  const inputOTP = (document.getElementById("OTPConfirmPass") as HTMLInputElement).value;
  const inputPass = (document.getElementById("passwordConfirmPass") as HTMLInputElement).value;
  const inputConfirmPass = (document.getElementById("passwordConfirmPassNew") as HTMLInputElement).value;
  const output = document.getElementById("notiConfirmForgot");
  const noti = document.getElementById("notiConfirm");
  if (inputOTP === "" || inputPass === "" || inputConfirmPass === "") {
    if (output)
      output.innerHTML = "Vui lòng nhập đủ thông tin."
  }
  else if(String(inputPass) != String(inputConfirmPass)){
    if (output)
      output.innerHTML = "Mật khẩu xác thực không đúng."
  }
  else {
    if(output)
      output.innerHTML = ""
    if(noti)
    noti.innerHTML = ""
    const data = {
      email: inputUsernameSU,
      code: inputOTP,
      newPassword: inputPass,
    }
    console.log(data);
    axios
      .post("http://localhost:3000/forgot-password?email=" + inputUsernameSU, data)
      .then(function (response) {
        console.log(response);
        if(response.data.error){
          if(noti)
            noti.innerHTML = "Mã xác thực OTP không đúng."
        }
        else{
          if(output)
            output.innerHTML = "Đổi mật khẩu thành công."
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
function offLogin() {
  const myElement = document.getElementById("overlay")!;
  myElement.style.display = "none";
}
const Tabs = (props: any) => {
  console.log(props);
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap pt-5 justify-end">
        <div className="">
          <IoIosCloseCircle
            className="w-8 h-8"
            onClick={offLogin}
          ></IoIosCloseCircle>
        </div>
        <div className="w-full">
          <div
            className="px-4 flex pb-10 pt-2 text-xl items-center"
            role="tablist"
          >
            {openTab == 4 ? (
              <IoChevronBackCircleOutline
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                className="h-8 w-8"
              ></IoChevronBackCircleOutline>
            ) : (
              <></>
            )}
            <div className="flex flex-wrap ml-auto">
              <div className="px-3">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-full block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-" + props.color
                      : "text-" + props.color + "-600 bg-red-600")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  <div className="flex items-center">
                    <FiLogIn className="h-7 w-7 pr-2"></FiLogIn>
                    <h3 className="font-bold text-lg">Sign in</h3>
                  </div>
                </a>
              </div>
              <div>
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-full block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-" + props.color
                      : "text-" + props.color + "-600 bg-red-600")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  <div className="flex items-center">
                    <FiLogOut className="h-7 w-7 pr-2"></FiLogOut>
                    <h3 className="font-bold text-lg">Sign up</h3>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <section className="text-center pb-4 flex items-center justify-center">
                <img className="w-24 h-24 pr-2" src={logo1} alt="" />
                <h3 className="font-bold text-6xl">WELCOME</h3>
              </section>
              <section className="mt-8 px-4 bg-gray-600">
                <div className="flex flex-col">
                  <div className="mb-4 px-5 rounded-lg  border-2 flex items-center">
                    <BsEnvelope className="pr-2 h-16 w-10"></BsEnvelope>
                    <input
                      type="text"
                      id="emailSignIn"
                      placeholder="Email..."
                      className="rounded w-full text-white focus:outline-none transition duration-500 pb-3"

                    ></input>
                  </div>
                  <div className="mb-3 px-5 rounded-lg border-2 flex items-center">
                    <RiLockPasswordLine className="pr-2 h-16 w-10"></RiLockPasswordLine>
                    <input
                      type="password"
                      id="passwordSignIn"
                      placeholder="Password..."
                      className="bg-gray-200 rounded transition duration-500 px-3 pb-3"
                    ></input>
                  </div>
                  <div id="notiSignIn" className="mb-7 pl-3 text-red-500">

                  </div>
                  <button
                    className="focus:bg-black bg-red-600 h-12 text-white font-bold py-2 rounded-xl shadow-lg hover:shadow-xl transition duration-200"
                    type="submit"
                    onClick={() => postDataSignIn(props)}
                  >
                    SIGN IN
                  </button>
                  <div className="flex justify-end pt-4">
                    <a
                      href="#link3"
                      role="tablist"
                      data-toggle="tab"
                      className="text-sm  hover:text-red-600 hover:underline mb-6"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(3);
                      }}
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </section>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <section className="text-center pb-4 flex items-center justify-center">
                <h3 className="font-bold text-6xl">SIGN UP</h3>
              </section>
              <section className="mt-6 px-4 bg-gray-600">
                {/* <form className="flex flex-col" method="POST" action="/sign-up"> */}
                <div className="flex flex-col">
                  <div className="mb-3 h-14 px-5 rounded-lg  border-2 flex items-center">
                    <BsEnvelope className="pr-2 h-8 w-8"></BsEnvelope>
                    <input
                      type="text"
                      id="emailSignUp"
                      placeholder="Email"
                      className="rounded w-full text-white focus:outline-none transition duration-500 pb-3"
                    ></input>
                  </div>
                  <div className="mb-3 h-14 px-5 rounded-lg border-2 flex items-center">
                    <BsPerson className="pr-2 h-8 w-8"></BsPerson>
                    <input
                      type="text"
                      id="nickname"
                      placeholder="Display name"
                      className="bg-gray-200 rounded transition duration-500 px-3 pb-3"
                    ></input>
                  </div>
                  <div className="mb-3 h-14 px-5 rounded-lg  border-2 flex items-center">
                    <RiLockPasswordFill className="pr-2 h-8 w-8"></RiLockPasswordFill>
                    <input
                      type="password"
                      id="passwordSignUp"
                      placeholder="Password"
                      className="rounded w-full text-white focus:outline-none transition duration-500 pb-3"
                    ></input>
                  </div>
                  <div className="mb-3 h-14 px-5 rounded-lg  border-2 flex items-center">
                    <RiLockPasswordFill className="pr-2 h-8 w-8"></RiLockPasswordFill>
                    <input
                      type="password"
                      id="passwordConfirmSignUp"
                      placeholder="Confirm password"
                      className="rounded w-full text-white focus:outline-none transition duration-500 pb-3"
                    ></input>
                  </div>
                  <div id="notiSignUp" className="pl-3 text-red-500">
                  </div>
                  <button
                    className="focus:bg-black mt-5 bg-red-600 h-12 text-white font-bold py-2 rounded-xl shadow-lg hover:shadow-xl transition duration-200"
                    onClick={postDataSignUp}
                  >
                    SIGN UP
                  </button>
                </div>
                {/* </form> */}
              </section>
            </div>
            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
              <section className="text-center pt-4 flex items-center justify-center">
                <h3 className="font-bold text-6xl mx-5">FORGOT PASSWORD</h3>
              </section>
              <section className="px-4 mt-16 bg-gray-600">
                <form className="flex flex-col" method="POST" action="/">
                  <div className="mb-4 px-5 rounded-lg  border-2 flex items-center">
                    <BsEnvelope className="pr-2 h-16 w-10"></BsEnvelope>
                    <input
                      type="text"
                      id="emailForgotPassword"
                      placeholder="Email..."
                      className="rounded w-full text-white focus:outline-none transition duration-500 pb-3"
                    ></input>
                  </div>
                  <div id="notiForgotPass" className="pl-3 text-red-500">
                  </div>
                  <a
                    href="#link4"
                    role="tablist"
                    data-toggle="tab"
                    className="bg-red-600 mt-16 text-center text-xs font-bold uppercase px-5 py-4 shadow-lg rounded-xl block leading-normal "
                    onClick={(e) => {
                      e.preventDefault();
                      if (checkMailForgot() === true)
                        setOpenTab(4);
                    }}
                  >
                    RECLAIM PASSWORD
                  </a>
                </form>
              </section>
            </div>
            <div className={openTab === 4 ? "block" : "hidden"} id="link4">
              <section className="text-center pb-3 flex items-center justify-center">
                <h3 className="font-bold text-5xl mx-5">FORGOT PASSWORD</h3>
              </section>
              <section className="mt-4 px-4 bg-gray-600">
                <form className="flex flex-col" method="POST" action="/">
                  <div className="mb-3 h-12 px-5 rounded-lg  border-2 flex items-center">
                    <BsEnvelope className="pr-2 h-8 w-8"></BsEnvelope>
                    <input
                      type="text"
                      id="emailConfirmPass"
                      placeholder="Email..."
                      className="w-full text-white focus:outline-none transition duration-500 border-b-0"
                      readOnly={true}
                    ></input>
                  </div>
                  <div className="mb-2 h-12 px-5 rounded-lg  border-2 flex items-center">
                    <GoMailRead className="pr-2 h-8 w-8"></GoMailRead>
                    <input
                      type="text"
                      id="OTPConfirmPass"
                      placeholder="OTP Code"
                      className="rounded w-full text-white focus:outline-none transition duration-500"
                    ></input>
                  </div>
                  <div className="flex pb-3">
                    <div id="notiConfirm" className="pl-3 text-red-500 w-3/4">

                    </div>
                    <div className="w-1/4">
                      <a
                        className="text-sm cursor-pointer hover:text-red-600 hover:underline mb-4"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        Resend the Code
                      </a>
                    </div>
                  </div>
                  <div className="mb-3 h-12 px-5 rounded-lg  border-2 flex items-center">
                    <RiLockPasswordFill className="pr-2 h-8 w-8"></RiLockPasswordFill>
                    <input
                      type="password"
                      id="passwordConfirmPass"
                      placeholder="New password..."
                      className="rounded w-full text-white focus:outline-none transition duration-500"
                    ></input>
                    {/* value={(document.getElementById("email") as HTMLInputElement).value} */}
                  </div>
                  <div className="mb-2 h-12 px-5 rounded-lg  border-2 flex items-center">
                    <RiLockPasswordFill className="pr-2 h-8 w-8"></RiLockPasswordFill>
                    <input
                      type="password"
                      id="passwordConfirmPassNew"
                      placeholder="Confirm new password..."
                      className="rounded w-full text-white focus:outline-none transition duration-500"
                    ></input>
                  </div>
                  <div id="notiConfirmForgot" className="pl-3 text-red-500">
                  
                  </div>
                  <button
                    className="focus:bg-black mt-5 bg-red-600 h-12 text-white font-bold py-2 rounded-xl shadow-lg hover:shadow-xl transition duration-200"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      confirmForgotPass();
                    }}
                  >
                    CONFIRM
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
function HandleAccount(props: any) {
  // loginUser(credentials) {
  //   return fetch("http://localhost:3001/signin", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(credentials),
  //   }).then((data) => data.json());
  // }
  console.log(props);
  return (
    <>
      <div id={props.setStyleProps.class}>
        <main className="max-w-70rem bg-gray-600 max-h-full mx-auto my-10 rounded-lg shadow-2xl flex">
          <div className="w-1/2">
            <img src={imgLogin}></img>
          </div>
          <div className="w-1/2 justify-center pt-6 pr-10 items-center text-white ">
            <Tabs color="black" setToken={props.setStyleProps.setToken}></Tabs>
          </div>
        </main>
      </div>
    </>
  )
}

export default HandleAccount;
