import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Sparkles } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 border-t border-blue-900/40 bg-gray-950/85 backdrop-blur-md">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <section>
            <div className="flex items-center gap-2 text-xl font-extrabold tracking-wide mb-3">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-blue-400">Taste</span>
              <span>Nest</span>
            </div>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Your trusted kitchen companion for discovering global recipes,
              planning meals, and cooking with confidence.
            </p>
          </section>

          <section>
            <h4 className="text-sm uppercase tracking-wider text-muted mb-3">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="hover:text-accent transition">
                Home
              </Link>
              <span className="text-muted">Trending Recipes</span>
              <span className="text-muted">Global Cuisines</span>
              <span className="text-muted">Quick Filter</span>
            </div>
          </section>

          <section>
            <h4 className="text-sm uppercase tracking-wider text-muted mb-3">
              Contact
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted">
                <Mail className="w-4 h-4 text-blue-300" />
                support@tastenest.app
              </div>
              <div className="flex items-center gap-2 text-muted">
                <MapPin className="w-4 h-4 text-blue-300" />
                Food Street, Kanpur, India
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>{year} TasteNest. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-accent transition" type="button">
              Privacy
            </button>
            <button className="hover:text-accent transition" type="button">
              Terms
            </button>
            <button className="hover:text-accent transition" type="button">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
