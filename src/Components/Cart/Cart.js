import { useCart } from "./Cartpage";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

function Cart() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("shoppingCart")}
      </h1>
      {cart.length === 0 ? (
        <p className="text-center">
          {t("Your Cart is Empty")}{" "}
          <Link to="/" className="text-blue-600">
            {t("shopNow")}
          </Link>
        </p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 bg-white shadow-xl rounded-lg p-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-5 hover:bg-gray-50 rounded-md transition"
              >
                <img
                  src={`/Eccomerce/images/${item.imageUrl}`}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-md shadow-md"
                />
                <div className="flex-1 ml-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="text-gray-700">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-pink-600 font-medium hover:text-pink-700 transition"
                >
                  {t("remove")}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold">
              {t("total")}: ${totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={clearCart}
              className="bg-green-600 text-white px-6 py-2 mt-4 rounded hover:bg-green-700"
            >
              {t("placeOrder")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
