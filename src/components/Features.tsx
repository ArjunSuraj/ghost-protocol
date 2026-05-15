"use client";

import { motion } from "framer-motion";
import { Shield, FileText, Bot, Bell, Lock, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Breach Detection",
    description: "Instantly scan your email against known data breaches to see where your information is exposed.",
  },
  {
    icon: FileText,
    title: "AI Legal Requests",
    description: "One-click generation of GDPR, CCPA, and KVKK deletion requests tailored to your jurisdiction.",
  },
  {
    icon: Bot,
    title: "Automated Workflows",
    description: "AI handles the heavy work — finding brokers, filling forms, and submitting opt-out requests.",
  },
  {
    icon: Bell,
    title: "Re-Scan Alerts",
    description: "Get notified if your data reappears after removal. Continuous monitoring keeps you protected.",
  },
  {
    icon: Lock,
    title: "Privacy-First",
    description: "We don't store your sensitive data. All processing is local or ephemeral. Zero data retention.",
  },
  {
    icon: Zap,
    title: "Self-Serve & Fast",
    description: "No humans involved, lower cost, faster execution. Full control over your digital footprint.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-wider">{"// "}CORE FEATURES</span>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold mt-4 mb-4">
            Everything you need to <span className="text-primary">disappear</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            From discovery to deletion, GhostProtocol gives you the tools to erase your digital footprint.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 border border-border bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-primary/30 bg-primary/5 mb-4 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-mono text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="font-mono text-sm text-muted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
