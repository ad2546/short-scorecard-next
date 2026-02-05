"use client";

import { useState } from "react";
import { Question, Answer } from "@/types/scorecard";

interface QuestionCardProps {
    question: Question;
    answer: Answer;
    onAnswerChange: (answer: Answer) => void;
    onInviteClick?: () => void;
}

export function QuestionCard({
    question,
    answer,
    onAnswerChange,
    onInviteClick,
}: QuestionCardProps) {
    const [showNotes, setShowNotes] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showAnswererTooltip, setShowAnswererTooltip] = useState(false);

    const scaleOptions = [
        { value: 0, label: question.Scale0 },
        { value: 1, label: question.Scale1 },
        { value: 2, label: question.Scale2 },
        { value: 3, label: question.Scale3 },
        { value: 4, label: question.Scale4 },
    ];

    const handleScoreSelect = (score: number | "N/A") => {
        onAnswerChange({
            ...answer,
            score,
        });
    };

    const handleNotesChange = (notes: string) => {
        onAnswerChange({
            ...answer,
            notes,
        });
    };

    const isSelected = (value: number | "N/A") => answer.score === value;
    const hasAnswer =
        (typeof answer.score === "number") ||
        answer.score === "N/A";

    return (
        <div
            className="rounded-2xl transition-all duration-300"
            style={{
                background: hasAnswer
                    ? "rgba(249,115,22,0.06)"
                    : "rgba(255,255,255,0.02)",
                border: hasAnswer
                    ? "1px solid rgba(249,115,22,0.25)"
                    : "1px solid rgba(255,255,255,0.08)",
                padding: "32px",
                marginBottom: "24px",
            }}
        >
            {/* Question */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "16px" }}>
                <div
                    style={{
                        flexShrink: 0,
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "16px",
                        background: hasAnswer
                            ? "linear-gradient(135deg, #f97316, #fb923c)"
                            : "rgba(255,255,255,0.08)",
                        color: hasAnswer ? "white" : "rgba(255,255,255,0.5)",
                    }}
                >
                    {question.QID}
                </div>
                <div style={{ flex: 1 }}>
                    <h3 style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "rgba(255,255,255,0.9)",
                        lineHeight: "1.6",
                        marginBottom: "12px",
                    }}>
                        {question.Question}
                    </h3>
                    {question.Tooltip && (
                        <button
                            onClick={() => setShowTooltip(!showTooltip)}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "12px",
                                fontWeight: "600",
                                color: showTooltip ? "#fb923c" : "rgba(255,255,255,0.5)",
                                background: showTooltip
                                    ? "rgba(249,115,22,0.15)"
                                    : "rgba(255,255,255,0.05)",
                                border: showTooltip
                                    ? "1px solid rgba(249,115,22,0.3)"
                                    : "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "100px",
                                cursor: "pointer",
                                padding: "8px 14px",
                                transition: "all 0.25s ease",
                            }}
                            onMouseOver={(e) => {
                                if (!showTooltip) {
                                    e.currentTarget.style.background = "rgba(249,115,22,0.1)";
                                    e.currentTarget.style.borderColor = "rgba(249,115,22,0.2)";
                                    e.currentTarget.style.color = "#fb923c";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!showTooltip) {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                                }
                            }}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                            {showTooltip ? "Hide Guidance" : "View Guidance"}
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    transition: "transform 0.25s ease",
                                    transform: showTooltip ? "rotate(180deg)" : "rotate(0deg)",
                                }}
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Tooltip/Guidance Content */}
            {showTooltip && question.Tooltip && (
                <div
                    style={{
                        marginBottom: "24px",
                        marginLeft: "68px",
                        padding: "20px 24px",
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0.05) 100%)",
                        border: "1px solid rgba(249,115,22,0.2)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fb923c"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                        <p style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            color: "#fb923c",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                        }}>
                            Assessment Guidance
                        </p>
                    </div>
                    <div style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.75)",
                        lineHeight: "1.7",
                        whiteSpace: "pre-wrap",
                    }}>
                        {question.Tooltip}
                    </div>
                </div>
            )}

            {/* Score Label */}
            <p style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "16px",
            }}>
                Select Score
            </p>

            {/* Score Options - Flexbox Layout */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "24px",
            }}>
                {scaleOptions.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleScoreSelect(option.value)}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 14px",
                            borderRadius: "10px",
                            textAlign: "left",
                            transition: "all 0.2s",
                            background: isSelected(option.value)
                                ? "linear-gradient(135deg, #f97316, #fb923c)"
                                : "rgba(255,255,255,0.04)",
                            border: isSelected(option.value)
                                ? "1px solid rgba(249,115,22,0.5)"
                                : "1px solid rgba(255,255,255,0.1)",
                            cursor: "pointer",
                            maxWidth: "100%",
                        }}
                    >
                        <span
                            style={{
                                flexShrink: 0,
                                width: "28px",
                                height: "28px",
                                borderRadius: "6px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "13px",
                                background: isSelected(option.value)
                                    ? "rgba(255,255,255,0.2)"
                                    : "rgba(255,255,255,0.08)",
                                color: isSelected(option.value) ? "white" : "rgba(255,255,255,0.6)",
                            }}
                        >
                            {option.value}
                        </span>
                        <span
                            style={{
                                fontSize: "13px",
                                fontWeight: "500",
                                color: isSelected(option.value) ? "white" : "rgba(255,255,255,0.7)",
                                lineHeight: "1.3",
                            }}
                        >
                            {option.label}
                        </span>
                    </button>
                ))}

                {question.AllowNA && (
                    <button
                        onClick={() => handleScoreSelect("N/A")}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 14px",
                            borderRadius: "10px",
                            textAlign: "left",
                            transition: "all 0.2s",
                            background: isSelected("N/A")
                                ? "rgba(107,114,128,0.4)"
                                : "rgba(255,255,255,0.04)",
                            border: isSelected("N/A")
                                ? "1px solid rgba(107,114,128,0.5)"
                                : "1px solid rgba(255,255,255,0.1)",
                            cursor: "pointer",
                        }}
                    >
                        <span
                            style={{
                                flexShrink: 0,
                                width: "28px",
                                height: "28px",
                                borderRadius: "6px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "11px",
                                background: isSelected("N/A")
                                    ? "rgba(255,255,255,0.2)"
                                    : "rgba(255,255,255,0.08)",
                                color: isSelected("N/A") ? "white" : "rgba(255,255,255,0.5)",
                            }}
                        >
                            N/A
                        </span>
                        <span
                            style={{
                                fontSize: "13px",
                                fontWeight: "500",
                                color: isSelected("N/A") ? "white" : "rgba(255,255,255,0.6)",
                            }}
                        >
                            Not Applicable
                        </span>
                    </button>
                )}
            </div>

            {/* Footer: Notes + Invite + Answerer */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <button
                            onClick={() => setShowNotes(!showNotes)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "14px",
                                color: "rgba(249,115,22,0.8)",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                padding: "0",
                            }}
                        >
                            <span style={{ fontSize: "18px" }}>{showNotes ? "−" : "+"}</span>
                            {showNotes ? "Hide notes" : "Add notes"}
                        </button>

                        {/* Invite Team Button */}
                        {onInviteClick && (
                            <button
                                onClick={onInviteClick}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "14px",
                                    color: "rgba(255,255,255,0.5)",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "0",
                                    transition: "color 0.2s ease",
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = "#f97316";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <line x1="20" y1="8" x2="20" y2="14" />
                                    <line x1="23" y1="11" x2="17" y2="11" />
                                </svg>
                                Invite team
                            </button>
                        )}
                    </div>

                    {/* Answered By Avatar */}
                    {answer.answeredBy && (
                        <div
                            style={{ position: "relative" }}
                            onMouseEnter={() => setShowAnswererTooltip(true)}
                            onMouseLeave={() => setShowAnswererTooltip(false)}
                        >
                            <div
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    color: "white",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 8px rgba(249, 115, 22, 0.3)",
                                }}
                            >
                                {answer.answeredBy.initials}
                            </div>

                            {/* Tooltip */}
                            {showAnswererTooltip && (
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "calc(100% + 8px)",
                                        right: 0,
                                        background: "linear-gradient(135deg, rgba(30, 20, 15, 0.98) 0%, rgba(20, 15, 10, 0.98) 100%)",
                                        border: "1px solid rgba(249, 115, 22, 0.3)",
                                        borderRadius: "10px",
                                        padding: "10px 14px",
                                        whiteSpace: "nowrap",
                                        zIndex: 100,
                                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                                    }}
                                >
                                    <p style={{ fontSize: "13px", fontWeight: "600", color: "white", marginBottom: "4px" }}>
                                        {answer.answeredBy.firstName} {answer.answeredBy.lastName}
                                    </p>
                                    <p style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.5)" }}>
                                        Answered {new Date(answer.answeredBy.timestamp).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {showNotes && (
                    <textarea
                        value={answer.notes}
                        onChange={(e) => handleNotesChange(e.target.value)}
                        placeholder="Additional notes or observations..."
                        rows={3}
                        style={{
                            marginTop: "16px",
                            width: "100%",
                            borderRadius: "12px",
                            padding: "16px",
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.9)",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            resize: "none",
                            outline: "none",
                        }}
                    />
                )}
            </div>
        </div>
    );
}
