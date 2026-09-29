import { PageHeader, Card, Badge, EmptyState } from "@/components/admin/ui-bits";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload, FileSpreadsheet, FileCheck, FileImage } from "lucide-react";

const docs = [
  { name: "Church Constitution.pdf", type: "pdf", size: "1.2 MB", updated: "2026-09-15", category: "Governance" },
  { name: "Q3 Financial Report.xlsx", type: "sheet", size: "340 KB", updated: "2026-09-25", category: "Finance" },
  { name: "Membership Directory.pdf", type: "pdf", size: "880 KB", updated: "2026-09-20", category: "Membership" },
  { name: "Baptism Register.pdf", type: "pdf", size: "420 KB", updated: "2026-09-10", category: "Membership" },
  { name: "Board Minutes - Sept.docx", type: "doc", size: "210 KB", updated: "2026-09-08", category: "Governance" },
  { name: "Event Photos.zip", type: "image", size: "12.4 MB", updated: "2026-09-19", category: "Media" },
];

const ICON = { pdf: FileText, sheet: FileSpreadsheet, doc: FileCheck, image: FileImage };

export default function Documents() {
  return (
    <div>
      <PageHeader
        title="Documents"
        subtitle="Church records, reports, and shared files"
        icon={FileText}
        actions={<Button size="sm"><Upload className="w-4 h-4 mr-1.5" /> Upload</Button>}
      />
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-5 py-3">Document</th>
              <th className="text-left font-medium px-5 py-3 hidden sm:table-cell">Category</th>
              <th className="text-left font-medium px-5 py-3 hidden md:table-cell">Size</th>
              <th className="text-left font-medium px-5 py-3 hidden sm:table-cell">Updated</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => {
              const Icon = ICON[d.type] || FileText;
              return (
                <tr key={d.name} className="border-t border-border hover:bg-muted/30">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Icon className="w-4.5 h-4.5 text-primary" /></div>
                      <span className="font-medium text-foreground">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell"><Badge variant="muted">{d.category}</Badge></td>
                  <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{d.size}</td>
                  <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">{d.updated}</td>
                  <td className="px-5 py-3 text-right"><Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <p className="text-xs text-muted-foreground mt-4">Document storage and uploads are simulated in this prototype.</p>
    </div>
  );
}