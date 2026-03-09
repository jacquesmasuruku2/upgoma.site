/**
 * Renders markdown-like text: **bold**, - bullets, ## headings
 */
const RichContent = ({ content, className = "" }: { content: string; className?: string }) => {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];
  let key = 0;

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    elements.push(
      <ul key={key++} className="list-disc list-inside space-y-1 mb-4 text-muted-foreground">
        {bulletBuffer.map((b, i) => (
          <li key={i}>{renderInline(b)}</li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      bulletBuffer.push(trimmed.slice(2));
      continue;
    }

    flushBullets();

    if (trimmed === "") {
      continue;
    }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h3 key={key++} className="text-lg font-bold text-foreground mt-6 mb-2">
          {renderInline(trimmed.slice(3))}
        </h3>
      );
    } else {
      elements.push(
        <p key={key++} className="text-muted-foreground leading-relaxed mb-3">
          {renderInline(trimmed)}
        </p>
      );
    }
  }

  flushBullets();

  return <div className={className}>{elements}</div>;
};

/** Render inline bold markers **text** */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default RichContent;
