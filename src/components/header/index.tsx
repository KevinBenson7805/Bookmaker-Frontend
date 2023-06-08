import { HeaderBar } from "./index.styles"
import React from "react";

import { Container } from "./styles";
import Logo from "../logo";
import MenuBar from "./menuBar";

interface IheaderProps {
  selectedPage:String
}

const Header: React.FC<IheaderProps> = ({ selectedPage}) => {
  return (
      <HeaderBar >
        <Logo />
        <MenuBar selectedPage={selectedPage}/>
      </HeaderBar>
  )
}
export default Header;
