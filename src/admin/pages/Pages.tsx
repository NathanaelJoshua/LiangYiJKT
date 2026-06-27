import { Link } from "react-router-dom";
import { FileText, ArrowRight } from "@phosphor-icons/react";
import { useCms } from "../AdminData";
import { Badge, Card, PageHeader } from "../ui";

export default function Pages() {
  const { data } = useCms();
  const pages = data?.pages ?? {};

  return (
    <div>
      <PageHeader title="Page content" desc="Edit the headings and copy for each page of the site." />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(pages).map(([name, fields]) => {
          const previewVal = fields["Headline"] ?? Object.values(fields).find((v) => typeof v === "object");
          const preview = previewVal && typeof previewVal === "object" ? previewVal.en : "";
          return (
            <Link key={name} to={`/admin/pages/${encodeURIComponent(name)}`}>
              <Card className="group h-full transition-colors hover:border-ink/30">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink/5 text-ink">
                    <FileText size={20} />
                  </span>
                  <Badge tone="muted">{Object.keys(fields).length} fields</Badge>
                </div>
                <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-ink">{name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{preview}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep">
                  Edit page <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
