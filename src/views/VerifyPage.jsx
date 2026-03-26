import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Import images directly to avoid path issues on GitHub Pages
import goldBadgeUrl from "../assets/images/goldbadge.png";
import silverBadgeUrl from "../assets/images/silverbadge.png";

const VerifyPage = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!id) {
        setLoading(false);
        setError("No certificate ID provided.");
        return;
      }
      try {
        // Use "Details" to match your Firestore screenshot
        const docRef = doc(db, "Details", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCertificate({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Certificate not found. It may be invalid or removed.");
        }
      } catch (err) {
        setError("Failed to fetch certificate data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Verifying...
      </div>
    );

  if (error || !certificate) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Verification Failed</h1>
        <p>{error}</p>
        <Link to="/" className="text-blue-500 underline mt-4">
          Back to Home
        </Link>
      </div>
    );
  }

  // --- LOGIC SECTION ---
  // Using 'finalScore' and 'QuizName' to match your Firestore 'Details' screenshot
  const scoreValue = certificate.finalScore || 0;
  const quizTitle = certificate.QuizName || "Quiz Achievement";
  const imageUrl = scoreValue >= 80 ? goldBadgeUrl : silverBadgeUrl;

  return (
    <HelmetProvider>
      <Helmet>
        <title>Certificate: {certificate.userName}</title>
      </Helmet>

      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-10 md:p-16 border-8 border-navy text-center">
          <img src={imageUrl} alt="Badge" className="mx-auto h-24 w-24 mb-6" />

          <p className="uppercase tracking-widest text-slate-500 text-sm font-semibold">
            Certificate of Completion
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-navy my-4">
            {quizTitle}
          </h1>

          <p className="text-lg text-slate-600">This is to certify that</p>
          <p className="text-4xl font-bold text-purple-600 my-4">
            {certificate.userName}
          </p>

          <p className="text-lg text-slate-600">scored</p>
          <p className="text-6xl font-extrabold text-emerald-500 my-4">
            {scoreValue}%
          </p>

          <div className="mt-10 pt-6 border-t border-slate-100 text-xs text-slate-400">
            <p>
              Issued:{" "}
              {certificate.createdAt?.seconds
                ? new Date(
                    certificate.createdAt.seconds * 1000,
                  ).toLocaleDateString()
                : "N/A"}
            </p>
            <p>Verify ID: {certificate.id}</p>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default VerifyPage;
