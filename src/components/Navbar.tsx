"use client";

import { useState, useEffect } from "react";
import { Ghost, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 cursor-pointer group">
            <Ghost className="w-8 h-8 text-primary transition-colors group-hover:text-secondary" />
            <span className="font-mono text-lg font-bold tracking-wider">
              <span className="text-primary">Ghost</span>
              <span className="text-foreground">Protocol</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#scanner" className="font-mono text-sm text-muted hover:text-primary transition-colors cursor-pointer">
              Scanner
            </a>
            <a href="#features" className="font-mono text-sm text-muted hover:text-primary transition-colors cursor-pointer">
              Features
            </a>
            <a href="#how-it-works" className="font-mono text-sm text-muted hover:text-primary transition-colors cursor-pointer">
              How It Works
            </a>
            <a
              href="#waitlist"
              className="font-mono text-sm px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-200 cursor-pointer"
            >
              Join Waitlist
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-card border-b border-border"
          >
            <div className="px-4 py-4 space-y-3">
              <a
                href="#scanner"
                onClick={() => setIsOpen(false)}
                className="block font-mono text-sm text-muted hover:text-primary transition-colors py-2 cursor-pointer"
              >
                Scanner
              </a>
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="block font-mono text-sm text-muted hover:text-primary transition-colors py-2 cursor-pointer"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                className="block font-mono text-sm text-muted hover:text-primary transition-colors py-2 cursor-pointer"
              >
                How It Works
              </a>
              <a
                href="#waitlist"
                onClick={() => setIsOpen(false)}
                className="block font-mono text-sm px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-200 text-center cursor-pointer"
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
