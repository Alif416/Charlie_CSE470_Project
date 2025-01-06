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