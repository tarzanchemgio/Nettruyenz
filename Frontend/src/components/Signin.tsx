import React, { useState } from 'react';
import PropTypes from 'prop-types';
import imgLogin from "../logos/imgLogin.png";
import imgTest from "../logos/testLogin.jpg";
import logo1 from "../logos/fox.png";
import { BsEnvelope, BsPerson } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { GoMailRead } from 'react-icons/go';
import { RouteProps } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";
import { IoChevronBackCircleOutline } from "react-icons/io5";

function offLogin() {
  const myElement = document.getElementById("overlay")!;
  myElement.style.display = "none";
}
const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap pt-5 justify-end">
        <div className="">
          <IoIosCloseCircle className="w-8 h-8" onClick={offLogin}></IoIosCloseCircle>
        </div>
        <div className="w-full">
          <div className="px-4 flex pb-10 pt-2 text-xl items-center" role="tablist">
            {openTab==4?(<IoChevronBackCircleOutline  onClick={e => {
                        e.preventDefault();
                        setOpenTab(3);
                      }}
                    className="h-8 w-8"></IoChevronBackCircleOutline>):<></>}
            <div className="flex flex-wrap ml-auto">
              <div className="px-3">
                <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-full block leading-normal "
                  + (openTab === 1
                    ? "text-white bg-" + color
                    : "text-" + color + "-600 bg-red-600")
                }
                  onClick={e => {
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
                <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-full block leading-normal "
                  + (openTab === 2
                    ? "text-white bg-" + color
                    : "text-" + color + "-600 bg-red-600")
                }
                  onClick={e => {
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
          <div >
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <section className="text-center pb-4 flex items-center justify-center">
                <img className="w-24 h-24 pr-2" src={logo1} alt="" />
                <h3 className="font-bold text-6xl">WELCOME</h3>
              </section>
              <section className="mt-8 px-4 bg-gray-600">
                <form className="flex flex-col" method="POST" action="#">
                  <div className="mb-4 px-5 rounded-lg  border-2 flex items-center">
                    <BsEnvelope className="pr-2 h-16 w-10"></BsEnvelope>
                    <input type="text" id="email" placeholder="Email..." className="rounded w-full text-white focus:outline-none transition duration-500 pb-3"></input>
                  </div>
                  <div className="mb-10 px-5 rounded-lg border-2 flex items-center">
                    <RiLockPasswordLine className="pr-2 h-16 w-10"></RiLockPasswordLine>
                    <input type="password" id="password" placeholder="Password..." className="bg-gray-200 rounded transition duration-500 px-3 pb-3"></input>
                  </div>
                  <button className="focus:bg-black bg-red-600 h-12 text-white font-bold py-2 rounded-xl shadow-lg hover:shadow-xl transition duration-200" type="submit">SIGN IN</button>
                  <div className="flex justify-end pt-4">
                    <a href="#link3" role="tablist" data-toggle="tab" className="text-sm  hover:text-red-600 hover:underline mb-6"
                      onClick={e => {
                        e.preventDefault();
                        setOpenTab(3);
                      }}
                    >
                      Forgot your password?
                    </a>
                  </div>
                </form>
              </section>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <section className="text-center pb-4 flex items-center justify-center">
                <h3 className="font-bold text-6xl">SIGN UP</h3>
              </section>
              <section className="mt-6 px-4 bg-gray-600">
                <form className="flex flex-col" method="POST" action="#">
                  <div className="mb-3 h-14 px-5 rounded-lg  border-2 flex items-center">
                    <BsEnvelope className="pr-2 h-8 w-8"></BsEnvelope>
                    <input type="text" id="email" placeholder="Email" className="rounded w-full text-white focus:outline-none transition duration-500 pb-3"></input>
                  </div>
                  <div className="mb-3 h-14 px-5 rounded-lg border-2 flex items-center">
                    <BsPerson className="pr-2 h-8 w-8"></BsPerson>
                    <input type="text" id="name" placeholder="Display name" className="bg-gray-200 rounded transition duration-500 px-3 pb-3"></input>
                  </div>
                  <div className="mb-3 h-14 px-5 rounded-lg  border-2 flex items-center">
                    <RiLockPasswordFill className="pr-2 h-8 w-8"></RiLockPasswordFill>
                    <input type="password" id="password" placeholder="Password" className="rounded w-full text-white focus:outline-none transition duration-500 pb-3"></input>
                  </div>
                  <div className="mb-10 h-14 px-5 rounded-lg  border-2 flex items-center">
                    <RiLockPasswordFill className="pr-2 h-8 w-8"></RiLockPasswordFill>
                    <input type="password" id="password" placeholder="Confirm password" className="rounded w-full text-white focus:outline-none transition duration-500 pb-3"></input>
                  </div>
                  <button className="focus:bg-black bg-red-600 h-12 text-white font-bold py-2 rounded-xl shadow-lg hover:shadow-xl transition duration-200" type="submit">SIGN UP</button>
                </form>
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
                    <input type="text" id="email" placeholder="Email..." className="rounded w-full text-white focus:outline-none transition duration-500 pb-3"></input>
                  </div>

                  <a href="#link4" role="tablist" data-toggle="tab" className="bg-red-600 mt-16 text-center text-xs font-bold uppercase px-5 py-4 shadow-lg rounded-xl block leading-normal "
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(4);
                    }}>RECLAIM PASSWORD</a>
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
                    <input type="text" id="email" placeholder="Email..." className="w-full text-white focus:outline-none transition duration-500 border-b-0" ></input>
                  </div>
                  <div className="mb-2 h-12 px-5 rounded-lg  border-2 flex items-center">
                    <GoMailRead className="pr-2 h-8 w-8"></GoMailRead>
                    <input type="password" id="password" placeholder="OTP Code" className="rounded w-full text-white focus:outline-none transition duration-500"></input>
                  </div>
                  <div className="flex justify-end">
                    <a className="text-sm cursor-pointer hover:text-red-600 hover:underline mb-4"
                      onClick={e => {
                        e.preventDefault();
                      }}
                    >
                      Resend the Code
                    </a>
                  </div>
                  <div className="mb-3 h-12 px-5 rounded-lg  border-2 flex items-center">
                    <RiLockPasswordFill className="pr-2 h-8 w-8"></RiLockPasswordFill>
                    <input type="password" id="password" placeholder="New password..." className="rounded w-full text-white focus:outline-none transition duration-500"></input>
                    {/* value={(document.getElementById("email") as HTMLInputElement).value} */}
                  </div>
                  <div className="mb-8 h-12 px-5 rounded-lg  border-2 flex items-center">
                    <RiLockPasswordFill className="pr-2 h-8 w-8"></RiLockPasswordFill>
                    <input type="password" id="password" placeholder="Confirm new password..." className="rounded w-full text-white focus:outline-none transition duration-500"></input>
                  </div>
                  <button className="focus:bg-black bg-red-600 h-12 text-white font-bold py-2 rounded-xl shadow-lg hover:shadow-xl transition duration-200" type="submit">CONFIRM</button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
interface Props {
  error: any,
  isLoaded: boolean,
  homes: any[],
  filter: boolean,
  class: string
}
class HandleAccount extends React.Component<{}, Props>{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      homes: new Array(),
      filter: true,
      class: props.class
    };
  }


  loginUser(credentials) {
    return fetch('http://localhost:3001/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
  }
  render() {
    console.log(this.state.class);
    return (
      <div id={this.state.class}>
        <main className="max-w-70rem bg-gray-600 max-h-full mx-auto my-10 rounded-lg shadow-2xl flex">
          <div className="w-1/2">
            <img src={imgLogin}></img>
          </div>
          <div className="w-1/2 justify-center pt-6 pr-10 items-center text-white ">
            <Tabs color="black"></Tabs>
          </div>
        </main>
      </div>
    )
  }
}

export default HandleAccount;