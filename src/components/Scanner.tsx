"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, CheckCircle, ExternalLink, Loader2, Database } from "lucide-react";

interface ScanResult {
  breaches: number;
  riskLevel: "low" | "medium" | "high";
  sources: string[];
  warning: string | null;
  dorkLinks: { label: string; url: string }[];
}

export default function Scanner() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateDorkLinks = (searchName: string, searchEmail: string) => [
    {
      label: "Exact email exposure",
      url: `https://www.google.com/search?q="%22${encodeURIComponent(searchEmail)}%22`,
    },
    {
      label: "Name + email combo",
      url: `https://www.google.com/search?q="%22${encodeURIComponent(searchName)}%22+"%22${encodeURIComponent(searchEmail)}%22`,
    },
    {
      label: "Phone number lookup",
      url: `https://www.google.com/search?q="%22${encodeURIComponent(searchName)}%22+phone`,
    },
    {
      label: "Address search",
      url: `https://www.google.com/search?q="%22${encodeURIComponent(searchName)}%22+address`,
    },
    {
      label: "Social media profiles",
      url: `https://www.google.com/search?q="%22${encodeURIComponent(searchName)}%22+site:linkedin.com+OR+site:facebook.com+OR+site:twitter.com`,
    },
    {
      label: "Data broker sites",
      url: `https://www.google.com/search?q="%22${encodeURIComponent(searchName)}%22+site:spokeo.com+OR+site:whitepages.com+OR+site:beenverified.com`,
    },
  ];

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!name.trim() || !email.trim()) {
      setError("Please enter both name and email");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Scan failed");
      }

      const breaches = data.breaches || 0;
      const riskLevel = breaches === 0 ? "low" : breaches <= 3 ? "medium" : "high";

      setResult({
        breaches,
        riskLevel,
        sources: data.sources || [],
        warning: data.warning || null,
        dorkLinks: generateDorkLinks(name, email),
      });
    } catch {
      setResult({
        breaches: 0,
        riskLevel: "low",
        sources: [],
        warning: "Scan service unavailable. Use Google Dork links below.",
        dorkLinks: generateDorkLinks(name, email),
      });
    } finally {
      setLoading(false);
    }
  };

  const riskColors = {
    low: "text-primary",
    medium: "text-yellow-400",
    high: "text-accent",
  };

  const riskLabels = {
    low: "Low Exposure",
    medium: "Moderate Exposure",
    high: "High Exposure",
  };

  return (
    <section id="scanner" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs text-primary tracking-wider">{"// "}FREE EXPOSURE SCAN</span>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold mt-4 mb-4">
            How <span className="text-primary">exposed</span> are you?
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Enter your details to check breach databases and generate Google Dork links to find your public data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-border bg-card p-6 sm:p-8"
        >
          <form onSubmit={handleScan} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-mono text-xs text-muted mb-2">
                  FULL NAME
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-background border border-border font-mono text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-mono text-xs text-muted mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-background border border-border font-mono text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-accent font-mono text-sm">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 bg-primary text-background font-mono font-semibold hover:bg-secondary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Run Exposure Scan
                </>
              )}
            </button>
          </form>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                {result.riskLevel === "low" ? (
                  <CheckCircle className={`w-6 h-6 ${riskColors[result.riskLevel]}`} />
                ) : (
                  <AlertTriangle className={`w-6 h-6 ${riskColors[result.riskLevel]}`} />
                )}
                <div>
                  <span className={`font-mono text-lg font-bold ${riskColors[result.riskLevel]}`}>
                    {riskLabels[result.riskLevel]}
                  </span>
                  <p className="font-mono text-sm text-muted">
                    Your email appears in {result.breaches} known breach{result.breaches !== 1 ? "es" : ""}
                  </p>
                </div>
              </div>

              {result.sources.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-mono text-sm text-primary mb-3">{"// "}BREACH SOURCES</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.sources.map((source, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 bg-accent/10 border border-accent/30 text-accent font-mono text-xs"
                      >
                        <Database className="w-3 h-3" />
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.warning && (
                <div className="mb-6 flex items-center gap-2 px-4 py-3 bg-yellow-400/5 border border-yellow-400/30 font-mono text-sm text-yellow-400">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {result.warning}
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-mono text-sm text-primary">{"// "}GOOGLE DORK LINKS</h3>
                <p className="font-mono text-xs text-muted mb-4">
                  Click these links to see what personal data is publicly searchable:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.dorkLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 bg-background border border-border hover:border-primary/50 transition-colors group cursor-pointer"
                    >
                      <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors truncate mr-2">
                        {link.label}
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary transition-colors flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 border border-primary/30 bg-primary/5">
                <p className="font-mono text-sm text-primary">
                  Want to automatically remove this data? Join our waitlist for AI-powered deletion requests.
                </p>
                <a
                  href="#waitlist"
                  className="inline-block mt-3 px-6 py-2 bg-primary text-background font-mono text-sm font-semibold hover:bg-secondary transition-colors cursor-pointer"
                >
                  Join Waitlist
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
