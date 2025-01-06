<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import ExplorePage from "./pages/ExplorePage";
import Features from "./pages/Features";
import LandlordPage from "./pages/LandlordPage";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Header */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          
        </Route>

        {/* Protected Routes under Dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
        {/* Dashboard Home */}
          <Route path="profile" element={<Profile />} /> {/* Relative path */}
          <Route path="features" element={<Features />} /> {/* Features Page */}
          <Route path="landlord" element={<LandlordPage />} /> {/*Landlord Page */}
          <Route path="explore"  element={<ExplorePage/>}/>

        </Route>
      </Routes>
    </Router>
  );
}

export default App; 
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> 27f835a85f5476eef745d5085de0b81c357835ae
