import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight, Loader, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitContactToSupabase } from "@/lib/supabaseContactService";
import { sendContactEmail } from "@/lib/emailService";

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please enter your message",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Submit to Supabase database
      const result = await submitContactToSupabase({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      setLoading(false);

      if (result.success) {
        // Send email notification to admin (optional)
        let emailResult = null;
        try {
          emailResult = await sendContactEmail({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            adminEmail: 'info@stalight.in'
          });
        } catch (emailError) {
          console.log("Email notification skipped:", emailError);
        }

        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-white overflow-hidden border-t border-slate-100">

      {/* --- Optimized Ambient Background Glows --- */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-50/40 rounded-full blur-[40px] translate-x-1/3 -translate-y-1/3 pointer-events-none z-0 transform-gpu"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[40px] -translate-x-1/3 translate-y-1/3 pointer-events-none z-0 transform-gpu"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* --- LEFT COLUMN: Contact Info --- */}
          <div className="flex flex-col justify-center h-full">
            <h2 className="font-sans text-4xl md:text-5xl font-light text-slate-950 mb-6 tracking-tight leading-[1.1]">
              Let's Discuss Your <br />
              <span className="font-bold">Requirements.</span>
            </h2>

            <p className="text-slate-500 font-light text-lg mb-12 max-w-md leading-relaxed">
              Whether you are evaluating platforms for your institution or exploring partnership opportunities — our team is ready to help.
            </p>

            <div className="space-y-8">
              {/* Contact Items Array Mapping */}
              {[
                { icon: Mail, title: "Email", text: "info@stalight.in", link: "mailto:info@stalight.in" },
                { icon: Phone, title: "Phone", text: "+91 86601 44040", link: "tel:+918660144040" },
                { icon: MapPin, title: "Headquarters", text: "Rajajinagar, Bengaluru, Karnataka", link: null },
                { icon: Clock, title: "Business Hours", text: "Monday – Saturday, 9:00 AM – 7:00 PM IST", link: null },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-red-100 group-hover:bg-red-50 transition-colors duration-300 shadow-sm">
                    <item.icon className="w-6 h-6 text-[#D32027]" strokeWidth={1.5} />
                  </div>
                  <div className="pt-1">
                    <p className="font-sans text-[11px] tracking-[0.15em] font-bold text-slate-400 uppercase mb-1">{item.title}</p>
                    {item.link ? (
                      <a href={item.link} className="font-sans text-[15px] font-medium text-slate-800 hover:text-[#D32027] transition-colors duration-300">
                        {item.text}
                      </a>
                    ) : (
                      <p className="font-sans text-[15px] font-medium text-slate-800">
                        {item.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: 3D Form Container --- */}
          <div className="relative mt-8 lg:mt-0">
            {/* Offset Shadow Layer for 3D Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white rounded-[2rem] transform translate-x-4 translate-y-4 border border-slate-200/50 -z-10 hidden sm:block"></div>

            <div className="bg-white border border-slate-200 p-8 md:p-12 lg:p-14 rounded-[2rem] shadow-md relative z-10">
              <h3 className="font-sans text-2xl font-bold text-slate-900 mb-8 tracking-tight">
                Send Us a Message
              </h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block font-sans text-[11px] tracking-[0.15em] font-bold text-slate-500 uppercase mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-xl font-sans text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D32027] focus:ring-1 focus:ring-[#D32027]/20 transition-all duration-300 disabled:opacity-50"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[11px] tracking-[0.15em] font-bold text-slate-500 uppercase mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-xl font-sans text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D32027] focus:ring-1 focus:ring-[#D32027]/20 transition-all duration-300 disabled:opacity-50"
                    placeholder="you@institution.edu"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[11px] tracking-[0.15em] font-bold text-slate-500 uppercase mb-3">
                    How Can We Help?
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-xl font-sans text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D32027] focus:ring-1 focus:ring-[#D32027]/20 transition-all duration-300 resize-none disabled:opacity-50"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full inline-flex items-center justify-center px-10 py-5 bg-slate-950 text-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 mt-4 disabled:opacity-70"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#D32027] to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>

                  <span className="relative z-10 flex items-center gap-3 text-[12px] font-bold tracking-[0.2em] uppercase">
                    {loading ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowSuccess(false)} />
          <div className="relative z-50 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-slate-900">Message sent</h4>
                <p className="text-slate-500 text-sm mt-1">Thanks — your message was sent successfully. Our team will contact you shortly to follow up.</p>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button onClick={() => setShowSuccess(false)} className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;