import "./Navbar.css";
import React, { useEffect, useState } from "react";
import Logo from "../../../assets/Logo.png";
import { Link } from "react-router-dom";
import { ImMenu3, ImCross } from "react-icons/im";

// import { ImMenu3 } from "react-icons/im";
// import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import app from "../../../../firebase.config";
import { logoutUser } from "../../../features/userSlice";
import SolutionsDropdown from "./SolutionsDropdown";
import { FaBars } from "react-icons/fa6";

const auth = getAuth(app);

const Navbar = () => {
  const user = useSelector((state) => state.data.user.user);
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handelLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
  };

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navItem = (
    <>
      <Link className="text-red" to="/">
        Home
      </Link>
      <Link to="/features">Feature</Link>
      <SolutionsDropdown />
      {/* <Link to="/blog">Blog</Link> */}
      {user && <Link to="/dashboard">Dashboard</Link>}
      <Link to="/online-meeting">New Meeting</Link>
      {user ? (
        <>
          <Link onClick={handelLogout}>Logout</Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="p-3 w-32 rounded-full hover:bg-[#5EC38B] hover:text-white border shadow">
              Login
            </button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <div
      className={`${
        isSticky
          ? " backdrop-opacity-60 backdrop-invert bg-[#1D2E42] text-white sticky top-0"
          : "bg-transparent -top-24"
      } transition duration-300 ease-in-out z-10}
      style={{ transition: "all 0.3s ease" }`}
    >
      <div
        className={`container mx-auto py-2 flex items-center justify-between`}
      >
        <div className="flex items-center">
          <img className="w-16 ms-5" src={Logo} alt="Logo" />
        </div>
        <div>
          <button
            onClick={handleNavToggle}
            className="md:hidden me-4 text-3xl ml-28"
          >
            {isNavOpen ? <FaBars /> : <ImCross />}
          </button>
          <ul className={`md:hidden ${isNavOpen ? "hidden" : "static"}`}>
            <li className="nav-items-responsive font-semibold text-lg">
              {navItem}
            </li>
          </ul>
          <ul className="hidden md:block">
            <li className="nav-items font-semibold text-lg">{navItem}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
