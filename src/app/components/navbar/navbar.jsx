import Image from "next/image";

function Navbar() {
  return (
    <div className="fixed w-screen h-1/6 flex justify-center border-b-2 border-solid border-red-800  bg-black z-10">
      <Image
        className=""
        src="/logoOfficial.png"
        alt="logo"
        width={160}
        height={150}
      />
    </div>
  );
}

export default Navbar;
