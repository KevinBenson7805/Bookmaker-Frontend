import React, { useEffect, useRef, useState } from "react";


interface IBallInputProps {
  inputValue:string;
  setInputValue:React.Dispatch<React.SetStateAction<string>>;
  inputType:string;
  
  validState:number
}

const BallInput: React.FC<IBallInputProps> = ({inputValue,setInputValue,inputType,validState }) => {
  var ballRef=useRef<HTMLImageElement>(null)
  const [inputBgColor,setInputBgColor] = useState("bg-transparent")
  useEffect(()=>{
    if(inputValue===""){
      ballRef.current?.classList.remove("translate-x-[333px]")
    
      ballRef.current?.classList.add("translate-x-0")
    }
  },[inputValue])
  useEffect(()=>{
    
    
    if(validState===0){
      setInputBgColor("transparent")

    }
    
    else if(validState===1){
      setInputBgColor("#143713ba")
    }
    else if(validState===2){
      setInputBgColor("#431616ba")

    }
  },[validState])
  var onBlurHandle = ()=>{
    if(validState===0)
      setInputBgColor("transparent")

    if(inputValue!==""){
      ballRef.current?.classList.remove("translate-x-0")


      ballRef.current?.classList.add("translate-x-[333px]")
    }
   
  }
  var onClickHandle = ()=>{
    ballRef.current?.classList.remove("translate-x-[333px]")
    
    ballRef.current?.classList.add("translate-x-0")
    ballRef.current?.classList.add("transition")
    ballRef.current?.classList.add("duration-500")
    if(validState===0){
      setInputBgColor("#0f2c3dc4")

    }
    
    else if(validState===1){
      setInputBgColor("#143713ba")
    }
    else if(validState===2){
      setInputBgColor("#431616ba")

    }
    
    
  }
  return (
    <div className="">
      <div className="relative group w-96 h-12">
        <input type={inputType} style={{backgroundColor:inputBgColor}}
        className="outline-none absolute w-96 h-12 px-12 rounded-full border-4 border-blue-300 text-xl bg-transparent
         text-white transition duration-500  shadow-blue-400 shadow-lg"
         value={inputValue} onChange={(evt)=>setInputValue(evt.target.value)}
         onBlur={()=>{onBlurHandle()}} onMouseDown={()=>{onClickHandle()}}>
        </input>
        
        <img src="./images/ball.png" alt="ball" width={48} height={48} ref={ballRef}
        className="p-px ml-px absolute"/>
        
        
      </div>
    </div>

  )
}
export default BallInput;
