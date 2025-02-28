import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../Cart/Cartpage";
import { useLanguage } from "../../context/LanguageContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    fetch(`/Eccomerce/api/products.json`)
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((p) => p.id === Number(id));
        setProduct(foundProduct);
      });
  }, [id]);

  if (!product)
    return <p className="text-center text-gray-600">{t("loading")}</p>;

  const translatedProduct = t(`products.${id}`) || {};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/"
        className="text-indigo-600 hover:underline flex items-center"
      >
        ⬅ {t("shopNow")}
      </Link>
      <div className="bg-white shadow-2xl rounded-lg p-8 mt-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {translatedProduct.name || product.name}
        </h1>
        <img
          src={`/Eccomerce/images/${product.imageUrl}`}
          alt={product.name}
          className="w-72 h-72 mx-auto object-contain mb-4 rounded-lg shadow-md"
        />
        <p className="text-gray-700 text-lg mb-2">
          {translatedProduct.description || product.description}
        </p>
        <p className="text-gray-900 font-bold text-2xl mb-4">
          ${product.price}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg transition hover:bg-green-600 transform hover:scale-105"
        >
          {t("placeOrder")}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
