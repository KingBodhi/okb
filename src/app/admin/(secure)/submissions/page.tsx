"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Submission {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  subject?: string;
  message?: string;
  details?: string;
  created_at: string;
}

function SubmissionsContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "contact";

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/submissions?type=${type}`)
      .then((r) => r.json())
      .then((data) => {
        setSubmissions(data.submissions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [type]);

  const getTitle = () => {
    switch (type) {
      case "scheduling":
        return "Scheduling Requests";
      case "press":
        return "Press Inquiries";
      default:
        return "Contact Messages";
    }
  };

  const tabs = [
    { id: "contact", label: "Contact", icon: "✉️" },
    { id: "scheduling", label: "Scheduling", icon: "📅" },
    { id: "press", label: "Press", icon: "📰" },
  ];

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/submissions?type=${type}&id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete submission");
      }

      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selected?.id === id) {
        setSelected(null);
      }
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--admin-accent)] mb-1">Submissions</p>
        <h1 className="text-3xl font-cinzel">{getTitle()}</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)]">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`/admin/submissions?type=${tab.id}`}
            className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              type === tab.id
                ? "border-[var(--admin-accent)] text-[var(--admin-accent)]"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--admin-accent)]"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </a>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 bg-white shadow-lg border-l-4 border-[var(--admin-accent)] max-h-[600px] overflow-y-auto">
          {loading ? (
            <div className="p-6 text-center text-[var(--muted-foreground)]">Loading...</div>
          ) : submissions.length === 0 ? (
            <div className="p-6 text-center text-[var(--muted-foreground)]">No submissions yet</div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {submissions.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelected(sub)}
                  className={`w-full text-left p-4 hover:bg-[var(--admin-muted)] transition-colors ${
                    selected?.id === sub.id ? "bg-[var(--admin-muted)]" : ""
                  }`}
                >
                  <p className="font-semibold truncate">
                    {[sub.first_name, sub.last_name].filter(Boolean).join(" ") || sub.email || "Anonymous"}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] truncate">
                    {sub.subject || sub.message || sub.details || "No message"}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2 bg-white shadow-lg border-l-4 border-[var(--admin-accent)] p-6">
          {selected ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-cinzel">
                    {[selected.first_name, selected.last_name].filter(Boolean).join(" ") || "Anonymous"}
                  </h2>
                  <p className="text-[var(--muted-foreground)]">{selected.email}</p>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {new Date(selected.created_at).toLocaleString()}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {selected.phone && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Phone</p>
                    <p>{selected.phone}</p>
                  </div>
                )}
                {selected.organization && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Organization</p>
                    <p>{selected.organization}</p>
                  </div>
                )}
              </div>

              {selected.subject && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Subject</p>
                  <p className="font-medium">{selected.subject}</p>
                </div>
              )}

              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Message</p>
                <div className="p-4 bg-[var(--admin-muted)] rounded whitespace-pre-wrap">
                  {selected.message || selected.details || "No message content"}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                <button
                  onClick={() => handleDelete(selected.id)}
                  disabled={deleting}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
                {selected.email && (
                  <a
                    href={`mailto:${selected.email}`}
                    className="btn-primary"
                  >
                    Reply via Email
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-[var(--muted-foreground)]">
              Select a submission to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SubmissionsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <SubmissionsContent />
    </Suspense>
  );
}
