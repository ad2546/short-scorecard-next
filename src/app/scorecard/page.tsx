"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useScorecard } from "@/hooks/useScorecard";
import { ProgressSidebar } from "@/components/ProgressSidebar";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsModal } from "@/components/ResultsModal";
import { InviteModal } from "@/components/InviteModal";
import { JoinSessionForm } from "@/components/JoinSessionForm";

export default function ScorecardPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "48px", height: "48px", border: "3px solid #f97316", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            </div>
        }>
            <ScorecardContent />
        </Suspense>
    );
}

function ScorecardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionFromUrl = searchParams.get("session");

    const {
        groupedQuestions,
        answers,
        sectionScores,
        overallStats,
        updateAnswer,
        hasStarted,
        isHydrated,
        resetScorecard,
        personalInfo,
        shareableLink,
        sessionId,
        needsToJoin,
        sessionOwner,
        joinSession,
    } = useScorecard(sessionFromUrl || undefined);

    const sections = Object.keys(groupedQuestions);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Redirect if not started
    useEffect(() => {
        if (isHydrated && !hasStarted) {
            router.push("/");
        }
    }, [isHydrated, hasStarted, router]);

    const currentSection = sections[currentSectionIndex];
    const currentQuestions = groupedQuestions[currentSection] || [];
    const currentSectionScore = sectionScores.find(
        (s) => s.section === currentSection
    );

    const isSectionComplete =
        currentSectionScore?.answered === currentSectionScore?.total;
    const isLastSection = currentSectionIndex === sections.length - 1;
    const isFirstSection = currentSectionIndex === 0;
    const isComplete = overallStats.answered === overallStats.total;

    const goToNextSection = () => {
        if (currentSectionIndex < sections.length - 1) {
            setCurrentSectionIndex(currentSectionIndex + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const goToPrevSection = () => {
        if (currentSectionIndex > 0) {
            setCurrentSectionIndex(currentSectionIndex - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const goToSection = (section: string) => {
        const index = sections.indexOf(section);
        if (index !== -1) {
            setCurrentSectionIndex(index);
            setSidebarOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleSubmit = () => {
        setShowResultsModal(true);
    };

    const handleConfirmSubmit = () => {
        setShowResultsModal(false);
        resetScorecard();
        router.push("/");
    };

    if (!isHydrated) {
        return (
            <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "48px", height: "48px", border: "3px solid #f97316", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            </div>
        );
    }

    // Show join form for team members who need to enter their info
    if (needsToJoin && sessionId) {
        return (
            <JoinSessionForm
                sessionId={sessionId}
                onJoin={joinSession}
                sessionOwner={sessionOwner}
            />
        );
    }

    if (!hasStarted) {
        return null;
    }

    return (
        <div style={{ minHeight: "100vh", background: "#000" }}>
            {/* Results Modal */}
            <ResultsModal
                isOpen={showResultsModal}
                onClose={() => setShowResultsModal(false)}
                sectionScores={sectionScores}
                overallAverage={overallStats.average}
                onConfirm={handleConfirmSubmit}
            />

            {/* Invite Modal */}
            <InviteModal
                isOpen={showInviteModal}
                onClose={() => setShowInviteModal(false)}
                shareableLink={shareableLink}
            />

            {/* Mobile overlay */}
            <div
                className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Mobile hamburger */}
            <button
                className="sidebar-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
            >
                ☰
            </button>

            {/* Sidebar */}
            <ProgressSidebar
                sectionScores={sectionScores}
                overallStats={overallStats}
                activeSection={currentSection}
                onSectionClick={goToSection}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="scorecard-main" style={{ marginLeft: "280px" }}>
                {/* Header */}
                <header style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                    background: "rgba(0,0,0,0.95)",
                    backdropFilter: "blur(8px)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    padding: "24px 48px",
                }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
                                Welcome, <span style={{ color: "white" }}>{personalInfo.firstName}</span>
                            </p>
                            <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
                                Wildfire Resilience Scorecard
                            </h1>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
                            <div style={{ textAlign: "right" }}>
                                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Score</p>
                                <p style={{ fontSize: "32px", fontWeight: "bold", color: "#fb923c" }}>
                                    {overallStats.answered > 0 ? overallStats.average.toFixed(1) : "—"}
                                </p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Progress</p>
                                <p style={{ fontSize: "32px", fontWeight: "bold", color: "white" }}>
                                    {overallStats.answered}<span style={{ color: "rgba(255,255,255,0.3)" }}>/{overallStats.total}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Section Content */}
                <div style={{ padding: "48px", maxWidth: "900px" }}>
                    {/* Section Header */}
                    <div style={{ marginBottom: "48px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                            <span style={{ fontSize: "14px", color: "#fb923c", fontWeight: "600" }}>
                                Section {currentSectionIndex + 1} of {sections.length}
                            </span>
                            {isSectionComplete && (
                                <span style={{
                                    padding: "6px 12px",
                                    borderRadius: "20px",
                                    background: "rgba(16,185,129,0.15)",
                                    color: "#34d399",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                }}>
                                    ✓ Complete
                                </span>
                            )}
                        </div>
                        <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "white", marginBottom: "20px" }}>
                            {currentSectionScore?.sectionName || currentSection}
                        </h2>
                        {/* Progress Bar */}
                        <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                            <div
                                style={{
                                    height: "100%",
                                    borderRadius: "3px",
                                    transition: "all 0.5s",
                                    width: `${((currentSectionScore?.answered || 0) / (currentSectionScore?.total || 1)) * 100}%`,
                                    background: isSectionComplete
                                        ? "linear-gradient(90deg, #10b981, #34d399)"
                                        : "linear-gradient(90deg, #f97316, #fb923c)",
                                }}
                            />
                        </div>
                    </div>

                    {/* Questions */}
                    <div>
                        {currentQuestions.map((question) => (
                            <QuestionCard
                                key={question.QID}
                                question={question}
                                answer={
                                    answers[question.QID] || {
                                        qid: question.QID,
                                        score: null,
                                        notes: "",
                                    }
                                }
                                onAnswerChange={(answer) => updateAnswer(answer, personalInfo)}
                                onInviteClick={() => setShowInviteModal(true)}
                            />
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div style={{
                        marginTop: "64px",
                        paddingTop: "32px",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <button
                            onClick={goToPrevSection}
                            disabled={isFirstSection}
                            style={{
                                padding: "16px 32px",
                                borderRadius: "12px",
                                fontSize: "14px",
                                fontWeight: "600",
                                transition: "all 0.2s",
                                background: isFirstSection ? "transparent" : "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: isFirstSection ? "rgba(255,255,255,0.2)" : "white",
                                cursor: isFirstSection ? "not-allowed" : "pointer",
                            }}
                        >
                            ← Previous Section
                        </button>

                        {isLastSection ? (
                            <button
                                onClick={handleSubmit}
                                disabled={!isComplete}
                                style={{
                                    padding: "16px 40px",
                                    borderRadius: "12px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    transition: "all 0.2s",
                                    background: isComplete
                                        ? "linear-gradient(135deg, #f97316, #fb923c)"
                                        : "rgba(255,255,255,0.06)",
                                    border: "none",
                                    color: isComplete ? "white" : "rgba(255,255,255,0.3)",
                                    cursor: isComplete ? "pointer" : "not-allowed",
                                    boxShadow: isComplete ? "0 8px 24px rgba(249,115,22,0.4)" : "none",
                                }}
                            >
                                {isComplete ? "Submit Scorecard ✓" : `${overallStats.answered}/${overallStats.total} to Submit`}
                            </button>
                        ) : (
                            <button
                                onClick={goToNextSection}
                                style={{
                                    padding: "16px 40px",
                                    borderRadius: "12px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    transition: "all 0.2s",
                                    background: isSectionComplete
                                        ? "linear-gradient(135deg, #f97316, #fb923c)"
                                        : "rgba(255,255,255,0.08)",
                                    border: "none",
                                    color: "white",
                                    cursor: "pointer",
                                    boxShadow: isSectionComplete ? "0 8px 24px rgba(249,115,22,0.3)" : "none",
                                }}
                            >
                                Next Section →
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
