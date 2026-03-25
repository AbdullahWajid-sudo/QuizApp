import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Helmet, HelmetProvider } from "react-helmet-async";

const VerifyPage = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder badge URLs - replace with your actual badge image URLs
  const goldBadgeUrl = "/public/assets/images/gold-badge.png"; // For scores > 95%
  const silverBadgeUrl = "https://i.imgur.com/b6a3kVA.png"; // For other scores

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!id) {
        setLoading(false);
        setError("No certificate ID provided.");
        return;
      }
      try {
        const docRef = doc(db, "certificates", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCertificate({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(
            "Certificate not found. It may be invalid or has been removed.",
          );
        }
      } catch (err) {
        setError("Failed to fetch certificate data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-quiz-purple"></div>
        <p className="ml-4 text-lg font-medium text-slate-600">
          Verifying Certificate...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100 text-center p-4">
        <span className="material-symbols-outlined text-rose-500 text-6xl mb-4">
          error
        </span>
        <h1 className="text-3xl font-bold text-navy mb-2">
          Verification Failed
        </h1>
        <p className="text-slate-600 max-w-md">{error}</p>
        <Link
          to="/"
          className="mt-8 px-6 py-3 bg-quiz-purple text-white font-bold rounded-xl hover:bg-purple-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (certificate) {
    const imageUrl =
      certificate.finalScore > 95 ? goldBadgeUrl : silverBadgeUrl;
    const pageUrl = window.location.href;
    const title = `Certificate: ${certificate.userName} - ${certificate.QuizName}`;
    const description = `I scored ${certificate.finalScore}% on the ${certificate.QuizName} quiz. Check out my certificate!`;

    return (
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="article" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content={imageUrl} />
        </Helmet>
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
            <div className="p-10 md:p-16 border-8 border-navy">
              <div className="text-center space-y-4">
                <img
                  src={imageUrl}
                  alt="Certificate Badge"
                  className="mx-auto h-24 w-24 mb-4"
                />
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                  Certificate of Completion
                </p>
                <h1 className="text-4xl md:text-5xl font-black text-navy">
                  {certificate.QuizName}
                </h1>
                <p className="text-lg text-slate-600">
                  This is to certify that
                </p>
                <p className="text-4xl font-bold text-quiz-purple">
                  {certificate.userName}
                </p>
                <p className="text-lg text-slate-600">
                  has successfully completed the quiz with a score of
                </p>
                <p className="text-6xl font-extrabold text-emerald-500">
                  {certificate.finalScore}%
                </p>
                <div className="pt-6 text-xs text-slate-400">
                  <p>
                    Issued on:{" "}
                    {new Date(
                      certificate.createdAt.seconds * 1000,
                    ).toLocaleDateString()}
                  </p>
                  <p className="mt-1">Certificate ID: {certificate.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HelmetProvider>
    );
  }

  return null;
};

export default VerifyPage;
