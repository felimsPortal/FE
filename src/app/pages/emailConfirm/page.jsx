"use client";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const EmailConfirm = () => {
  const { sendEmailLink } = UserAuth();
  const router = useRouter();
  const [email, setEmail] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setEmail((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(email);
  };

  const sendLink = async (e) => {
    e.preventDefault();
    const userEmail = email.email.trim();
    const isValidEmail = (email) => {
      return email.includes("@");
    };
    if (userEmail === "") {
      console.log("email field is empty");
      toast("Please enter your email address");
      return;
    } else if (!isValidEmail(userEmail)) {
      console.log("email is invalid");
      toast("Please enter a valid email address");
      return;
    } else {
      try {
        await sendEmailLink(userEmail);
        router.push("/pages/emailSent");
      } catch (error) {
        errorCode = error.code;
        errorMessage - error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  return (
    <form onSubmit={sendLink}>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="w-1/2 h-1/2 bg-red-700 border border-green-500">
          <div className="w-full h-full flex items-center justify-between text-black ">
            <div className="ml-10">Please enter your email address: </div>
            <input
              className="mr-10"
              id="email"
              type="email"
              name="email"
              value={email.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50  border border-red-500">
            Submit
          </button>
        </div>
        <ToastContainer />
      </div>
    </form>
  );
};

export default EmailConfirm;
