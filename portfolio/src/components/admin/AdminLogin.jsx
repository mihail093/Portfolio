import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SimpleAlert, Modal } from "../ui";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, showLoginModal, closeLoginModal } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validazione di base
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        // se successo chiude il Modal, naviga alla pagina dashboard e resetta il form
        closeLoginModal();
        navigate("/admin/dashboard");
        setEmail("");
        setPassword("");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Error during login");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset del form quando chiudi il modal
    setEmail("");
    setPassword("");
    setError("");
    closeLoginModal();
  };

  return (
    <Modal isOpen={showLoginModal} onClose={handleClose} title="Private Area" type="warning">
      <div className="p-6">
        <div className="min-h-[40px]">
          {error ? (
            <SimpleAlert message={error} type="error" duration={0} />
          ) : loading ? (
            <div className="flex justify-start items-center h-10">
              <div className="w-5 h-5 rounded-full border-b-2 border-white animate-spin"/>
            </div>
            ) : (
            <SimpleAlert message={"This area is restricted to the administrator"} type="info" duration={0} />
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-montserrat text-white mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-black rounded-md 
                focus:outline-none focus:ring-1 focus:ring-orange-600 focus:border-orange-400 focus:z-10 sm:text-sm"
              placeholder="write your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-montserrat text-white mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-black rounded-md 
                focus:outline-none focus:ring-1 focus:ring-orange-600 focus:border-orange-400 focus:z-10 sm:text-sm"
              placeholder="write your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-montserrat rounded-md text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2c4254] hover:bg-[#017a9b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#017a9b]"
            }`}
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>
      </div>
    </Modal>
  );
}