import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Phone, Mail, MapPin, Send, HelpCircle, ShieldCheck } from "lucide-react";

export const Contact: React.FC = () => {
  const { showAlert } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showAlert("Please write complete messages.", "error");
      return;
    }
    showAlert("Your inquiry has been logged in our secure heritage vault. A Director will respond shortly.", "success");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      
      {/* Title */}
      <div className="text-center mb-16">
        <span className="text-gold-600 font-luxury-display text-xs tracking-[0.3em] uppercase mb-2 block">
          Patron Concierge Lounge
        </span>
        <h1 className="text-3xl sm:text-5xl font-luxury-display tracking-widest uppercase font-medium text-neutral-950">
          CONNECT WITH US
        </h1>
        <div className="h-[1px] w-12 bg-gold-400 mx-auto mt-4" />
        <p className="text-xs text-neutral-400 uppercase tracking-widest mt-2 font-mono">
          Global inquiry offices: Srinagar, Paris, London
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Col: Contact coordinates (lg:span-5) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-4">
            <h2 className="font-luxury-display text-base uppercase tracking-widest font-bold text-neutral-900 border-b border-gold-100 pb-2">
              Concierge Coordinates
            </h2>
            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-sm">
              Our direct-to-patron consultants are available 24/7 to answer historical background queries, verify certificate details, or help secure custom orders.
            </p>
          </div>

          <div className="space-y-6 text-xs text-neutral-800">
            {/* Phone */}
            <div className="flex items-start space-x-4 bg-white border border-gold-100 p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-gold-50 text-gold-600 flex items-center justify-center rounded-sm">
                <Phone className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold uppercase tracking-wider text-neutral-500 text-[10px]">Direct Hotlines / WhatsApp</p>
                <p className="font-medium text-neutral-950 font-mono">+91 194 245 90212 (Srinagar HQ)</p>
                <p className="font-medium text-neutral-950 font-mono">+44 7700 900077 (London Office)</p>
                <a
                  href="https://wa.me/9119424590212?text=I'm%20interested%20in%20an%20authentic%20Pashmina%20or%20Saffron%20acquisition."
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="inline-block mt-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-sm transition-colors cursor-pointer shadow-sm"
                >
                  Direct WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 bg-white border border-gold-100 p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-gold-50 text-gold-600 flex items-center justify-center rounded-sm">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold uppercase tracking-wider text-neutral-500 text-[10px]">Corporate Coordinates</p>
                <p className="font-medium text-neutral-950 font-mono">director@ziryaat-kash.com</p>
                <p className="font-medium text-neutral-950 font-mono">concierege@ziryaat-kash.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4 bg-white border border-gold-100 p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-gold-50 text-gold-600 flex items-center justify-center rounded-sm">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <p className="font-semibold uppercase tracking-wider text-neutral-500 text-[10px]">Heritage Salons</p>
                <div>
                  <p className="font-bold text-neutral-950">Srinagar Flagship HQ:</p>
                  <p className="font-light text-neutral-500">Houseboat Boulevard Road, Dal Lake, Srinagar, Kashmir, 190001</p>
                </div>
                <div>
                  <p className="font-bold text-neutral-950">Paris Heritage Boutique:</p>
                  <p className="font-light text-neutral-500">42 Rue du Faubourg Saint-Honoré, 75008 Paris, France</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Col: Contact Submission form (lg:span-7) */}
        <div className="lg:col-span-7 bg-white border border-gold-200 p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-gold-100 pb-3">
            <h2 className="font-luxury-display text-sm uppercase tracking-widest font-bold text-neutral-950">
              Transmit Private Inquiry
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Your Full Name</label>
              <input
                required
                type="text"
                placeholder="Lord Evelyn Hastings"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-3 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Email Coordinates</label>
              <input
                required
                type="email"
                placeholder="patron@royalheritage.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-3 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Private Message Inquiry</label>
              <textarea
                required
                placeholder="Write your background requests here (e.g. custom dimensions for silk carpets, bulk corporate giftings with certificate seals)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs p-3 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light min-h-[150px]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 text-xs tracking-widest uppercase font-semibold transition-all rounded-sm cursor-pointer border border-gold-400 flex items-center justify-center space-x-2 shadow-xl"
            >
              <Send className="h-4 w-4" />
              <span>Transmit Secure Inquiry</span>
            </button>
          </form>

          <div className="mt-4 text-center text-[9px] text-neutral-400 font-mono flex items-center justify-center space-x-1 border-t border-neutral-100 pt-4">
            <ShieldCheck className="h-3 w-3 text-gold-500" />
            <span>Encrypted transmission. Checked and answered strictly by directors.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
