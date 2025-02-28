import { Link } from "react-router-dom";
import { useCart } from "../Cart/Cartpage";
import { useLanguage } from "../../context/LanguageContext";

function Header() {
  const { cart } = useCart();
  const { language, toggleLanguage, t } = useLanguage(); // Using t() for translations

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

        <Link to="/cart" className="relative">
          <img
            src={`${process.env.PUBLIC_URL}/cart-removebg-preview.png`}
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
    </header>
  );
}

export default Header;
