"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }

      setStatus("success");
      setMessage("You're on the list. We'll notify you when AI Auto-Delete is ready.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-primary/30 bg-card p-8 sm:p-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 border border-primary/30 bg-primary/5 mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <span className="font-mono text-xs text-primary tracking-wider">{"// "}EARLY ACCESS</span>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold mt-4 mb-4">
            Get <span className="text-primary">AI Auto-Delete</span> first
          </h2>
          <p className="text-muted max-w-lg mx-auto mb-8">
            Join the waitlist for automated data broker removal. Be among the first to experience
            one-click digital footprint erasure.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 px-4 py-3 bg-background border border-border font-mono text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
              aria-label="Email address for waitlist"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-background font-mono font-semibold hover:bg-secondary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join Waitlist"
              )}
            </button>
          </form>

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center justify-center gap-2 text-primary font-mono text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              {message}
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center justify-center gap-2 text-accent font-mono text-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              {message}
            </motion.div>
          )}

          <p className="font-mono text-xs text-muted/50 mt-6">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
