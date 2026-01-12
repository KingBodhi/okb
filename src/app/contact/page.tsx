"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [contactError, setContactError] = useState<string>("");

  const [schedulingForm, setSchedulingForm] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    website: "",
    eventDescription: "",
    eventDate: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    postcode: "",
    city: "",
    mediaPresent: "",
    audience: "",
    hostEmail: "",
    hostPhone: "",
  });

  const [schedulingStatus, setSchedulingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [schedulingError, setSchedulingError] = useState<string>("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError("");
    setContactStatus("loading");
    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: contactForm.firstName,
          lastName: contactForm.lastName,
          email: contactForm.email,
          subject: contactForm.subject,
          message: contactForm.message,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to submit form");
      }

      setContactStatus("success");
      setContactForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch (error) {
      setContactStatus("error");
      setContactError((error as Error).message);
    }
  };

  const handleSchedulingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSchedulingError("");
    setSchedulingStatus("loading");
    try {
      const response = await fetch("/api/forms/scheduling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: schedulingForm.firstName,
          lastName: schedulingForm.lastName,
          organization: schedulingForm.organization,
          website: schedulingForm.website,
          eventDescription: schedulingForm.eventDescription,
          eventDate: schedulingForm.eventDate,
          country: schedulingForm.country,
          addressLine1: schedulingForm.addressLine1,
          addressLine2: schedulingForm.addressLine2,
          postcode: schedulingForm.postcode,
          city: schedulingForm.city,
          mediaPresent: schedulingForm.mediaPresent,
          audience: schedulingForm.audience,
          hostEmail: schedulingForm.hostEmail,
          hostPhone: schedulingForm.hostPhone,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to submit scheduling request");
      }

      setSchedulingStatus("success");
      setSchedulingForm({
        firstName: "",
        lastName: "",
        organization: "",
        website: "",
        eventDescription: "",
        eventDate: "",
        country: "",
        addressLine1: "",
        addressLine2: "",
        postcode: "",
        city: "",
        mediaPresent: "",
        audience: "",
        hostEmail: "",
        hostPhone: "",
      });
    } catch (error) {
      setSchedulingStatus("error");
      setSchedulingError((error as Error).message);
    }
  };

  return (
    <>
      {/* ============================================
          HERO SECTION - Black/Gold
          ============================================ */}
      <section className="relative py-32 px-6 bg-[var(--dark-bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-cinzel text-white text-4xl md:text-5xl tracking-[0.1em] uppercase mb-6">
            Contact
          </h1>
          <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8" />
          <p className="text-gray-400 text-lg">
            Get in touch with the Office
          </p>
        </div>
      </section>

      {/* ============================================
          CONTACT FORM - White/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div>
              <h2 className="font-cinzel text-2xl tracking-[0.15em] uppercase mb-4">
                General Inquiries
              </h2>
              <div className="heading-divider-left" />

              <p className="text-[var(--muted-foreground)] mb-6 leading-relaxed">
                Thank you for your interest in working with The Office of the Oklahoma
                Billionaire. Jessy Artman is working diligently to build an Inclusive Global
                Economy. We invite you to participate in this initiative however you may.
              </p>

              <p className="text-[var(--muted-foreground)] mb-6 leading-relaxed">
                To share your thoughts or ideas with The Office, please complete the adjacent
                form. To ensure that your requests and comments are received in a timely
                manner, it is strongly encouraged that you submit all correspondence online.
              </p>

              <p className="text-sm font-medium mb-8">Thank you for your understanding.</p>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-1">Email</p>
                  <Link
                    href="mailto:theoffice@oklahomabillionaire.com"
                    className="text-[var(--foreground)] hover:text-[var(--gold)] transition-colors"
                  >
                    theoffice@oklahomabillionaire.com
                  </Link>
                </div>
                <div>
                  <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-1">Phone</p>
                  <p className="text-[var(--foreground)]">(580) 762-5555</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--gold)] tracking-wider uppercase mb-1">Location</p>
                  <p className="text-[var(--foreground)]">Ponca City, Oklahoma</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[var(--border)]">
                <p className="text-sm text-[var(--muted-foreground)]">
                  <strong>For press and media inquiries</strong>, please use the{" "}
                  <Link href="/press" className="text-[var(--gold)] hover:underline">
                    Press Form
                  </Link>.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                {contactStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 p-4 text-center">
                    <p className="text-sm text-green-700">Thank you! Your message has been delivered.</p>
                  </div>
                )}
                {contactStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 p-4 text-center">
                    <p className="text-sm text-red-600">{contactError || "Something went wrong."}</p>
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
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
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
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Email <span className="text-[var(--gold)]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-2"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Subject <span className="text-[var(--gold)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-2"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Message <span className="text-[var(--gold)]">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="mt-2"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" disabled={contactStatus === "loading"}>
                  {contactStatus === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SCHEDULING REQUESTS - Black/Gold
          ============================================ */}
      <section className="py-20 px-6 bg-[var(--dark-bg)] dark-section">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-white text-2xl md:text-3xl tracking-[0.15em] uppercase mb-4">
              Scheduling Requests
            </h2>
            <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto mb-8" />

            <p className="text-gray-400 mb-4 leading-relaxed">
              Thank you for your interest in inviting Jessy Artman to participate in your upcoming experience.
              In an effort to ensure that your invitation is received in a timely manner, it is strongly
              recommended that you submit your request using the form below.
            </p>

            <p className="text-gray-500 text-sm mb-4">
              Due to the volume of invitations received, we will not provide updates.
            </p>

            <p className="text-sm text-[var(--gold-light)]">Thank you for your understanding.</p>
          </div>

          <form onSubmit={handleSchedulingSubmit} className="space-y-6">
            {schedulingStatus === "success" && (
              <div className="bg-green-900/30 border border-green-700 p-4 text-center">
                <p className="text-sm text-green-400">Request submitted. The team will review it shortly.</p>
              </div>
            )}
            {schedulingStatus === "error" && (
              <div className="bg-red-900/30 border border-red-700 p-4 text-center">
                <p className="text-sm text-red-400">{schedulingError || "Unable to submit request."}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">
                  First Name <span className="text-[var(--gold-light)]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="mt-2"
                  value={schedulingForm.firstName}
                  onChange={(e) => setSchedulingForm({ ...schedulingForm, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white">
                  Last Name <span className="text-[var(--gold-light)]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="mt-2"
                  value={schedulingForm.lastName}
                  onChange={(e) => setSchedulingForm({ ...schedulingForm, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                Organization Name <span className="text-[var(--gold-light)]">*</span>
              </label>
              <input
                type="text"
                required
                className="mt-2"
                value={schedulingForm.organization}
                onChange={(e) => setSchedulingForm({ ...schedulingForm, organization: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                Organization Website <span className="text-[var(--gold-light)]">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://"
                className="mt-2"
                value={schedulingForm.website}
                onChange={(e) => setSchedulingForm({ ...schedulingForm, website: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                Event Description <span className="text-[var(--gold-light)]">*</span>
              </label>
              <textarea
                required
                rows={4}
                className="mt-2"
                value={schedulingForm.eventDescription}
                onChange={(e) => setSchedulingForm({ ...schedulingForm, eventDescription: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                Date of Event <span className="text-[var(--gold-light)]">*</span>
              </label>
              <input
                type="date"
                required
                className="mt-2"
                value={schedulingForm.eventDate}
                onChange={(e) => setSchedulingForm({ ...schedulingForm, eventDate: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                Location of Event <span className="text-[var(--gold-light)]">*</span>
              </label>
              <div className="mt-2 space-y-4">
                <div>
                  <label className="text-xs text-gray-400">Country</label>
                  <select
                    required
                    value={schedulingForm.country}
                    onChange={(e) => setSchedulingForm({ ...schedulingForm, country: e.target.value })}
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="NL">Netherlands</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400">Address Line 1</label>
                  <input
                    type="text"
                    required
                    value={schedulingForm.addressLine1}
                    onChange={(e) => setSchedulingForm({ ...schedulingForm, addressLine1: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Address Line 2</label>
                  <input
                    type="text"
                    value={schedulingForm.addressLine2}
                    onChange={(e) => setSchedulingForm({ ...schedulingForm, addressLine2: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400">Postcode</label>
                    <input
                      type="text"
                      required
                      value={schedulingForm.postcode}
                      onChange={(e) => setSchedulingForm({ ...schedulingForm, postcode: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">City</label>
                    <input
                      type="text"
                      required
                      value={schedulingForm.city}
                      onChange={(e) => setSchedulingForm({ ...schedulingForm, city: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white">Will Media Be Present?</label>
              <div className="mt-3 flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mediaPresent"
                    value="Yes"
                    checked={schedulingForm.mediaPresent === "Yes"}
                    onChange={(e) => setSchedulingForm({ ...schedulingForm, mediaPresent: e.target.value })}
                    className="w-auto accent-[var(--gold)]"
                  />
                  <span className="text-sm text-gray-300">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mediaPresent"
                    value="No"
                    checked={schedulingForm.mediaPresent === "No"}
                    onChange={(e) => setSchedulingForm({ ...schedulingForm, mediaPresent: e.target.value })}
                    className="w-auto accent-[var(--gold)]"
                  />
                  <span className="text-sm text-gray-300">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white">Audience and Notable Mentions</label>
              <p className="text-xs text-gray-500 mb-2">Notable invitees and estimated attendance</p>
              <textarea
                rows={3}
                value={schedulingForm.audience}
                onChange={(e) => setSchedulingForm({ ...schedulingForm, audience: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                Host Contact Email <span className="text-[var(--gold-light)]">*</span>
              </label>
              <input
                type="email"
                required
                className="mt-2"
                value={schedulingForm.hostEmail}
                onChange={(e) => setSchedulingForm({ ...schedulingForm, hostEmail: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">Host Contact Phone</label>
              <input
                type="tel"
                className="mt-2"
                value={schedulingForm.hostPhone}
                onChange={(e) => setSchedulingForm({ ...schedulingForm, hostPhone: e.target.value })}
              />
            </div>

            <div className="text-center pt-6">
              <button type="submit" className="btn-primary" disabled={schedulingStatus === "loading"}>
                {schedulingStatus === "loading" ? "Sending..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
