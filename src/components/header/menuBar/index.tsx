import { MenuItem } from "./index.styles"
import React, { useEffect, useState } from "react";

import GamePredictionMenu from "./gamePredictionMenu";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'
import { selectAccessToken, selectRefreshToken, setAccessTokenAsync,setRefreshTokenAsync } from "@/store/auth/tokenSlice";
import axios from "axios";
import { isLoginCheck } from "@/components/functions/auth";
import { storage } from "@/store/auth/storage";
import { useRouter } from "next/router";
const api = axios.create({
  baseURL: "http://localhost:8000/",
});
interface ImenuBarProps {
  selectedPage: String,
  
}

const MenuBar: React.FC<ImenuBarProps> = ({ selectedPage }) => {
  const accessToken = useSelector(selectAccessToken)

  const [loginFlag, setLoginFlag] = useState(false)

  const refreshToken = useSelector(selectRefreshToken)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    let loginState = isLoginCheck({ accessToken, refreshToken })
    loginState.then(res => {
      if (res !== null) {
        dispatch(setAccessTokenAsync(res))
        setLoginFlag(true)
        if(router.asPath==="/login"||router.asPath==="/signup")
          router.replace("/")
      }
      else {
        setLoginFlag(false)
      }

    })


  }, []);

  var logoutHandle = () => {
    const sendData = new URLSearchParams()
    sendData.append('refresh', refreshToken)

    api.get("api/logout", {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        storage.remove("aToken")
        dispatch(setAccessTokenAsync("null"))

        storage.remove("rToken")

        dispatch(setRefreshTokenAsync("null"))
        setLoginFlag(false)
      })
      .catch(err => {
        alert(err.message)

        // storage.remove("aToken")
        // storage.remove("rToken")
        // setLoginFlag(false)

      })
  }
  return (
    <div className="w-full h-full flex text-white justify-between sm:justify-end items-center">
      <GamePredictionMenu selectedPage={selectedPage} />
      <MenuItem className={selectedPage === "guide" ? "bg-black/75" : ''} id="guide">
        <Link href={"guide"} className="w-full h-full flex items-center justify-center">Guide</Link>
      </MenuItem>
      <MenuItem className={selectedPage === "bulletin" ? "bg-black/75" : ''}>
        <Link href={"bulletin"} className="w-full h-full flex items-center justify-center">Bulletin Board</Link>
      </MenuItem>
      {
        loginFlag === false ? (
          <MenuItem className={selectedPage === "login" ? "bg-black/75" : ''}>
            <Link href={"login"} className="w-full h-full flex items-center justify-center">Log In</Link>
          </MenuItem>
        ) : (
          <MenuItem className={selectedPage === "" ? "bg-black/75" : ''}>
            <div className="w-full h-full flex items-center justify-center" onClick={logoutHandle}>Log out</div>
          </MenuItem>
        )
      }


      {
        loginFlag === false && <MenuItem className={selectedPage === "signup" ? "bg-black/75" : ''}>
          <Link href={"signup"} className="w-full h-full flex items-center justify-center">Sign Up</Link>
        </MenuItem>
      }
    </div>
  )
}
export default MenuBar;
