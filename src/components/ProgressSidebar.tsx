"use client";

import { SectionScore } from "@/types/scorecard";

interface ProgressSidebarProps {
    sectionScores: SectionScore[];
    overallStats: {
        average: number;
        answered: number;
        total: number;
        progress: number;
    };
    activeSection?: string;
    onSectionClick?: (section: string) => void;
}

export function ProgressSidebar({
    sectionScores,
    overallStats,
    activeSection,
    onSectionClick,
}: ProgressSidebarProps) {
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset =
        circumference - (overallStats.progress / 100) * circumference;

    return (
        <aside
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                height: "100vh",
                width: "280px",
                background: "#0a0a0a",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                flexDirection: "column",
                zIndex: 50,
            }}
        >
            {/* Header */}
            <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <h1 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "2px" }}>
                    <span style={{ color: "#f97316" }}>Short</span>
                    <span style={{ color: "white" }}>Scorecard</span>
                </h1>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                    Wildfire Resilience
                </p>
            </div>

            {/* Progress Ring + Stats */}
            <div style={{ padding: "20px", display: "flex", alignItems: "center", gap: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {/* Ring */}
                <div style={{ position: "relative", width: "100px", height: "100px", flexShrink: 0 }}>
                    <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
                        />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
                            {overallStats.progress.toFixed(0)}
                            <span style={{ fontSize: "14px", color: "#f97316" }}>%</span>
                        </span>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: "12px" }}>
                        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "2px" }}>Avg Score</p>
                        <p style={{ fontSize: "22px", fontWeight: "bold", color: "white" }}>
                            {overallStats.average > 0 ? overallStats.average.toFixed(1) : "—"}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "2px" }}>Answered</p>
                        <p style={{ fontSize: "22px", fontWeight: "bold", color: "white" }}>
                            {overallStats.answered}
                            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)" }}>/{overallStats.total}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Sections */}
            <nav style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
                <p style={{ fontSize: "10px", fontWeight: "600", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
                    Sections
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {sectionScores.map((section) => {
                        const isActive = activeSection === section.section;
                        const isComplete = section.answered === section.total && section.total > 0;

                        return (
                            <li key={section.section}>
                                <button
                                    onClick={() => onSectionClick?.(section.section)}
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "12px 14px",
                                        borderRadius: "10px",
                                        transition: "all 0.15s",
                                        background: isActive ? "rgba(249,115,22,0.12)" : "transparent",
                                        border: isActive ? "1px solid rgba(249,115,22,0.25)" : "1px solid transparent",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span style={{ fontSize: "13px", fontWeight: "500", color: isActive ? "#fb923c" : "rgba(255,255,255,0.7)" }}>
                                        {section.sectionName}
                                    </span>
                                    {isComplete && (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399" }} />
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Auto-saving</p>
            </div>
        </aside>
    );
}
