import React from "react";
import { useLanguage } from "../../context/LanguageContext";

function Login({ credentials, setCredentials, handleLogin, setShowLogin }) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">{t("login")}</h2>
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
  );
}

export default Login;
