import React, { useState } from "react";

import { Container } from "./styles";
import { MenuItem } from "../index.styles";
import Link from "next/link";

interface IGamePredictionMenuProps {
  selectedPage:String
}

const GamePredictionMenu: React.FC<IGamePredictionMenuProps> = ({ selectedPage}) => {
  return (
    <div className="relative w-1/4 lg:w-40 h-full group cursor-pointer">
      <MenuItem className={selectedPage === "prediction" ? "bg-black/75 w-full group-hover:bg-black" : "w-full  group-hover:bg-black"}>
        <Link href={"prediction"} className="w-full h-full flex items-center justify-center ">Game Prediction</Link>
      </MenuItem>
      <div id="menu-options" className="absolute -translate-y-1/2 scale-y-0 group-hover:translate-y-0 group-hover:scale-y-100 group-hover:flex-col transition duration-700
            w-full bg-black/50 shadow-md shadow-black/75
        ">
        <li className="list-none flex justify-center p-3 hover:bg-black transition duration-500">asdfasdf</li>
        <li className="list-none flex justify-center p-3 hover:bg-black transition duration-500">asdfasdf</li>
        <li className="list-none flex justify-center p-3 hover:bg-black transition duration-500">asdfasdf</li>

      </div>
    </div>

  )
}
export default GamePredictionMenu;
