import Navbar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import {Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore.js"

function App() {
  const {theme} = useThemeStore()
  return (
    <div className="min-h-screen bg-base-200 trasition-colors duration-300" data-theme={theme}>
      <Navbar /> 

    
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
    </div>
  )
}

export default App;