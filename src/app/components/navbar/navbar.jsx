"use client";
import Image from "next/image";
import { UserAuth } from "../../context/AuthContext";
import { Odibee_Sans, Oswald } from "next/font/google";
import { useState, useEffect } from "react";
import { VscSignOut } from "react-icons/vsc";
import { GrContact } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
import { MdOutlinePayments } from "react-icons/md";
import { useRouter } from "next/navigation";

const Odibee = Odibee_Sans({
  weight: "400",
  subsets: ["latin"],
});

const OswaldFont = Oswald({
  weight: "400",
  subsets: ["latin"],
});

const Navbar = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const { user, logOut } = UserAuth();
  const router = useRouter();

  const navLinks = [
    { name: "Home", link: "/pages/portalUnsubscribed" },
    { name: "TV Shows", link: "/pages/tvShows" },
    { name: "Movies", link: "/pages/movies" },
    { name: "Bookmarks", link: "/pages/bookmarks" },
    { name: "Documentaries", href: "#" },
  ];

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

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log("Discovering:", searchQuery);

    if (!searchQuery.trim()) {
      console.log("Search query is empty");
      return;
    }

    try {
      const movieResponse = await fetch(
        `http://localhost:3001/api/movies/discover?type=movie&query=${encodeURIComponent(
          searchQuery
        )}`
      );
      const tvResponse = await fetch(
        `http://localhost:3001/api/movies/discover?type=tv&query=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (movieResponse.ok && tvResponse.ok) {
        const movieData = await movieResponse.json();
        const tvData = await tvResponse.json();

        console.log("Movies fetched:", movieData);
        console.log("TV Shows fetched:", tvData);

        localStorage.setItem("movies", JSON.stringify(movieData.results));
        localStorage.setItem("tvShows", JSON.stringify(tvData.results));
        console.log(
          "Movies saved to localStorage:",
          JSON.parse(localStorage.getItem("movies"))
        );
        console.log(
          "TV Shows saved to localStorage:",
          JSON.parse(localStorage.getItem("tvShows"))
        );
        window.location.href = `/pages/searchResults?query=${encodeURIComponent(
          searchQuery
        )}`;
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("An error occurred while fetching search results", error);
    }

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
    {
      name: "SETTINGS",
      href: "/pages/profile",
      icon: <CiSettings style={{ fontSize: "30px" }} />,
    },
    {
      name: "DONATIONS",
      href: "/donation",
      icon: <MdOutlinePayments style={{ fontSize: "30px" }} />,
    },
    {
      name: "CONTACT US",
      href: "/donation",
      icon: <GrContact style={{ fontSize: "30px" }} />,
    },
  ];

  useEffect(() => {
    if (!user) {
      console.log("No user logged in, setting username to Guest");
      setUserName("Guest");
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for user:", user.uid);
        const response = await fetch(
          `http://localhost:3001/api/movies/${user.uid}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Full user data fetched:", data);
          if (data.display_name) {
            setUserName(data.display_name);
          } else {
            setUserName("Guest");
            console.log("display_name not found in user data");
          }

          console.log("Combined movie and TV show data fetched:", data.results);
        } else {
          setUserName("Guest");
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.log("An error occurred while fetching", error);
        setUserName("Guest");
      }
    };

    fetchUserData();
  }, [user]);
  return (
    <div className="fixed w-screen h-1/6 z-10">
      {user ? (
        <div className="fixed w-screen h-32   pb-1 flex items-center px-12 ">
          <div className="w-1/5 h-full flex items-end justify-between px-4 ">
            <Image
              className="mb-1"
              src="/Logo2.png"
              alt="logo"
              width={70}
              height={75.47}
            />
            <div className={Odibee.className}>
              <h1 className="text-7xl">FELiMS</h1>
            </div>
          </div>

          <div className="w-3/5 h-full flex items-end justify-evenly ">
            {navLinks.map((link, index) => (
              <a
                className="transform transition-transform duration-300 hover:scale-150 cursor-pointer"
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
                    className="w-56 h-8 border border-gray-300 rounded-3xl text-center focus:outline-none text-black"
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

          <div className="w-1/5 h-full flex justify-between items-end px-24">
            <div className="relative flex items-center justify-center">
              <button className="">
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
                <div className="absolute w-56 h-72 top-10 z-50 flex flex-col bg-purple-600">
                  <div className="bg-white opacity-100 absolute h-full w-full rounded -z-10"></div>
                  <div className="w-full h-full flex flex-col px-2">
                    <div className="flex items-center justify-center w-full mt-2 text-black">
                      <h1 className={`text-3xl ${OswaldFont.className}`}>
                        {userName}
                      </h1>
                    </div>
                    <hr className="w-full my-4 border-t border-gray-900" />
                    <div className="w-full h-full flex flex-col items-center justify-around ">
                      {dropDownLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.href}
                          className={`w-full flex items-center justify-between text-lg hover:bg-gray-700 px-2 text-black rounded ${OswaldFont.className}`}
                        >
                          <span className="mr-2">{link.icon}</span>
                          {link.name}
                        </a>
                      ))}
                      <div className="w-full flex items-center justify-between px-2 text-black">
                        <VscSignOut style={{ fontSize: "30px" }} />

                        <button
                          className={`rounded-md w-fit text-xl text-black ${OswaldFont.className}`}
                          onClick={handleSignOut}
                        >
                          SIGN OUT
                        </button>
                      </div>
                    </div>
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
};

export default Navbar;
