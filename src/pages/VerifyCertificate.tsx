import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { verifyCertificate, getDownloadUrl } from "@/services/certificateApi";
import { CheckCircle2, AlertTriangle, XCircle, Download, ExternalLink, Calendar, Award, Building, Mail, ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import stalightLogo from "@/assets/logos/stalightlogo.png";

interface CertificateData {
  certificate_id: string;
  certificate_type: string;
  student_name: string;
  email: string;
  company_name: string;
  internship_role?: string;
  course_name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  issue_date: string;
  status: 'Verified' | 'Revoked' | 'Expired';
  verification_url: string;
  pdf_url?: string;
  image_url?: string;
}

const VerifyCertificate = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cert, setCert] = useState<CertificateData | null>(null);

  useEffect(() => {
    if (!certificateId) {
      setError("No certificate ID provided.");
      setLoading(false);
      return;
    }

    const fetchVerification = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await verifyCertificate(certificateId);
        setCert(data);
      } catch (err: any) {
        setError(err.message || "Failed to load verification details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVerification();
  }, [certificateId]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative overflow-hidden flex flex-col justify-center py-10 md:py-16">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a0f_1px,transparent_1px),linear-gradient(to_bottom,#0f172a0f_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Glowing blur auras */}
      <div className="absolute top-[-10%] right-[-10%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-gradient-to-tr from-blue-500/5 to-purple-500/5 blur-3xl pointer-events-none" />

      <main className="flex-grow px-6 max-w-7xl mx-auto w-full flex flex-col justify-center relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            <p className="text-slate-500 font-medium">Verifying certificate authenticity...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto w-full">
            <Card className="border-rose-100 bg-rose-50/20 shadow-xl overflow-hidden text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-2">
                  <ShieldAlert className="w-10 h-10 text-rose-500" />
                </div>
                <CardTitle className="text-rose-800 text-xl font-bold">Verification Failed</CardTitle>
                <CardDescription>
                  {error.includes("Not Found") ? "The provided certificate credentials do not match our database." : "An error occurred during verification."}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {error.includes("Not Found")
                    ? "If you believe this is a mistake, please double-check the ID or contact support at support@stalight.in."
                    : error}
                </p>
                <Button asChild className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:-translate-y-0.5">
                  <Link to="/">Back to Home</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : cert ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* LEFT IMAGE PREVIEW - CLEAN AND BORDERLESS */}
              <div className="lg:col-span-8 w-full bg-white rounded-xl shadow-[0_15px_45px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden relative">
                {cert.image_url && cert.status === "Verified" ? (
                  <img
                    src={cert.image_url}
                    alt="Certificate Preview"
                    className="w-full h-auto object-contain bg-white"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                      <ShieldAlert className="w-8 h-8 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-700">Preview Unavailable</h3>
                      <p className="text-sm text-slate-500 mt-1 max-w-sm">
                        {cert.status === "Revoked"
                          ? "Preview is disabled for revoked credentials."
                          : "No PDF document is generated for this entry."}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT META INFO (Clean Devtown style alignment with Stalight gradients) */}
              <div className="lg:col-span-4 flex flex-col justify-center space-y-8 pl-0 lg:pl-8 text-left">
                <div>
                  <span className="text-sm lg:text-base font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 block">
                    Certificate recipient
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                    {cert.student_name}
                  </h1>
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block">
                    Issued By
                  </span>
                  <div className="flex flex-row items-center gap-3">
                    <img 
                      src={stalightLogo} 
                      alt="Stalight logo" 
                      className="h-10 w-auto object-contain"
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      {cert.company_name}
                    </span>
                  </div>
                </div>

                {cert.status === "Revoked" && (
                  <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-rose-950 text-xs mb-0.5">Revoked Certificate</h3>
                      <p className="text-[11px] text-rose-700 leading-relaxed">
                        This credential has been marked revoked by the issuing authority and is no longer valid.
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <Button asChild className="w-full sm:w-auto bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-white rounded-xl px-8 py-3.5 h-auto text-[12px] font-bold uppercase tracking-widest shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all hover:-translate-y-0.5 overflow-hidden">
                    <a href={getDownloadUrl(cert.certificate_id)} download>
                      <Download className="w-4 h-4 mr-2 inline-block" /> Download Certificate
                    </a>
                  </Button>
                </div>

                {/* LOWER ASSURANCE TEXT SECTION */}
                <div className="border-t border-slate-200/80 pt-6 text-slate-500 leading-relaxed text-sm">
                  <p>
                    The certificate affirms that <strong className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 font-extrabold">{cert.student_name}</strong> has satisfactorily fulfilled the requirements outlined. This validation ensures its authenticity, having been duly verified and granted by <strong className="font-semibold text-slate-800">{cert.company_name}</strong>.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-4 text-xs font-semibold text-slate-400">
                    <span>Certificate ID: {cert.certificate_id}</span>
                    <span>•</span>
                    <span>Type: {cert.certificate_type.replace('_', ' ')}</span>
                    <span>•</span>
                    <span>Status: {cert.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default VerifyCertificate;
