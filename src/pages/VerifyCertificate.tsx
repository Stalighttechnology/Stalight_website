import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { verifyCertificate, getDownloadUrl } from "@/services/certificateApi";
import { CheckCircle2, AlertTriangle, XCircle, Download, ExternalLink, Calendar, Award, Building, Mail, ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1.5 px-3 py-1 text-sm font-semibold shadow-sm">
            <CheckCircle2 className="w-4 h-4" /> Verified Credential
          </Badge>
        );
      case "Revoked":
        return (
          <Badge variant="destructive" className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-1.5 px-3 py-1 text-sm font-semibold shadow-sm">
            <XCircle className="w-4 h-4" /> Revoked / Invalid
          </Badge>
        );
      case "Expired":
        return (
          <Badge variant="secondary" className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 px-3 py-1 text-sm font-semibold shadow-sm">
            <AlertTriangle className="w-4 h-4" /> Expired Credential
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 px-4 max-w-7xl mx-auto w-full flex flex-col justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-slate-500 font-medium">Verifying certificate authenticity...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto w-full">
            <Card className="border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 shadow-xl overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center mb-2">
                  <ShieldAlert className="w-10 h-10 text-rose-600 dark:text-rose-400" />
                </div>
                <CardTitle className="text-rose-800 dark:text-rose-400 text-xl font-bold">Verification Failed</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  {error.includes("Not Found") ? "The provided certificate credentials do not match our database." : "An error occurred during verification."}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {error.includes("Not Found")
                    ? "If you believe this is a mistake, please double-check the ID or contact support at support@stalight.in."
                    : error}
                </p>
                <div className="flex flex-col gap-2.5">
                  <Button asChild className="w-full">
                    <Link to="/">Back to Home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : cert ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT DETAILS COLUMN */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="shadow-xl border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
                <CardHeader className="bg-slate-900 text-white relative py-8">
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(cert.status)}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-8 h-8 text-amber-400" />
                    <div>
                      <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Credential Verification</span>
                      <h2 className="text-lg font-bold text-slate-100">{cert.certificate_id}</h2>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6 space-y-5">
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block mb-1">Recipient Name</span>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{cert.student_name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block mb-1">Type</span>
                      <p className="text-sm font-semibold capitalize text-slate-700 dark:text-slate-300">
                        {cert.certificate_type.toLowerCase()}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block mb-1">Issued By</span>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" /> {cert.company_name}
                      </p>
                    </div>
                  </div>

                  {cert.certificate_type === "INTERNSHIP" && cert.internship_role && (
                    <div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block mb-1">Internship Role</span>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {cert.internship_role}
                      </p>
                    </div>
                  )}

                  {cert.certificate_type === "COURSE" && cert.course_name && (
                    <div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block mb-1">Course Title</span>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {cert.course_name}
                      </p>
                    </div>
                  )}

                  {cert.start_date && cert.end_date && (
                    <div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block mb-1">Duration</span>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-400" /> {formatDate(cert.start_date)} – {formatDate(cert.end_date)}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block mb-1">Issue Date</span>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {formatDate(cert.issue_date)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block mb-1">Verification Status</span>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {cert.status}
                      </p>
                    </div>
                  </div>

                  {cert.description && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block mb-1">Additional Details</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800/80 p-6 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="w-full flex items-center justify-center gap-2">
                    <a href={getDownloadUrl(cert.certificate_id)} download>
                      <Download className="w-4 h-4" /> Download PDF
                    </a>
                  </Button>
                  {cert.pdf_url && (
                    <Button variant="outline" asChild className="w-full flex items-center justify-center gap-2">
                      <a href={cert.pdf_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" /> View PDF
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>

              {cert.status === "Revoked" && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 flex items-start gap-3">
                  <ShieldAlert className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-rose-900 text-sm mb-1">Revocation Notice</h3>
                    <p className="text-xs text-rose-700 leading-relaxed">
                      This certificate has been marked invalid or revoked by the issuing authority. It is no longer valid as a proof of participation or completion.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT PREVIEW COLUMN */}
            <div className="lg:col-span-7 h-[650px] w-full bg-slate-200 dark:bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-800 relative">
              {cert.pdf_url && cert.status === "Verified" ? (
                <iframe
                  src={`${cert.pdf_url}#toolbar=0&navpanes=0`}
                  title="Certificate PDF Preview"
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300">Preview Unavailable</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                      {cert.status === "Revoked"
                        ? "Preview is disabled for revoked credentials."
                        : "No PDF document is generated for this entry."}
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default VerifyCertificate;
