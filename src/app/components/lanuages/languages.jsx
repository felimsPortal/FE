const Languages = () => {
  return (
    <div>
      <select
        name="language"
        id=""
        className="w-48 h-8 rounded-xl text-gray-200 bg-gray-900 text-sm border-2 border-gray-600 focus:border-red-900 transition duration-200 ease-in-out px-2"
      >
        <option value="" className="text-center">
          Select your language
        </option>
        <option value="Arabic">Arabic</option>
        <option value="Danish">Danish</option>
        <option value="Dutch">Dutch</option>
        <option value="English">English</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Italian">Italian</option>
        <option value="Korean">Korean</option>
        <option value="Mandarin">Mandarin</option>
        <option value="Romanian">Romanian</option>
        <option value="Russian">Russian</option>
        <option value="Spanish">Spanish</option>
        <option value="Swedish">Swedish</option>
        <option value="Turkish">Turkish</option>
      </select>
    </div>
  );
};

export default Languages;
