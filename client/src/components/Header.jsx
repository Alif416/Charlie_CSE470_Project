import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl m-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-white">Basha </span>
            <span className="text-yellow-300">Lagbe?</span>
          </h1>
        </Link>

        <form className="bg-white p-2 rounded-lg items-center flex shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 placeholder-gray-500"
          />
          <FaSearch className="text-gray-500" />
        </form>

        <ul className="flex gap-4">
          <Link to={"/"} className="hidden sm:inline">
            <li className="text-white hover:text-yellow-300 transition duration-300">Home</li>
          </Link>
          <Link to={"/about"} className="hidden sm:inline">
            <li className="text-white hover:text-yellow-300 transition duration-300">About</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}