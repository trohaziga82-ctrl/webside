"use client";

import { useState, useEffect } from "react";
import Container from "./Container";
import Logo from "./Logo";
import { useCart, Product } from "./CartContext";
import { useUser } from "./UserContext";
import Image from "next/image";

type TimedProduct = Product & { expireAt: number };

const Header = () => {
  const { cart, removeFromCart } = useCart();
  const { user, setUser } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [timedCart, setTimedCart] = useState<TimedProduct[]>([]);

  // Za modal Login/Register
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const now = Date.now();
    const updatedCart: TimedProduct[] = cart.map((item) => {
      const exist = timedCart.find((p) => p.id === item.id && p.name === item.name);
      return exist ? exist : { ...item, expireAt: now + 10 * 60 * 1000 }; // 10 min
    });
    setTimedCart(updatedCart);
  }, [cart]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      timedCart.forEach((item) => {
        if (item.expireAt <= now) removeFromCart(item.id);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timedCart, removeFromCart]);

  const handleRemove = (id: number) => removeFromCart(id);
  const totalPrice = timedCart.reduce((sum, item) => sum + item.price, 0);
  const handleLogout = () => setUser(null);

  // Funkcija za Login
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) alert(data.error);
      else {
        setUser({ email: data.email, role: data.role });
        setShowLogin(false);
        resetForm();
      }
    } catch (err) {
      alert("Napaka pri prijavi");
    }
  };

  // Funkcija za Register
  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) alert(data.error);
      else {
        setUser({ email: data.email, role: data.role });
        setShowRegister(false);
        resetForm();
      }
    } catch (err) {
      alert("Napaka pri registraciji");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <header className="bg-white border-b relative z-50">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Logo />

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            {/* KOŠARICA */}
            <div className="relative">
              <button className="relative text-xl" onClick={() => setCartOpen(!cartOpen)}>
                🛒
                {timedCart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] px-1.5 rounded-full font-bold">
                    {timedCart.length}
                  </span>
                )}
              </button>

              {cartOpen && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white border p-4 rounded shadow-xl z-50">
                  <h3 className="font-semibold mb-3 border-b pb-2">Košarica</h3>
                  {timedCart.length === 0 ? (
                    <p className="text-sm text-gray-500 py-4">Košarica je prazna.</p>
                  ) : (
                    <div className="flex flex-col space-y-3 max-h-80 overflow-y-auto">
                      {timedCart.map((item) => {
                        const remaining = Math.max(0, Math.ceil((item.expireAt - Date.now()) / 1000));
                        const minutes = Math.floor(remaining / 60);
                        const seconds = remaining % 60;
                        return (
                          <div key={item.id} className="flex items-center justify-between gap-3 border-b pb-3 last:border-none">
                            <div className="flex items-center gap-3">
                              <Image src={item.image} alt={item.name} width={45} height={45} className="rounded object-cover" />
                              <div>
                                <p className="text-sm font-semibold">{item.name}</p>
                                <p className="text-xs text-gray-600">{item.price.toFixed(2)} €</p>
                                <p className="text-[10px] text-orange-500 font-medium">
                                  Poteče čez: {minutes}:{seconds.toString().padStart(2, "0")}
                                </p>
                              </div>
                            </div>
                            <button className="text-red-500 text-xs hover:bg-red-50 p-1 rounded" onClick={() => handleRemove(item.id)}>
                              Odstrani
                            </button>
                          </div>
                        );
                      })}
                      <div className="border-t pt-3 mt-2 flex justify-between items-center">
                        <span className="font-bold">Skupaj:</span>
                        <span className="font-bold text-lg">{totalPrice.toFixed(2)} €</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            
            {!user ? (
              <div className="flex items-center gap-4">
                <button className="text-sm font-semibold hover:text-blue-600" onClick={() => setShowLogin(true)}>Login</button>
                <button className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800" onClick={() => setShowRegister(true)}>Register</button>
              </div>
            ) : (
              <div className="relative group">
                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold border-2 border-transparent group-hover:border-blue-200 transition-all">
                  {user?.email ? user.email[0].toUpperCase() : "?"}
                </button>
                {/* Logout meni na hover */}
                <div className="absolute right-0 mt-0 pt-2 w-48 hidden group-hover:block">
                  <div className="bg-white border rounded shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="text-xs text-gray-500">Prijavljen kot:</p>
                      <p className="text-sm font-medium truncate">{user?.email}</p>
                    </div>
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors" onClick={handleLogout}>
                      Odjava
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          
          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        
        {menuOpen && (
          <div className="md:hidden py-4 border-t flex flex-col gap-4 bg-gray-50 px-2 rounded-b">
            <button className="flex items-center justify-between text-sm font-medium" onClick={() => setCartOpen(!cartOpen)}>
              <span>🛒 Košarica ({timedCart.length})</span>
            </button>
            {!user ? (
              <>
                <button className="text-left py-2 border-b" onClick={() => setShowLogin(true)}>Login</button>
                <button className="text-left py-2" onClick={() => setShowRegister(true)}>Register</button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-500">{user?.email}</p>
                <button className="text-left text-red-600 font-medium" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </Container>

      
      {(showLogin || showRegister) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">{showLogin ? "Prijava" : "Registracija"}</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Email naslov</label>
                <input type="email" placeholder="ime@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Geslo</label>
                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <button 
              className={`w-full mt-6 p-3 rounded-lg font-bold text-white transition-colors ${showLogin ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}`} 
              onClick={showLogin ? handleLogin : handleRegister}
            >
              {showLogin ? "Vpis" : "Ustvari račun"}
            </button>
            <button className="mt-3 w-full p-3 text-gray-500 text-sm hover:underline" onClick={() => { setShowLogin(false); setShowRegister(false); }}>
              Prekliči
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
