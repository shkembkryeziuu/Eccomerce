import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Products from "./Components/Product/Products";
import ProductDetail from "./Components/Product/ProductDetail";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart/Cart";
import { CartPage } from "./Components/Cart/Cartpage";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <Router basename="/Eccomerce">
      <LanguageProvider>
        <CartPage>
          <div className="flex flex-col min-h-screen">
            {!isLoggedIn ? (
              // Login Page
              <Routes>
                <Route
                  path="/login"
                  element={
                    <Login
                      credentials={credentials}
                      setCredentials={setCredentials}
                      handleLogin={handleLogin}
                      setShowLogin={() => {}}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            ) : (
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </main>
                <Footer />
              </>
            )}
          </div>
        </CartPage>
      </LanguageProvider>
    </Router>
  );
}

export default App;
