export function formatDateTime(
  dateString: string
): string {
  const date = new Date(dateString);

  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const yesterday = new Date(today);
  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const target = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const time = date.toLocaleTimeString(
    [],
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );

  if (
    target.getTime() ===
    today.getTime()
  ) {
    return `Today • ${time}`;
  }

  if (
    target.getTime() ===
    yesterday.getTime()
  ) {
    return `Yesterday • ${time}`;
  }

  return date.toLocaleDateString(
    [],
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  ) + ` • ${time}`;
}