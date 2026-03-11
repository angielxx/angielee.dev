import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  clickable?: boolean;
}

export default function TagBadge({ tag, clickable = false }: TagBadgeProps) {
  const className =
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--tag-bg)] text-[var(--tag-text)] border border-brand-200 transition-transform hover:scale-105";

  if (clickable) {
    return (
      <Link href={`/blog?tag=${encodeURIComponent(tag)}`} className={className}>
        {tag}
      </Link>
    );
  }

  return <span className={className}>{tag}</span>;
}
