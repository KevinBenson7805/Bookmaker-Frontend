import React, { useEffect, useRef, useState } from "react";


interface IBallInputProps {
  inputValue:string;
  setInputValue:React.Dispatch<React.SetStateAction<string>>;
  inputType:string
}

const BallInput: React.FC<IBallInputProps> = ({inputValue,setInputValue,inputType }) => {
  var ballRef=useRef<HTMLImageElement>(null)
 
  var onBlurHandle = ()=>{

    if(inputValue!==""){
      ballRef.current?.classList.remove("translate-x-0")


      ballRef.current?.classList.add("translate-x-[333px]")
    }
   
  }
  var onClickHandle = ()=>{
    ballRef.current?.classList.remove("translate-x-[333px]")
    
    ballRef.current?.classList.add("translate-x-0")

    
  }
  return (
    <div className="">
      <div className="relative group w-96 h-12">
        <input type={inputType} className="outline-none absolute w-96 h-12 px-12 rounded-full border-4 border-blue-300 text-xl focus:bg-white/80
         bg-transparent focus:text-black text-white transition duration-500  shadow-blue-400 shadow-lg"
         value={inputValue} onChange={(evt)=>setInputValue(evt.target.value)}
         onBlur={()=>{onBlurHandle()}} onMouseDown={()=>{onClickHandle()}}>
        </input>
        
        <img src="./images/ball.png" alt="ball" width={48} height={48} ref={ballRef}
        className="p-px ml-px absolute transition duration-500 "/>
        
        
      </div>
    </div>

  )
}
export default BallInput;
