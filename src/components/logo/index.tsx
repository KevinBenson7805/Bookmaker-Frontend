import { LogoImg } from "./index.styles"
import React from "react";

import { Container } from "./styles";
import Link from "next/link";

interface ILogoProps {

}

const Logo: React.FC<ILogoProps> = ({ }) => {
  return (
      <Link href={"/"}>
        <LogoImg src="./images/logo.png" alt="logo" className=" invisible w-0 md:w-fit md:visible">

        </LogoImg>
      </Link>

  )
}
export default Logo;
