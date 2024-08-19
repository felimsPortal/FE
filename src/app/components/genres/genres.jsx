const Genres = () => {
  return (
    <div>
      <select
        name="language"
        id=""
        className="w-48 h-8 rounded-xl text-gray-200 bg-gray-900 text-sm border-2 border-gray-600 focus:border-red-900 transition duration-200 ease-in-out px-2"
      >
        <option value="" className="text-center">
          Select your genres
        </option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Biography">Biography</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Documentary">Documentary</option>
        <option value="Drama">Drama</option>
        <option value="Family">Family</option>
        <option value="Fantasy">Fantasy</option>
        <option value="History">History</option>
        <option value="Horror">Horror</option>
        <option value="Kung-Fu">Kung-Fu</option>
        <option value="Musicals">Musicals</option>
        <option value="Mystery">Mystery</option>
        <option value="News">News</option>
        <option value="Reality TV">Reality TV</option>
        <option value="Romance">Romance</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Thriller">Thriller</option>
        <option value="War">War</option>
        <option value="Western">Western</option>
      </select>
    </div>
  );
};

export default Genres;
