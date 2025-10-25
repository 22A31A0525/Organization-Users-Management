import React from "react";
import Logo from "../../assests/vite.svg";
import BellIcon from "../../assests/bell.png";
import UserIcon from "../../assests/user_icon.png";
import HeadSet from "../../assests/headset.png";

const Header = () => {
  return (
    <header className="bg-white shadow-xs h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 ">
      <div className="flex items-center">
        <img src={Logo} alt="LOGO" className="h-8 w-auto mr-4" />
        <span className="text-xl font-bold text-gray-900 hidden md:block"></span>{" "}
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">
          <img src={HeadSet} alt="HeadSet" className="h-5 w-5" />
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <img src={BellIcon} alt="HeadSet" className="h-5 w-5" />
        </button>

        <div className="relative">
          <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <img
              src={UserIcon}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
