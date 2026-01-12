"use client";

import { useState } from "react";
import Link from "next/link";

export default function Press() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    details: "",
    email: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/forms/press", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          organization: form.organization,
          details: form.details,
          email: form.email,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to submit press request");
      }

      setStatus("success");
      setForm({ firstName: "", lastName: "", organization: "", details: "", email: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage((error as Error).message);
    }
  };

  const speakingTopics = [
    "Building Ventures That Matter",
    "The Future of Decentralized Infrastructure",
    "Art, Innovation, and Human Flourishing",
    "Oklahoma's Role in the New Economy",
    "From Vision to Venture: A Builder's Journey",
  ];

  return (
    <>
      {/* ============================================
          HERO SECTION - Black/Gold
          ============================================ */}
      <section className="relative py-32 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-cinzel text-white text-4xl md:text-5xl tracking-[0.1em] uppercase mb-6">
            Press
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8" />
          <p className="text-gray-400 text-lg">
            Media Resources & Inquiries
          </p>
        </div>
      </section>

      {/* ============================================
          PRESS KIT - White/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Photo */}
            <div>
              <div
                className="aspect-[3/4] bg-cover bg-center mb-6"
                style={{ backgroundImage: "url('/images/press-photo.jpg')" }}
              />
              <p className="text-xs text-[var(--muted-foreground)] text-center">
                Official Press Photo
              </p>
            </div>

            {/* Right Column - Bio & Info */}
            <div>
              <h2 className="font-cinzel text-2xl tracking-[0.15em] uppercase mb-4">
                Official Bio
              </h2>
              <div className="heading-divider-left" />

              <div className="space-y-4 text-[var(--muted-foreground)] leading-relaxed mb-10">
                <p>
                  <strong className="text-[var(--foreground)]">Jessy Artman</strong> is a visionary entrepreneur
                  and founder of the Office of the Oklahoma Billionaire, an organization dedicated to
                  facilitating Global Economic Abundance through technology, innovation, and the arts.
                </p>
                <p>
                  He is the founder of PowerClub Global, Alpha Protocol,
                  and Omega Wireless, among other ventures currently in development.
                  Based in Oklahoma, Artman champions the bold to achieve the extraordinary.
                </p>
                <p>
                  Through civic engagement and public activism, he works to inform, educate,
                  and inspire individuals from all walks of life. Artman remains a tireless
                  champion for the underprivileged — for their right to live sovereign, safe,
                  and secure in their life&apos;s purpose.
                </p>
              </div>

              {/* Speaking Topics */}
              <h3 className="font-cinzel text-lg tracking-[0.1em] uppercase mb-4">
                Speaking Topics
              </h3>
              <ul className="space-y-2 mb-10">
                {speakingTopics.map((topic, i) => (
                  <li key={i} className="text-sm text-[var(--muted-foreground)] flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full" />
                    {topic}
                  </li>
                ))}
              </ul>

              {/* Contact */}
              <h3 className="font-cinzel text-lg tracking-[0.1em] uppercase mb-4">
                Media Contact
              </h3>
              <Link
                href="mailto:press@oklahomabillionaire.com"
                className="text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors"
              >
                press@oklahomabillionaire.com
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          VENTURES QUICK LINKS - Black/Gold
          ============================================ */}
      <section className="py-16 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cinzel text-white text-xl tracking-[0.15em] uppercase mb-8 text-center">
            Venture Links
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://powerclubglobal.com"
              target="_blank"
              className="text-sm text-gray-400 hover:text-[var(--gold-light)] transition-colors px-4 py-2 border border-[var(--dark-border)] hover:border-[var(--gold)]"
            >
              PowerClub Global
            </Link>
            <Link
              href="https://alphaprotocol.network"
              target="_blank"
              className="text-sm text-gray-400 hover:text-[var(--gold-light)] transition-colors px-4 py-2 border border-[var(--dark-border)] hover:border-[var(--gold)]"
            >
              Alpha Protocol
            </Link>
            <Link
              href="https://omegawireless.xyz"
              target="_blank"
              className="text-sm text-gray-400 hover:text-[var(--gold-light)] transition-colors px-4 py-2 border border-[var(--dark-border)] hover:border-[var(--gold)]"
            >
              Omega Wireless
            </Link>
            <Link
              href="https://www.emergence-institute.org"
              target="_blank"
              className="text-sm text-gray-400 hover:text-[var(--gold-light)] transition-colors px-4 py-2 border border-[var(--dark-border)] hover:border-[var(--gold)]"
            >
              Emergence Institute
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          PRESS INQUIRY FORM - White/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-2xl tracking-[0.15em] uppercase mb-4">
              Request a Statement
            </h2>
            <div className="heading-divider" />
            <p className="text-[var(--muted-foreground)]">
              For press inquiries, interview requests, or media information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {status === "success" && (
              <div className="bg-green-50 border border-green-200 p-4 text-center">
                <p className="text-sm text-green-700">Request received. We will be in touch.</p>
              </div>
            )}
            {status === "error" && (
              <div className="bg-red-50 border border-red-200 p-4 text-center">
                <p className="text-sm text-red-600">{errorMessage || "Unable to submit request."}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  First Name <span className="text-[var(--gold)]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="mt-2"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Last Name <span className="text-[var(--gold)]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="mt-2"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Organization <span className="text-[var(--gold)]">*</span>
              </label>
              <input
                type="text"
                required
                className="mt-2"
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Email <span className="text-[var(--gold)]">*</span>
              </label>
              <input
                type="email"
                required
                className="mt-2"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Details of Request <span className="text-[var(--gold)]">*</span>
              </label>
              <textarea
                required
                rows={5}
                className="mt-2"
                placeholder="Please describe your press inquiry, interview request, or information needed..."
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
              />
            </div>

            <div className="text-center pt-4">
              <button type="submit" className="btn-primary" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
