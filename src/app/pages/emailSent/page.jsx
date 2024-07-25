import Navbar from "@/app/components/navbar/navbar";
import Image from "next/image";

const EmailSent = () => {
  return (
    <div className="relative h-screen w-screen">
      <Navbar />
      <div className=" h-full w-full flex justify-center items-center">
        <div className="absolute w-1/2 h-1/2 bg-green-900 blur-3xl rounded-tl-3xl rounded-br-3xl mt-24"></div>
        <div className="absolute  w-2/3 h-1/2 font-bold text-xl text-white  flex flex-col items-center justify-center  z-10">
          <h1 className="mb-5">YOUR REGISTERATION IS COMPLETE.</h1>
          <h2 className="mb-5">TO LOGIN CHECK YOUR EMAIL</h2>
          <h3>YOU MAY SAFELY CLOSE THIS WINDOW</h3>
        </div>

        <div className=" w-full h-5/6 flex items-center justify-center">
          <Image
            className="mt-32 opacity-20"
            src="/emailSentCollage.png"
            alt="collage"
            layout="fixed"
            width={1440}
            height={600}
            // objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
