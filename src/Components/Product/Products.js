import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const { t } = useLanguage();

  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/Eccomerce/api/products.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Loaded products:", data);
        setProducts(data);
      });

    const categoryList = [
      { id: 1, name: "Electronics", parent: null },
      { id: 2, name: "Laptops", parent: 1 },
      { id: 3, name: "Smartphones", parent: 1 },
      { id: 4, name: "Cameras", parent: 1 },
      { id: 5, name: "Digital Cameras", parent: 4 },
      { id: 6, name: "DSLR Cameras", parent: 4 },
      { id: 7, name: "Point and Shoot Cameras", parent: 4 },
      { id: 8, name: "Clothing", parent: null },
      { id: 9, name: "Mens Clothing", parent: 8 },
      { id: 10, name: "Womens Clothing", parent: 8 },
      { id: 11, name: "Shoes", parent: 8 },
      { id: 12, name: "Accessories", parent: null },
      { id: 13, name: "Jewelry", parent: 12 },
      { id: 14, name: "Watches", parent: 12 },
      { id: 15, name: "Bags and Luggage", parent: 12 },
      { id: 16, name: "Headphones", parent: 1 },
      { id: 17, name: "Bikes", parent: null },
    ];

    setCategories(categoryList);
  }, []);

  const handleCategoryFilterChange = (e) => {
    setFilteredCategory(e.target.value ? Number(e.target.value) : "");
    setCurrentPage(1);
  };

  const handlePriceFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") setMinPrice(Number(value));
    if (name === "maxPrice") setMaxPrice(Number(value));
    setCurrentPage(1);
  };

  const getSubcategories = (categoryId) => {
    let subcategories = categories
      .filter((cat) => cat.parent === categoryId)
      .map((cat) => cat.id);

    subcategories.forEach((subId) => {
      subcategories = [...subcategories, ...getSubcategories(subId)];
    });

    return subcategories;
  };

  const filteredProducts = products.filter((product) => {
    const selectedCategoryId = filteredCategory
      ? Number(filteredCategory)
      : null;

    const categoryIds = selectedCategoryId
      ? [selectedCategoryId, ...getSubcategories(selectedCategoryId)]
      : [];

    const isCategoryMatch = selectedCategoryId
      ? categoryIds.includes(product.categoryId)
      : true;

    const isPriceInRange =
      product.price >= minPrice && product.price <= maxPrice;

    return isCategoryMatch && isPriceInRange;
  });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("shoppingCart")}
      </h1>
      <div className="mb-6">
        <select
          onChange={handleCategoryFilterChange}
          className="border rounded p-2"
        >
          <option value="">{t("allCategories")}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {t(`${category.name}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4">
          <div>
            <label className="block text-gray-700">
              {t("category.priceRange")}
            </label>
            <input
              type="number"
              name="minPrice"
              value={minPrice}
              onChange={handlePriceFilterChange}
              className="border rounded p-2 w-28"
              placeholder="Min"
            />
          </div>
          <div>
            <label className="block text-gray-700">{t("category.to")}</label>
            <input
              type="number"
              name="maxPrice"
              value={maxPrice}
              onChange={handlePriceFilterChange}
              className="border rounded p-2 w-28"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={`/Eccomerce/images/${product.imageUrl}`}
              alt={product.name}
              className="w-40 h-40 mx-auto object-contain mb-4 rounded-lg shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/Eccomerce/images/default.jpg";
              }}
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
            <Link
              to={`/products/${product.id}`}
              className="block bg-indigo-600 text-white text-center py-2 rounded-lg mt-4 hover:bg-indigo-500"
            >
              {t("shopNow")}
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {t("category.previous")}
        </button>
        <span>
          {t("")} {currentPage} to{t("")} {totalPages}
        </span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          {t("category.next")}
        </button>
      </div>
    </div>
  );
}

export default Products;
