"use client";
import Image from "next/image";
import { UserAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      console.log("user has signed out");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const navLinks = [
    { name: "Home", href: "/pages/portalUnsubscribed" },
    { name: "TV Shows", href: "#" },
    { name: "Movies", href: "#" },
    { name: "My bookmarks", href: "#" },
    { name: "Sign Out", href: handleSignOut },
  ];
  return (
    <div className="fixed w-screen h-1/6 flex items-center border-b-2 border-solid border-red-800  bg-black z-10">
      {user ? (
        <div>
          <Image
            className=""
            src="/logoOfficial.png"
            alt="logo"
            width={140}
            height={150}
          />

          <div className="ml-10 flex items-baseline justify-between">
            {navLinks.map((link, index) => (
              <a key={index} href={link.link}>
                {link.name}
              </a>
            ))}
            <button
              className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Image
            className=""
            src="/logoOfficial.png"
            alt="logo"
            width={140}
            height={150}
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
