"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Eye, Lock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-primary/30 rounded-full bg-primary/5"
        >
          <Shield className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs text-primary tracking-wider">PHASE 1: VALIDATION MVP</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">Disappear on</span>
          <br />
          <span className="text-primary glow-text animate-pulse-glow">your own terms.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-muted mb-12 leading-relaxed"
        >
          AI-powered digital footprint erasure. Scan your exposure, generate legal deletion requests,
          and take back control of your personal data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#scanner"
            className="group flex items-center gap-2 px-8 py-4 bg-primary text-background font-mono font-semibold hover:bg-secondary transition-colors duration-200 cursor-pointer"
          >
            Scan Your Exposure
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#waitlist"
            className="flex items-center gap-2 px-8 py-4 border border-border text-foreground font-mono hover:border-primary hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            Join Waitlist
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-center gap-2">
            <Eye className="w-6 h-6 text-primary" />
            <span className="font-mono text-2xl font-bold text-foreground">2,847+</span>
            <span className="font-mono text-xs text-muted">Data Brokers Tracked</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Lock className="w-6 h-6 text-primary" />
            <span className="font-mono text-2xl font-bold text-foreground">GDPR/CCPA</span>
            <span className="font-mono text-xs text-muted">Legal Frameworks</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-mono text-2xl font-bold text-foreground">100%</span>
            <span className="font-mono text-xs text-muted">Privacy-First</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
