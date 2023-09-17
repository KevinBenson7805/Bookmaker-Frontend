import { Inter } from 'next/font/google'
import Header from '@/components/header'
import BallInput from '@/components/widgets/ballInput'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { send } from 'process'

export default function SignUp() {
  const [username, setUsername] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [usernameFlagState, setUsernameFlagState] = useState(0)
  const [emailAddressFlagState, setEmailAddressFlagState] = useState(0)
  const [confirmPasswordFlagState, setConfirmPasswordFlagState] = useState(0)
  const [passwordFlagState, setPasswordFlagState] = useState(0)

  useEffect(() => {
    if (username !== "") setUsernameFlagState(1)
    else setUsernameFlagState(0)
  }, [username])
  useEffect(() => {
    if (confirmPassword !== "" && password !== confirmPassword) {
      setConfirmPasswordFlagState(2)
    }
    else if (confirmPassword !== "" && password === confirmPassword) {
      setConfirmPasswordFlagState(1)
    }
    else {
      setConfirmPasswordFlagState(0)
    }
  }, [password, confirmPassword])
  useEffect(() => {
    if (emailAddress !== "")
      if (isEmailValid(emailAddress)) {
        setEmailAddressFlagState(1)
      } else {
        setEmailAddressFlagState(2)
      }
    else setEmailAddressFlagState(0)
  }, [emailAddress])
  function isEmailValid(email: string) {
    // Regex for checking email format
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(String(email).toLowerCase());
  }

  useEffect(() => {
    if (password !== "")
      if (isPasswordValid(password)) {
        setPasswordFlagState(1)
      } else {
        setPasswordFlagState(2)
      }
    else setPasswordFlagState(0)
  }, [password])
  function isPasswordValid(password: string) {
    // Regex for checking email format
    if (password.length < 8 || password.length > 100) {
      return false;
    }
    return true;
  }

  const signUpWithEmail = () => {

    if (emailAddressFlagState === 1 && usernameFlagState === 1 && passwordFlagState === 1 && confirmPasswordFlagState === 1) {
      let sendData = new FormData()
      sendData.append('username', username)
      sendData.append('email', emailAddress)
      sendData.append('password', password)
      Axios.post("http://localhost:8000/api/register/", sendData)
        .then(res => {
          alert(res.data)
        })
        .catch(err => {
          alert("error")
        })
    }

  }
  return (
    <div>
      <Header selectedPage={"signup"} />
      <div className="absolute z-40 w-full h-full overflow-y-scroll bg-transparent">
        <div id="login-window" className=''>
          <div className="fixed w-full h-screen">
            <img src="./images/back.jpg" alt="" className="absolute object-cover object-center h-full xl:w-full" />
            <div className='absolute w-full h-full bg-gray-700 animate-fadeIn'></div>
          </div>

          <div className="absolute w-full h-full pt-64">
            <div className='container flex flex-col justify-between mx-auto w-fit h-fit'>
              <div id="signUpArea" className='pt-0 h-fit w-fit sm:pt-28'>
                <div className="justify-start p-4 sm:flex w-fit h-fit">
                  <div className='flex items-center w-48 h-12 text-3xl text-white '>Username: </div>
                  <BallInput inputType='text' inputValue={username} setInputValue={setUsername} validState={usernameFlagState} />

                </div>
                <div className="justify-start p-4 sm:flex w-fit h-fit">
                  <div className='flex items-center w-48 h-12 text-3xl text-white '>Email: </div>
                  <BallInput inputType='text' inputValue={emailAddress} setInputValue={setEmailAddress} validState={emailAddressFlagState} />

                </div>
                <div className="justify-start p-4 sm:flex w-fit h-fit">
                  <div className='flex items-center w-48 h-12 text-3xl text-white '>Password: </div>
                  <BallInput inputType='password' inputValue={password} setInputValue={setPassword} validState={passwordFlagState} />
                </div>
                <div className="justify-start p-4 sm:flex w-fit h-fit">
                  <div className='flex items-center w-48 h-12 text-3xl text-white '>Confirm: </div>
                  <BallInput inputType='password' inputValue={confirmPassword} setInputValue={setConfirmPassword} validState={confirmPasswordFlagState} />

                </div>

              </div>
              <div id="signUpGroup" className="pb-40 ">
                <div className="flex w-full h-20 p-4 ">
                  <button className="w-full h-full text-xl text-black transition duration-500 bg-white border-4 border-blue-300 rounded-full shadow-md hover:bg-blue-100 shadow-blue-400"
                    onClick={signUpWithEmail}
                  >SignUp with Email</button>
                </div>
                <div className="flex w-full h-20 p-4">
                  <button className="w-full h-full text-xl text-white transition duration-500 bg-blue-500 border-4 border-blue-300 rounded-full shadow-md hover:bg-blue-300 shadow-blue-400">SignUp with Google Account</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
