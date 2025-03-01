import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Cart/Cartpage";
import { useLanguage } from "../../context/LanguageContext";

function Header() {
  const { cart } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      setShowLogin(false);
    }
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-blue-400">{t("ecommerce")}</h1>

      <div className="flex items-center space-x-6">
        <button
          onClick={toggleLanguage}
          className="bg-indigo-600 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-indigo-500"
        >
          {language === "en" ? "EN" : "AL"}
        </button>

        <button
          onClick={() => setShowLogin(true)}
          className="bg-indigo-600 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-blue-500"
        >
          {t("login")}
        </button>

        <Link to="/cart" className="relative">
          <img
            src={`${process.env.PUBLIC_URL}/cart.png`}
            alt="Cart"
            className="w-10 h-10 object-contain transition hover:scale-110"
          />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4  text-blue-600">
              {t("login")}
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder={t("username")}
                className="border p-2 w-full"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <input
                type="password"
                placeholder={t("password")}
                className="border p-2 w-full"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full text-center"
              >
                {t("login")}
              </button>
            </form>
            <button
              onClick={() => setShowLogin(false)}
              className="mt-4 text-gray-600"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
