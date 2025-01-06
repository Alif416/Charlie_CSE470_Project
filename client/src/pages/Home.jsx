import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
      }}
    >
      {/* Dark Overlay */}
      <div className="min-h-screen bg-black bg-opacity-70">
        {/* Navbar */}
        <nav className="bg-black bg-opacity-50 backdrop-blur-md p-4 fixed w-full top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-white">Basha Lagbe ? </div>
            <div className="flex gap-6">
              <Link
                to="/"
                className="text-white hover:text-purple-300 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-purple-300 transition duration-300"
              >
                About
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
          <h1 className="text-5xl lg:text-7xl font-bold text-center mb-6">
            Find Your Next <span className="text-purple-300">Perfect</span>
            <br />
            Place With Ease
          </h1>

          <p className="text-lg text-center mb-8 max-w-2xl">
            Basha Lagbe is the coolest and perfect place you can think of. We
            have a wide and diverse range of properties for you to choose from.
          </p>

          {/* Client and Admin Sections */}
          <div className="flex gap-8">
            <Link
              to="/admin/signup"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition duration-300"
            >
              Admin
            </Link>
            <Link
              to="/sign-in"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition duration-300"
            >
              Client
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
