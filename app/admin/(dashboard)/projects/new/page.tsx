import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">New Project</h1>
      <p className="mt-1 text-sm text-muted">
        Fill in both languages — the live site switches between them automatically.
      </p>
      <ProjectForm mode="create" />
    </div>
  );
}
