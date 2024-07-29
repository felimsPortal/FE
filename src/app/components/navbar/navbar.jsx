"use client";
import Image from "next/image";
import { UserAuth } from "../../context/AuthContext";
import { Odibee_Sans } from "next/font/google";
import { useState, useEffect } from "react";
import { useFormContext } from "../../context/FormContext";

const Odibee = Odibee_Sans({
  weight: "400",
  subsets: ["latin"],
});

function Navbar() {
  const { user, logOut } = UserAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState([]);

  const navLinks = [
    { name: "Home", href: "/pages/portalUnsubscribed" },
    { name: "TV Shows", href: "#" },
    { name: "Movies", href: "#" },
    { name: "Bookmarks", href: "#" },
  ];

  const { formData } = useFormContext();
  const { display_name } = formData;

  const handleDropDownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputBlur = () => {
    setIsSearching(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("searching for:", searchQuery);
    setIsSearching(false);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      console.log("user has signed out");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const dropDownLinks = [
    { name: "Profile", href: "/pages/profile" },
    { name: "Donation info", href: "/donation" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/userdata");
        if (response.ok) {
          const data = await response.json();
          setUserName(data.payload);
        } else {
          console.error("failed to fetch user data");
        }
      } catch (error) {
        console.log("An error occured while fetching", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div
      className="fixed w-screen h-1/6 bg-transparent z-10"
      style={{ backgroundColor: "transparent" }}
    >
      {user ? (
        <div
          className="fixed w-screen h-1/6 flex items-center z-10 px-16 bg-transparent "
          style={{ backgroundColor: "transparent" }}
        >
          <div className="w-1/5 h-full flex items-end justify-between px-4">
            <Image
              className="mb-1"
              src="/Logo2.png"
              alt="logo"
              width={70}
              height={150}
            />
            <div className={Odibee.className}>
              <h1 className="text-7xl">FELiMS</h1>
            </div>
          </div>

          <div className="w-3/5 h-full flex items-end justify-evenly ">
            {navLinks.map((link, index) => (
              <a
                className="transform transition-transform duration-300 hover:scale-150"
                key={index}
                href={link.link}
              >
                {link.name}
              </a>
            ))}
            {isSearching ? (
              <div className="">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    className="w-56 h-8 border border-gray-300 rounded-3xl text-center focus:outline-none"
                    placeholder="Search felims"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    autoFocus
                  />
                </form>
              </div>
            ) : (
              <button
                className="transform transition-transform duration-300 hover:scale-150"
                onClick={handleSearchClick}
              >
                Search
              </button>
            )}
          </div>

          <div className="w-1/5 h-full flex justify-between items-end px-24 ">
            <div className="relative">
              <button className="ml-2">
                <Image
                  className=""
                  src="/dropDown.png"
                  alt="dropDown"
                  width={30}
                  height={150}
                  onClick={handleDropDownToggle}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-10 w-48 z-50 flex flex-col">
                  <div className="bg-black opacity-40 absolute h-full w-5/6 rounded -z-10"></div>
                  <div className="w-5/6 h-full flex flex-col">
                    <h1>{display_name || "Guest"}</h1>
                    <div className=""></div>
                    {dropDownLinks.map((link, index) => (
                      <a key={index} href={link.href}>
                        {link.name}
                      </a>
                    ))}
                    <button
                      className="rounded-md w-fit"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Image
              className="border-2 border-solid border-red-800 rounded-md"
              src="/Profile.jpg"
              alt="Profile Water Melon"
              width={80}
              height={150}
            />
          </div>
        </div>
      ) : (
        <div className="fixed w-screen h-1/6 flex items-center justify-center border-b-2 border-solid border-red-800  bg-black z-10 ">
          <div className="w-1/5 h-full flex items-end justify-between px-8">
            <Image
              className="mb-6"
              src="/Logo2.png"
              alt="logo"
              width={75}
              height={150}
            />
            <div className={Odibee.className}>
              <h1 className="text-7xl mb-6">FELiMS</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
