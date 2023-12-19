import { Link } from "react-router-dom";
import { TranslateButton } from "./Button";
import Menu from "./Menu";

export const Nav = ({srollState,setMenu,menu}) => (
  <nav
    className={`  fixed w-full px-8 z-30  duration-200 ease-linear transition   mx-auto h-[10vh]  items-center flex justify-between  ${
      srollState ? "bg-white" : "bg-transparent"
    }  ${srollState ? "shadow" : ""}`}
  >
    <div className="logo font-bold border-b-2 border-[#613F75] text-[20px] md:text-[25px] uppercase">
      {" "}
      <img src="" alt="" /> Kanlearn
    </div>
    <div className="md:flex h-full text-[#613F75] font-medium  items-center uppercase gap-3 hidden w-2/4">
      <TranslateButton text="Home" width={100} height={40} />

      <TranslateButton text="About" width={100} height={40} />

      <TranslateButton text="Videos" width={100} height={40} />

      <TranslateButton text="Teachers" width={100} height={40} />
    </div>
    <div className="hidden md:flex  gap-5  uppercase">
      <Link
        className="px-5 hover:text-[#ffffff] hover:bg-[#613F75] hover: rounded-md py-2 border border-[#613F75]"
        to="/join"
      >
        Sign Up
      </Link>
      <Link
        className="px-5 hover:border transition-all hover:bg-white hover:text-[#613F75] hover:border-[#613F75] rounded-md text-white bg-[#613F75] py-2 "
        to="/login"
      >
        Sign In
      </Link>
    </div>
    <Menu setMenu={setMenu} menu={menu} /> 
  </nav>
);
