"use client";

import { useState } from "react";
import { Trash2, Loader2, Mail, MailOpen } from "lucide-react";

interface MessageRow {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function MessagesTable({ initialMessages }: { initialMessages: MessageRow[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [busyId, setBusyId] = useState<string | null>(null);

  const toggleRead = async (id: string, read: boolean) => {
    setBusyId(id);
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    });
    if (res.ok) {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: !read } : m)));
    }
    setBusyId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message? This can't be undone.")) return;
    setBusyId(id);
    const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
    setBusyId(null);
  };

  if (messages.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-surface px-6 py-16 text-center text-sm text-muted">
        No messages yet.
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`rounded-2xl border p-4 ${
            m.read ? "border-border bg-background-elevated" : "border-accent/40 bg-accent-soft/40"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-foreground">{m.name}</p>
              <a href={`mailto:${m.email}`} className="text-xs text-muted-foreground hover:text-accent">
                {m.email}
              </a>
              <p className="mt-2 text-sm text-muted">{m.message}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(m.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={() => toggleRead(m.id, m.read)}
                disabled={busyId === m.id}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={m.read ? "Mark unread" : "Mark read"}
              >
                {m.read ? <MailOpen className="size-4" /> : <Mail className="size-4" />}
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                disabled={busyId === m.id}
                className="text-muted-foreground transition-colors hover:text-destructive"
                aria-label="Delete"
              >
                {busyId === m.id ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
