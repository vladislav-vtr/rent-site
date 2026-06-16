import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
 
import Header from "./components/ui/Header";
import AuthModal from "./components/ui/AuthModal";
import HomePage from "./pages/HomePage";
import HowItWorksPage from "./pages/HowItWorksPage";
 
/**
 * При переходе между страницами прокручиваем в начало,
 * но ТОЛЬКО если в URL нет якоря (#catalog, #faq и т.д.).
 * Это позволяет корректно работать переходу "с /how-it-works на /#catalog".
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, hash]);
  return null;
}
 
export default function App() {
  const [showAuth, setShowAuth] = useState(false);
 
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-neutral-900">
        <Header setShowAuth={setShowAuth} />
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          {/* Fallback — на главную */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}