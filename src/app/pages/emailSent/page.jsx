import Navbar from "../../components/navbar/navbar";
import Image from "next/image";
import { Fjalla_One } from "next/font/google";
import Footer from "@/app/components/footer/footer";

const Fjalla = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});

const EmailSent = () => {
  return (
    <div className="relative h-screen w-screen">
      <div className="h-32  flex items-center justify-center ">
        <Image
          className=""
          src="/Logo2.png"
          alt="logo"
          width={75}
          height={150}
        />
        <Image
          className=""
          src="/logoName.png"
          alt="logo"
          width={325}
          height={150}
        />
      </div>
      <div className=" h-5/6 w-full flex justify-center items-center ">
        <div className="absolute w-1/2 h-1/2 bg-green-900 blur-3xl rounded-tl-3xl rounded-br-3xl mt-24"></div>
        <div className="absolute w-2/3 h-1/2 font-bold text-3xl text-center text-white tracking-wide  flex flex-col items-center justify-center z-10 ">
          <div className={Fjalla.className}>
            <h1 className="mb-5 text-5xl">YOUR REGISTERATION IS COMPLETE</h1>
            <br />
            <h2 className="mb-5">TO LOGIN CHECK YOUR EMAIL</h2>
            <br />
            <h3>YOU MAY SAFELY CLOSE THIS WINDOW</h3>
          </div>
        </div>

        <div className=" w-full h-5/6 flex items-center justify-center ">
          <Image
            className="opacity-20"
            src="/emailSentCollage.png"
            alt="collage"
            width={1440}
            height={600}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailSent;
