"use client";

import { useState } from "react";

export default function Press() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    details: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Press form submitted:", form);
    alert("Thank you for your press inquiry. We will review and respond.");
  };

  return (
    <>
      {/* Header Spacer */}
      <div className="h-32" />

      {/* Press Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image */}
            <div
              className="aspect-[3/4] bg-cover bg-center"
              style={{ backgroundImage: "url('/images/press-photo.jpg')" }}
            />

            {/* Right Column - Form */}
            <div>
              <h1 className="text-4xl md:text-5xl text-[#3949AB] mb-12 font-cinzel">
                Press & Media
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Last Name</label>
                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Organization Name <span className="text-gray-400">(required)</span>
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
                    Details of Request <span className="text-gray-400">(required)</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="mt-2"
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Email <span className="text-gray-400">(required)</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-2"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
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
    </>
  );
}
