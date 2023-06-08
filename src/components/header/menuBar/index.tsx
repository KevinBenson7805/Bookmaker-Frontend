import { MenuItem } from "./index.styles"
import React from "react";

import { Container } from "./styles";
import GamePredictionMenu from "./gamePredictionMenu";
import Link from "next/link";

interface ImenuBarProps {
  selectedPage: String
}

const MenuBar: React.FC<ImenuBarProps> = ({ selectedPage }) => {
  return (
    <div className="w-full h-full flex text-white justify-between sm:justify-end items-center">
      <GamePredictionMenu selectedPage={selectedPage} />
      <MenuItem className={selectedPage === "guide" ? "bg-black/75" : ''} id="guide">
        <Link href={"guide"} className="w-full h-full flex items-center justify-center">Guide</Link>
      </MenuItem>
      <MenuItem className={selectedPage === "bulletin" ? "bg-black/75" : ''}>
        <Link href={"bulletin"} className="w-full h-full flex items-center justify-center">Bulletin Board</Link>
      </MenuItem>
      
      <MenuItem className={selectedPage === "login" ? "bg-black/75" : ''}>
        <Link href={"login"} className="w-full h-full flex items-center justify-center">Log In</Link>
      </MenuItem>
      <MenuItem className={selectedPage === "signup" ? "bg-black/75" : ''}>
        <Link href={"signup"} className="w-full h-full flex items-center justify-center">Sign Up</Link>
      </MenuItem>
    </div>
  )
}
export default MenuBar;
