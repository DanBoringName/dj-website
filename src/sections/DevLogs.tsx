type DevLogEntry = {
  date: string;
  body: string;
};

const entries: DevLogEntry[] = [
  {
    date: "2026 — Now",
    body: "Rebuilt the about section, added the tech wheel, blog preview, and a live mini-monitor for the projects panel.",
  },
  {
    date: "2025",
    body: "Discord bot online, linked to Discord with Gemini and GPT via API keys. A few friends have joined as collaborators on the project.",
  },
];

const DevLogs = () => {
  return (
    <div className="flex flex-col h-full gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Dev Logs</p>
        <p className="grid-headtext mt-2">
          Recent changes <span>📝</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {entries.map((entry) => (
          <div
            key={entry.date}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{entry.date}</p>
            <p className="grid-subtext mt-2">{entry.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevLogs;
