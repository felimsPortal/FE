"use clent";
import { useFormContext } from "@/app/context/FormContext";

const EmailConfirm = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-36 h-36 bg-red-700 border border-green-500">
        <input type="email" />
      </div>
    </div>
  );
};

export default EmailConfirm;
