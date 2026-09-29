import { Link } from "react-router-dom";
import { Church as ChurchIcon, MapPin, Phone, Mail } from "lucide-react";
import { CHURCH } from "@/lib/seedData";

export default function PublicFooter() {
  return (
    <footer className="bg-primary text-primary-foreground/90 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
                <ChurchIcon className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-lg">{CHURCH.name}</span>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-sm leading-relaxed">
              {CHURCH.tagline}. A Christ-centered community worshiping, growing, and serving together.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-3 text-primary-foreground">Explore</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-primary-foreground">About Us</Link></li>
              <li><Link to="/ministries" className="hover:text-primary-foreground">Ministries</Link></li>
              <li><Link to="/events" className="hover:text-primary-foreground">Events</Link></li>
              <li><Link to="/sermons" className="hover:text-primary-foreground">Sermons</Link></li>
              <li><Link to="/portal" className="hover:text-primary-foreground">Member Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-3 text-primary-foreground">Visit Us</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li className="flex gap-2.5"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {CHURCH.address}</li>
              <li className="flex gap-2.5"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> {CHURCH.phone}</li>
              <li className="flex gap-2.5"><Mail className="w-4 h-4 mt-0.5 shrink-0" /> {CHURCH.email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row justify-between gap-3 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} {CHURCH.name}. All rights reserved.</p>
          <p>A demonstration church management platform. Fictional data.</p>
        </div>
      </div>
    </footer>
  );
}