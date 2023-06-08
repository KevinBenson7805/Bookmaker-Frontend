import { Inter } from 'next/font/google'
import Header from '@/components/header'
import BallInput from '@/components/widgets/ballInput'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { send } from 'process'

export default function Login() {
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailAddressFlagState, setEmailAddressFlagState] = useState(0)
  const [confirmPasswordFlagState, setConfirmPasswordFlagState] = useState(0)

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
    if(emailAddress!=="")
      if (isEmailValid(emailAddress)) {
        setEmailAddressFlagState(1)
      } else {
        setEmailAddressFlagState(2)
      }
    else setEmailAddressFlagState(0)
  }, [emailAddress])
  function isEmailValid(email:string) {
    // Regex for checking email format
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(String(email).toLowerCase());
  }
  var signUpWithEmail = () => {
    if (emailAddress === "") {
      setEmailAddressFlagState(2)
    }
    else if (emailAddressFlagState===1){
      if(confirmPasswordFlagState===1){
        let sendData = new FormData()
        sendData.append('emailAddress',emailAddress)
        sendData.append('password',password)
        Axios.post("http://localhost:8000/api/users/",sendData)
        .then(res=>{
          alert("success")
        })
        .catch(err=>{
          alert("error")
        })
      }
    }

  }
  return (
    <div>
      <Header selectedPage={"signup"} />
      <div className="absolute w-full h-full bg-transparent z-40">
        <div id="login-window" className=' animate-fadeIn'>
          <div className="absolute h-screen">
            <img src="./images/back.jpg" alt="" className=" object-center h-full object-cover" />
          </div>

          <div className="absolute w-full h-[100vh] pt-64 bg-gray-700/75 ">
            <div className='w-fit h-full container mx-auto flex flex-col justify-between'>
              <div id="signUpArea" className=' pt-28'>
                <div className="sm:flex w-fit h-fit p-4 justify-start">
                  <div className=' w-48 h-12 flex items-center text-3xl text-white'>Email: </div>
                  <BallInput inputType='text' inputValue={emailAddress} setInputValue={setEmailAddress} />
                  <div>
                    {emailAddressFlagState !== 0 && <img src={emailAddressFlagState === 1 ? "./images/check-true.png" : "./images/check-false.png"}
                      alt="check-image" width={40} height={40} className='absolute p-2 mx-5 animate-pulse' />}
                  </div>
                </div>
                <div className="sm:flex w-fit h-fit p-4 justify-start">
                  <div className=' w-48 h-12 flex items-center text-3xl text-white'>Password: </div>
                  <BallInput inputType='password' inputValue={password} setInputValue={setPassword} />
                </div>
                <div className="sm:flex w-fit h-fit p-4 justify-start">
                  <div className=' w-48 h-12 flex items-center text-3xl text-white'>Confirm: </div>
                  <BallInput inputType='password' inputValue={confirmPassword} setInputValue={setConfirmPassword} />
                  <div>
                    {confirmPasswordFlagState !== 0 && <img src={confirmPasswordFlagState === 1 ? "./images/check-true.png" : "./images/check-false.png"}
                      alt="check-image" width={40} height={40} className='absolute p-2 mx-5 animate-pulse' />}
                  </div>
                </div>

              </div>
              <div id="signUpGroup" className=" pb-40">
                <div className="flex w-full h-20 p-4 ">
                  <button className="w-full h-full bg-white hover:bg-blue-100 border-blue-300 border-4 rounded-full text-black text-xl transition duration-500 shadow-md shadow-blue-400"
                    onClick={signUpWithEmail}
                  >SignUp with Email</button>
                </div>
                <div className="flex w-full h-20 p-4">
                  <button className="w-full h-full bg-blue-500 hover:bg-blue-300 border-blue-300 border-4 rounded-full text-white text-xl transition duration-500 shadow-md shadow-blue-400">SignUp with Google Account</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
