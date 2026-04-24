import { Check, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NeuroCampusAccessPlan = () => {
  const plans = [
    {
      name: "Basic",
      description: "Core administrative and academic tools",
      subtitle: "Essential for daily campus operations",
      color: "from-sky-400 to-blue-500",
      textColor: "text-blue-500",
      bgColor: "bg-blue-50",
      badge: "Starter",
      features: [
        "Personalized Portals",
        "Attendance Management",
        "Academic Workflows",
        "Digital Classrooms",
        "Core Fee Management",
        "Communication Hub",
        "User Administration",
      ],
    },
    {
      name: "Pro",
      description: "Enhanced workflows and deep analytics",
      subtitle: "For scaling institutions",
      color: "from-fuchsia-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      badge: "Most Popular",
      isPopular: true,
      features: [
        "Advanced Examination Suite",
        "Multi-Dimensional Analytics",
        "Dynamic Financials",
        "Smart Automation",
        "Elevated User Experience",
        "Real-Time Operations",
        "Academic Progression",
        "Everything in Basic +",
      ],
    },
    {
      name: "Advance",
      description: "State-of-the-art intelligence and security",
      subtitle: "Enterprise-grade capabilities",
      color: "from-indigo-600 to-blue-800",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      badge: "Enterprise",
      features: [
        "AI-Powered Assistance",
        "Career Intelligence",
        "Biometric & Location Security",
        "Automated Grading Engine",
        "Enterprise Access Control",
        "High-Level Security",
        "Cloud Infrastructure",
        "System Integrity",
        "Everything in Pro +",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/50 via-white to-white"></div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Neuro Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600">Access Plans</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-6 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your institution's needs. Scale seamlessly from essential daily operations to enterprise-grade intelligence.
          </p>
          <p className="text-sm font-medium text-slate-500 bg-slate-100 inline-block px-4 py-2 rounded-full">
             All plans include 24/7 support and regular updates
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-center">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative group transition-all duration-300 ${
                  plan.isPopular ? "md:scale-105 z-10" : "z-0"
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <span className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-purple-500/30">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div
                  className={`h-full bg-white rounded-3xl transition-all duration-300 flex flex-col ${
                    plan.isPopular
                      ? "ring-2 ring-purple-500 shadow-2xl shadow-purple-500/20"
                      : "border border-slate-200 shadow-lg hover:shadow-xl"
                  } overflow-hidden`}
                >
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-br ${plan.color} p-8 text-white text-center`}>
                    <h2 className="text-3xl font-bold mb-2 tracking-tight">{plan.name}</h2>
                    <p className="text-sm font-medium text-white/90 mb-4">{plan.subtitle}</p>
                    <p className="text-sm text-white/80 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-grow flex flex-col bg-white">
                    {/* Features List */}
                    <div className="space-y-4 flex-grow mb-8">
                      <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-6">
                        What's Included
                      </h3>
                      {plan.features.map((feature, featureIndex) => {
                        const isHighlight = feature.includes("Everything in");
                        return (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <div
                              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                                isHighlight ? "bg-slate-900" : plan.bgColor
                              }`}
                            >
                              <Check
                                size={14}
                                strokeWidth={3}
                                className={isHighlight ? "text-white" : plan.textColor}
                              />
                            </div>
                            <span
                              className={`text-sm ${
                                isHighlight
                                  ? "font-bold text-slate-900"
                                  : "text-slate-600 font-medium"
                              }`}
                            >
                              {feature}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-3.5 px-6 rounded-full font-bold transition-all duration-300 uppercase text-xs tracking-widest ${
                        plan.isPopular
                          ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
                          : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                      }`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-slate-50">
        <div className="max-w-7xl mx-auto border border-slate-200 bg-white rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-4">
            Detailed Feature Comparison
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            See exactly what each plan includes and find the perfect fit for your institution's specific requirements.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-100">
                  <th className="text-left py-5 px-4 font-bold text-slate-900 uppercase tracking-wider text-xs">
                    Features & Capabilities
                  </th>
                  <th className="text-center py-5 px-4 font-bold text-blue-500 uppercase tracking-wider text-xs">
                    Basic
                  </th>
                  <th className="text-center py-5 px-4 font-bold text-purple-600 uppercase tracking-wider text-xs">
                    Pro
                  </th>
                  <th className="text-center py-5 px-4 font-bold text-indigo-700 uppercase tracking-wider text-xs">
                    Advance
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Real-time Attendance Tracking",
                  "Digital Classrooms",
                  "Advanced Analytics Dashboard",
                  "Biometric Security",
                  "AI-Powered Assistance",
                  "Automated Grading Engine",
                  "Multi-Factor Authentication",
                  "Cloud Infrastructure",
                  "Career Intelligence",
                  "Enterprise RBAC",
                ].map((feature, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {feature}
                    </td>
                    <td className="text-center py-4 px-4">
                      {![
                        "Biometric Security",
                        "AI-Powered Assistance",
                        "Automated Grading Engine",
                        "Career Intelligence",
                        "Enterprise RBAC",
                      ].includes(feature) ? (
                        <Check size={20} className="text-blue-500 mx-auto" />
                      ) : (
                        <span className="text-slate-300 font-bold">—</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4 bg-purple-50/30">
                      {![
                        "Biometric Security",
                        "Career Intelligence",
                        "Enterprise RBAC",
                      ].includes(feature) ? (
                        <Check size={20} className="text-purple-600 mx-auto" />
                      ) : (
                        <span className="text-slate-300 font-bold">—</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check size={20} className="text-indigo-700 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Decorative background blur */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Ready to Transform Your Campus?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
              Start with any plan and upgrade anytime. All plans include a 14-day free trial and full onboarding support from our expert team.
            </p>
            <button className="bg-white text-slate-900 hover:bg-slate-100 hover:-translate-y-1 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-black/20">
              Schedule a Demo Today
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section - Clean Accordion */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 mt-4 font-medium">Everything you need to know about the product and billing.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Can I upgrade or downgrade my plan anytime?",
                a: "Yes, you can change your plan at any time. Changes take effect in the next billing cycle.",
              },
              {
                q: "Do you offer custom plans for enterprise institutions?",
                a: "Absolutely! We offer fully customized solutions for large institutions. Contact our sales team for a personalized quote.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, bank transfers, and can arrange custom payment terms for institutions.",
              },
              {
                q: "Is there a minimum contract length?",
                a: "No fixed contracts required. Choose monthly or annual billing with no long-term commitments.",
              },
              {
                q: "Do you provide training and support?",
                a: "Yes, all plans include onboarding, training, and 24/7 priority support from our expert team.",
              },
              {
                q: "What about data security and compliance?",
                a: "We meet enterprise-grade security standards with encryption, regular audits, and full compliance with educational data regulations.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group border border-slate-200 rounded-2xl bg-white overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm transition-all duration-300 hover:border-purple-200"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer text-slate-900 font-bold text-lg hover:bg-slate-50 transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:-rotate-180" />
                </summary>
                <div className="p-6 pt-0 text-slate-600 leading-relaxed font-medium bg-white">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NeuroCampusAccessPlan;