import { Ghost, Link2 } from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16H20L8.267 4z" />
    <path d="M4 20l6.768-6.768M15.232 10.768L20 4" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4 cursor-pointer group">
              <Ghost className="w-6 h-6 text-primary transition-colors group-hover:text-secondary" />
              <span className="font-mono text-lg font-bold tracking-wider">
                <span className="text-primary">Ghost</span>
                <span className="text-foreground">Protocol</span>
              </span>
            </a>
            <p className="font-mono text-sm text-muted max-w-sm leading-relaxed">
              AI-powered digital footprint erasure. Disappear on your own terms.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors cursor-pointer"
                aria-label="GitHub"
              >
                <GithubIcon />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors cursor-pointer"
                aria-label="X (Twitter)"
              >
                <XIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#scanner" className="font-mono text-sm text-muted hover:text-primary transition-colors cursor-pointer">
                  Scanner
                </a>
              </li>
              <li>
                <a href="#features" className="font-mono text-sm text-muted hover:text-primary transition-colors cursor-pointer">
                  Features
                </a>
              </li>
              <li>
                <a href="#waitlist" className="font-mono text-sm text-muted hover:text-primary transition-colors cursor-pointer">
                  Waitlist
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-mono text-sm text-muted hover:text-primary transition-colors cursor-pointer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-mono text-sm text-muted hover:text-primary transition-colors cursor-pointer">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="font-mono text-sm text-muted hover:text-primary transition-colors cursor-pointer">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted">
            GhostProtocol is not a law firm. We provide templates and tools, not legal advice.
          </p>
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs text-muted">Privacy-First by Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
