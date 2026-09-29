import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Modal({ open, onClose, title, subtitle, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between p-6 pb-4 border-b border-border">
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground">{title}</h2>
            {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="p-6 pt-4 border-t border-border flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}