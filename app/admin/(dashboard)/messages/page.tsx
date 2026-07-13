import { prisma } from "@/lib/db";
import { MessagesTable } from "@/components/admin/messages-table";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Messages</h1>
      <p className="mt-1 text-sm text-muted">
        {messages.length} message{messages.length === 1 ? "" : "s"}
        {unreadCount > 0 && ` · ${unreadCount} unread`}
      </p>

      <MessagesTable
        initialMessages={messages.map((m) => ({
          ...m,
          createdAt: m.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
