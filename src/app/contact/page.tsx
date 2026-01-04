"use client";

import { useState } from "react";

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    alert("Thank you for your message. We will respond shortly.");
  };

  const handleSchedulingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Scheduling form submitted:", schedulingForm);
    alert("Thank you for your scheduling request. We will review and respond.");
  };

  return (
    <>
      {/* Header Spacer */}
      <div className="h-32" />

      {/* Contact Section */}
      <section className="py-12 px-6 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <div>
              <h1 className="text-4xl md:text-5xl text-[#3949AB] mb-8 font-cinzel">
                CONTACT
              </h1>

              <p className="text-sm mb-4">
                <strong>For press and media inquiries, use Press Form.</strong>
              </p>

              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Thank you for your interest in working with The Office of the Oklahoma
                Billionaire. Jessy Artman is working diligently to build an Inclusive Global
                Economy. We invite you to participate in this initiative however you may. To
                share your thought or ideas with The Office please complete the adjacent
                form. To ensure that your requests and comments are received in a timely
                manner, it is strongly encouraged that you submit all correspondence online.
              </p>

              <p className="text-sm mb-6">Thank you for your understanding.</p>

              <div className="text-sm">
                <a
                  href="mailto:theoffice@oklahomabillionaire.com"
                  className="text-[#3949AB] hover:underline block mb-1"
                >
                  theoffice@oklahomabillionaire.com
                </a>
                <p>(580) 762-5555</p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">
                    Name <span className="text-gray-400">(required)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="text-xs text-gray-500">First Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.firstName}
                        onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Last Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.lastName}
                        onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Email <span className="text-gray-400">(required)</span>
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
                    Subject <span className="text-gray-400">(required)</span>
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
                    Message <span className="text-gray-400">(required)</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="mt-2"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Scheduling Requests Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-[#3949AB] mb-8 font-cinzel">
            Scheduling Requests
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Thank you for your interest in inviting Jessy Artman to participate in your upcoming experience.
            In an effort to ensure that your invitation is received in a timely manner, it is strongly
            recommended that you submit your request using the form below.
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Due to the volume of invitations Jessy Artman receives, we will not provide updates.
          </p>

          <p className="text-sm font-medium mb-12">Thank you for your understanding.</p>

          <form onSubmit={handleSchedulingSubmit} className="text-left space-y-6">
            <div>
              <label className="text-sm font-medium">
                Your Name <span className="text-gray-400">(required)</span>
              </label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="text-xs text-gray-500">First Name</label>
                  <input
                    type="text"
                    required
                    value={schedulingForm.firstName}
                    onChange={(e) => setSchedulingForm({ ...schedulingForm, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Last Name</label>
                  <input
                    type="text"
                    required
                    value={schedulingForm.lastName}
                    onChange={(e) => setSchedulingForm({ ...schedulingForm, lastName: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Name of Organization <span className="text-gray-400">(required)</span>
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
              <label className="text-sm font-medium">
                Organization Website <span className="text-gray-400">(required)</span>
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
              <label className="text-sm font-medium">
                Event Description <span className="text-gray-400">(required)</span>
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
              <label className="text-sm font-medium">
                Date of Event <span className="text-gray-400">(required)</span>
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
              <label className="text-sm font-medium">
                Location of Event <span className="text-gray-400">(required)</span>
              </label>
              <div className="mt-2 space-y-4">
                <div>
                  <label className="text-xs text-gray-500">Country</label>
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
                  <label className="text-xs text-gray-500">Address Line 1</label>
                  <input
                    type="text"
                    required
                    value={schedulingForm.addressLine1}
                    onChange={(e) => setSchedulingForm({ ...schedulingForm, addressLine1: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Address Line 2</label>
                  <input
                    type="text"
                    value={schedulingForm.addressLine2}
                    onChange={(e) => setSchedulingForm({ ...schedulingForm, addressLine2: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Postcode</label>
                    <input
                      type="text"
                      required
                      value={schedulingForm.postcode}
                      onChange={(e) => setSchedulingForm({ ...schedulingForm, postcode: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">City</label>
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
              <label className="text-sm font-medium">Will Media Be Present</label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mediaPresent"
                    value="Yes"
                    checked={schedulingForm.mediaPresent === "Yes"}
                    onChange={(e) => setSchedulingForm({ ...schedulingForm, mediaPresent: e.target.value })}
                    className="w-auto"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mediaPresent"
                    value="No"
                    checked={schedulingForm.mediaPresent === "No"}
                    onChange={(e) => setSchedulingForm({ ...schedulingForm, mediaPresent: e.target.value })}
                    className="w-auto"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Audience and Notable Mentions</label>
              <p className="text-xs text-gray-500 mb-2">Notable Invitees and Estimated Attendance</p>
              <textarea
                rows={3}
                value={schedulingForm.audience}
                onChange={(e) => setSchedulingForm({ ...schedulingForm, audience: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Host Contact Email <span className="text-gray-400">(required)</span>
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
              <label className="text-sm font-medium">Host Contact Phone</label>
              <input
                type="tel"
                className="mt-2"
                value={schedulingForm.hostPhone}
                onChange={(e) => setSchedulingForm({ ...schedulingForm, hostPhone: e.target.value })}
              />
            </div>

            <div className="text-center pt-4">
              <button type="submit" className="btn-primary">
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
