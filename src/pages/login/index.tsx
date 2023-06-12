import Header from '@/components/header'
import { useEffect, useState } from 'react'
import BallInput from '@/components/widgets/ballInput'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import {  selectAccessToken, selectRefreshToken, setAccessTokenAsync, setRefreshTokenAsync } from '@/store/auth/tokenSlice'
import { isLoginCheck } from '@/components/functions/auth';
import { useRouter } from 'next/router';
const api = axios.create({
  baseURL: "http://localhost:8000/",
});
export default function Login() {

  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [emailAddressFlagState, setEmailAddressFlagState] = useState(0)
  const [passwordFlagState, setPasswordFlagState] = useState(0)
  

  const [loginFlag,setLoginFlag] = useState(false)

  const accessToken = useSelector(selectAccessToken)
  const refreshToken = useSelector(selectRefreshToken)
  const dispatch = useDispatch() 
  const router = useRouter()

  useEffect(() => {

    
    let loginState=isLoginCheck({accessToken,refreshToken})

    loginState.then(res=>{
      if(res!==null){
        dispatch(setAccessTokenAsync(res))
        setLoginFlag(true)  
      }
      else{
        setLoginFlag(false)
      }
  
    })

    
  }, []);
  useEffect(() => {
    if (emailAddress !== "")
      if (isEmailValid(emailAddress)) {
        setEmailAddressFlagState(1)
      } else {
        setEmailAddressFlagState(2)
      }
    else setEmailAddressFlagState(0)
  }, [emailAddress])

  function isEmailValid(password: string) {
    // Regex for checking password format
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(String(password).toLowerCase());
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
  function isPasswordValid(email: string) {
    // Regex for checking email format
    if (password.length < 8 || password.length > 100) {
      return false;
    }
    return true;
  }
  const signInWithEmail = () => {
    if (emailAddressFlagState === 1 && passwordFlagState === 1) {
      let sendData = new FormData()
      sendData.append('email ', emailAddress)
      sendData.append('password', password)
      api.post("api/token/", sendData)
        .then(res => {
          
            dispatch(setAccessTokenAsync(res.data.access)) 
            dispatch(setRefreshTokenAsync(res.data.refresh)) 
          
          // setLoginFlag(true)

          router.replace('/')
        })
        .catch(err => {
          alert(err )
        })
    }
  }
  return (
    <div>
      <Header selectedPage={"login"} />
      <div className="absolute w-full h-full bg-transparent z-40 overflow-y-scroll">
        <div id="login-window" className="">
        <div className="fixed h-screen w-full ">
            <img src="./images/back.jpg" alt="" className="absolute object-center h-full xl:w-full object-cover" />
            <div className='absolute bg-gray-700 h-full w-full animate-fadeIn'></div>
          </div>
          <div className="absolute w-full h-[100vh] pt-64">
            <div className='w-fit h-full container mx-auto flex flex-col justify-between'>
              <div id="signInArea" className=' pt-0 sm:pt-28'>
                <div className="sm:flex w-fit h-fit p-4 justify-start">
                  <div className=' w-48 h-12 flex items-center text-3xl text-white'>Email: </div>

                  <BallInput inputType='text' inputValue={emailAddress} setInputValue={setEmailAddress} validState={emailAddressFlagState} />
                  {/* <div>
                    {emailAddressFlagState !== 0 && <img src={emailAddressFlagState === 1 ? "./images/check-true.png" : "./images/check-false.png"}
                      alt="check-image" width={40} height={40} className='absolute p-2 mx-5 animate-pulse' />}
                  </div> */}
                </div>
                <div className="sm:flex w-fit h-fit p-4 justify-start">
                  <div className=' w-48 h-12 flex items-center text-3xl text-white'>Password: </div>
                  <BallInput inputType='password' inputValue={password} setInputValue={setPassword} validState={passwordFlagState} />
                </div>
              </div>

              <div id='signInGroup' className=' pb-40'>
                <div className="flex w-full h-20 p-4">
                  <button className="w-full h-full bg-white hover:bg-blue-100 border-blue-300 border-4 rounded-full text-black text-xl transition duration-500 shadow-md shadow-blue-400"
                    onClick={signInWithEmail}
                  >SignIn with Email</button>
                </div>
                <div className="flex w-full h-20 p-4 bottom-4">
                  <button className="w-full h-full bg-blue-500 hover:bg-blue-300 border-blue-300 border-4 rounded-full text-white hover:text-black text-xl transition duration-500 shadow-md shadow-blue-400">SignUp with Google Account</button>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>


    </div>

  )
}
