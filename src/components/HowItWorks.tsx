"use client";

import { motion } from "framer-motion";
import { Search, FileText, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Scan Your Exposure",
    description: "Enter your name and email. We check breach databases and generate Google Dork links to find your public data.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Generate Legal Requests",
    description: "AI creates personalized GDPR, CCPA, or KVKK deletion requests based on your jurisdiction and target brokers.",
  },
  {
    icon: Send,
    step: "03",
    title: "Submit & Track",
    description: "Send requests directly to data brokers. Track the status of each request in your dashboard.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Verify Removal",
    description: "Re-scan to confirm your data is gone. Get alerts if it reappears. Stay ghost.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-wider">{"// "}HOW IT WORKS</span>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold mt-4 mb-4">
            Four steps to <span className="text-primary">digital invisibility</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border z-0" />
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-primary/50">{step.step}</span>
                  <div className="w-10 h-10 flex items-center justify-center border border-primary/30 bg-primary/5">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <h3 className="font-mono text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="font-mono text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
