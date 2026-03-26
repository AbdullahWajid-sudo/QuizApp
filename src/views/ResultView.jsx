import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import QuizError from "../components/QuizError";
import { useResultViewModel } from "../viewModels/useResultViewModel";
import Answers from "../components/Answers";
import { styles } from "../../public/assets/styles/QuizDocumentStyles";
import goldbadge from "../../public/assets/images/goldbadge.png";
import signature from "../../public/assets/images/signature.png";
import { useEffect } from "react";

const QuizDocument = ({ state }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.border}>
        <Image style={styles.logo} src={goldbadge} alt="Logo" />
        <Text style={styles.header}>Certificate of Completion</Text>
        <Text style={styles.subHeader}>This is to certify that</Text>
        <Text style={styles.name}>{state.userName}</Text>
        <Text style={styles.text}>has successfully completed the quiz</Text>
        <Text style={styles.quizTitle}>{state.QuizName}</Text>
        <Text style={styles.encouragement}>
          We acknowledge your effort, keep participating!
        </Text>
        <View style={styles.footer}>
          <Text style={styles.date}>
            Date: {new Date().toLocaleDateString()}
          </Text>
          <View style={styles.signatureContainer}>
            <Image
              style={styles.signatureImage}
              src={signature}
              alt="Signature"
            />
            <Text style={styles.signatureLine}>Authorized Signature</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

function ResultView() {
  const { state, actions } = useResultViewModel();
  useEffect(() => {
    console.log("Current State Attempt ID:", state.attemptId);
  }, [state.attemptId]);

  if (!state) {
    return <QuizError />;
  }

  const handleAddToLinkedInProfile = () => {
    const baseUrl = "https://www.linkedin.com/profile/add";

    const params = new URLSearchParams({
      startTask: "CERTIFICATION_NAME",
      name: `Certified: ${state.QuizName}`, // The Name of the Certificate
      organizationName: "Your Brand Name", // e.g., "Sudo QuizApp"
      issueYear: new Date().getFullYear(),
      issueMonth: new Date().getMonth() + 1,
      certUrl: `https://abdullahwajid-sudo.github.io/verify/${state.attemptId}`, // The Verification Link
      certId: state.attemptId, // The Firestore Document ID as the License Number
    });

    const fullUrl = `${baseUrl}?${params.toString()}`;
    window.open(fullUrl, "_blank");
  };

  const handleLinkedInShare = () => {
    // Check if attemptId is a real Firestore ID (not just 'true' or undefined)
    if (!state.attemptId || state.attemptId === "true") {
      alert("Please wait a moment for the certificate to generate...");
      return;
    }

    // 1. Fixed the double https:// from earlier
    // 2. Used encodeURIComponent to ensure the # (hash) doesn't break the link
    const verificationUrl = `https://abdullahwajid-sudo.github.io/QuizApp/#/verify/${state.attemptId}`;

    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verificationUrl)}`;

    window.open(
      linkedInUrl,
      "_blank",
      "width=600,height=600,noopener,noreferrer",
    );
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50/50 overflow-x-hidden">
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 pb-40 print:pb-8">
        <div className="mb-8 text-center">
          <div className="inline-block p-3 rounded-full bg-quiz-purple/5 mb-4">
            <span className="material-symbols-outlined text-quiz-purple text-4xl">
              emoji_events
            </span>
          </div>
          <h2 className="text-3xl font-bold text-navy mb-2">Quiz Completed!</h2>
          <p className="text-slate-500">
            Great effort, {state.userName}! Here is your performance summary for{" "}
            <b>{state.QuizName}</b>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-white border border-slate-100 rounded-2xl flex items-center justify-between p-5 shadow-sm print:shadow-none">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Final Score
              </span>
              <div className="text-2xl font-bold text-quiz-purple">
                {state.finalScore}%
              </div>
            </div>
            <span className="material-symbols-outlined text-quiz-purple/20 text-3xl">
              grade
            </span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl flex items-center justify-between p-5 shadow-sm print:shadow-none">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Time Taken
              </span>
              <div className="text-2xl font-bold text-quiz-purple">
                {state.totalTimeStr}
              </div>
            </div>
            <span className="material-symbols-outlined text-quiz-purple/20 text-3xl">
              timer
            </span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl flex items-center justify-between p-5 shadow-sm print:shadow-none">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Correct
              </span>
              <div className="text-2xl font-bold text-emerald-500">
                {state.correctAnswers}/{state.totalQuestions}
              </div>
            </div>
            <span className="material-symbols-outlined text-emerald-500/20 text-3xl">
              check_circle
            </span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl flex items-center justify-between p-5 shadow-sm print:shadow-none">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Accuracy
              </span>
              <div className="text-2xl font-bold text-rose-400">
                {state.finalScore >= 90
                  ? "Expert! Outstanding Performance"
                  : state.finalScore >= 75
                    ? "Great Job! Almost Perfect"
                    : state.finalScore >= 50
                      ? "Good Effort! Keep Improving"
                      : "Keep Practicing"}
              </div>
            </div>
            <span className="material-symbols-outlined text-rose-400/20 text-3xl">
              insights
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-navy">Question Review</h3>
            <button
              onClick={() => actions.setIsVisibleResult(!state.isVisibleResult)}
              className="text-sm font-bold text-quiz-purple hover:underline"
            >
              {state.isVisibleResult ? "Hide Review" : "Show Review"}
            </button>
          </div>

          {state.isVisibleResult && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Answers
                que={state.questions || state.finalQuestions}
                ans={state.userAnswers || state.finalAnswers}
              />
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-slate-200 shadow-2xl z-50 print:hidden">
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          <button
            onClick={() =>
              actions.navigate("/SelectQuiz", {
                state: { name: state.userName },
              })
            }
            className="w-full py-4 bg-quiz-purple text-white font-bold rounded-xl shadow-lg shadow-quiz-purple/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">refresh</span>
            RETRY QUIZ
          </button>
          <div className="flex gap-3">
            <PDFDownloadLink
              document={<QuizDocument state={state} />}
              fileName={`quiz-result-${state.userName}.pdf`}
              className="flex-1 py-4 bg-white text-quiz-purple border border-quiz-purple/20 font-bold rounded-xl active:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              {({ loading }) => (
                <>
                  <span className="material-symbols-outlined">download</span>
                  {loading ? "LOADING..." : "PDF"}
                </>
              )}
            </PDFDownloadLink>
            <button
              onClick={() => actions.navigate("/")}
              className="flex-1 py-4 bg-white text-quiz-purple border border-quiz-purple/20 font-bold rounded-xl active:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">home</span>
              HOME
            </button>
            <button
              onClick={handleAddToLinkedInProfile}
              className="flex-1 py-4 bg-[#0077B5] text-white font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Badge
            </button>
            <button
              onClick={handleLinkedInShare}
              className="flex-1 py-4 bg-[#0077B5] text-white font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              SHARE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultView;
