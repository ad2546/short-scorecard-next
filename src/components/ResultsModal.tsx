"use client";

import { SectionScore } from "@/types/scorecard";
import { useEffect, useRef, useState } from "react";

interface ResultsModalProps {
    isOpen: boolean;
    onClose: () => void;
    sectionScores: SectionScore[];
    overallAverage: number;
    onConfirm: () => void;
}

interface TooltipState {
    visible: boolean;
    x: number;
    y: number;
    text: string;
    score: string;
}

export function ResultsModal({
    isOpen,
    onClose,
    sectionScores,
    overallAverage,
    onConfirm,
}: ResultsModalProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<TooltipState>({
        visible: false,
        x: 0,
        y: 0,
        text: "",
        score: "",
    });

    // Draw radar chart
    useEffect(() => {
        if (!isOpen || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 60;
        const numSections = sectionScores.length;
        const angleStep = (2 * Math.PI) / numSections;
        const maxScore = 4;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw background circles
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1;
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius * i) / 4, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // Draw axis lines
        for (let i = 0; i < numSections; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.stroke();
        }

        // Draw data polygon
        ctx.beginPath();
        sectionScores.forEach((score, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const value = score.average / maxScore;
            const x = centerX + radius * value * Math.cos(angle);
            const y = centerY + radius * value * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        ctx.fillStyle = "rgba(249, 115, 22, 0.3)";
        ctx.fill();
        ctx.strokeStyle = "#f97316";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw data points
        sectionScores.forEach((score, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const value = score.average / maxScore;
            const x = centerX + radius * value * Math.cos(angle);
            const y = centerY + radius * value * Math.sin(angle);
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "#f97316";
            ctx.fill();
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        // Draw labels
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.font = "10px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        sectionScores.forEach((score, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = radius + 40;
            const x = centerX + labelRadius * Math.cos(angle);
            const y = centerY + labelRadius * Math.sin(angle);

            // Use section name, remove "E1: " prefix if present, and truncate
            let label = score.sectionName.replace(/^E\d+:\s*/, "");
            if (label.length > 14) {
                label = label.substring(0, 12) + "...";
            }
            ctx.fillText(label, x, y);
        });

        // Draw scale numbers
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.font = "10px Inter, system-ui, sans-serif";
        ctx.textAlign = "left";
        for (let i = 1; i <= 4; i++) {
            const y = centerY - (radius * i) / 4;
            ctx.fillText(i.toString(), centerX + 5, y);
        }
    }, [isOpen, sectionScores]);

    // Handle mouse move for tooltips
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 60;
        const numSections = sectionScores.length;
        const angleStep = (2 * Math.PI) / numSections;
        const maxScore = 4;

        // Check distance to each data point
        let closestIndex = -1;
        let closestDistance = Infinity;

        sectionScores.forEach((score, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const value = score.average / maxScore;
            const x = centerX + radius * value * Math.cos(angle);
            const y = centerY + radius * value * Math.sin(angle);
            const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

            if (distance < closestDistance && distance < 40) {
                closestDistance = distance;
                closestIndex = i;
            }
        });

        if (closestIndex >= 0) {
            const score = sectionScores[closestIndex];
            setTooltip({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                text: score.sectionName.replace(/^E\d+:\s*/, ""),
                score: score.average.toFixed(2),
            });
        } else {
            setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev);
        }
    };

    const handleMouseLeave = () => {
        setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev);
    };

    if (!isOpen) return null;

    const getSectionRange = (score: SectionScore) => {
        if (score.answered === 0) return "—";
        if (score.min === score.max) return `${score.min}`;
        return `${score.min} – ${score.max}`;
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(8px)",
                }}
            />

            {/* Modal */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "900px",
                    maxHeight: "90vh",
                    overflow: "auto",
                    background: "linear-gradient(145deg, rgba(30, 20, 15, 0.98) 0%, rgba(20, 15, 10, 0.98) 100%)",
                    border: "1px solid rgba(249, 115, 22, 0.2)",
                    borderRadius: "24px",
                    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(249, 115, 22, 0.1)",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: "24px 32px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                        <div>
                            <h2
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    color: "white",
                                    marginBottom: "4px",
                                }}
                            >
                                Review Scorecard Summary
                            </h2>
                            <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.45)" }}>
                                Review your scores before submitting
                            </p>
                        </div>
                        {/* Overall Score Badge - Inline */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "8px 16px",
                                background: "linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.05) 100%)",
                                border: "1px solid rgba(249, 115, 22, 0.25)",
                                borderRadius: "100px",
                            }}
                        >
                            <span style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255, 255, 255, 0.6)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                Score
                            </span>
                            <span
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "800",
                                    background: "linear-gradient(135deg, #f97316, #fb923c)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {overallAverage.toFixed(2)}
                            </span>
                            <span style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.35)" }}>/ 4</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "rgba(255, 255, 255, 0.6)",
                            fontSize: "18px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: "24px 32px" }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "32px",
                        }}
                    >
                        {/* Table */}
                        <div>
                            <h3
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "700",
                                    color: "rgba(255, 255, 255, 0.5)",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    marginBottom: "16px",
                                }}
                            >
                                Section Breakdown
                            </h3>
                            <div
                                style={{
                                    background: "rgba(0, 0, 0, 0.2)",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                }}
                            >
                                {/* Table Header */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "40px 1fr 80px 70px",
                                        gap: "12px",
                                        padding: "14px 16px",
                                        background: "rgba(255, 255, 255, 0.03)",
                                        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                                    }}
                                >
                                    <span style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255, 255, 255, 0.4)", textTransform: "uppercase" }}>#</span>
                                    <span style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255, 255, 255, 0.4)", textTransform: "uppercase" }}>Section</span>
                                    <span style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255, 255, 255, 0.4)", textTransform: "uppercase", textAlign: "center" }}>Average</span>
                                    <span style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255, 255, 255, 0.4)", textTransform: "uppercase", textAlign: "center" }}>Range</span>
                                </div>

                                {/* Table Rows */}
                                {sectionScores.map((score, index) => (
                                    <div
                                        key={score.section}
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "40px 1fr 80px 70px",
                                            gap: "12px",
                                            padding: "12px 16px",
                                            borderBottom: index < sectionScores.length - 1 ? "1px solid rgba(255, 255, 255, 0.04)" : "none",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "13px",
                                                fontWeight: "700",
                                                color: "#f97316",
                                            }}
                                        >
                                            {index + 1}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "13px",
                                                fontWeight: "500",
                                                color: "rgba(255, 255, 255, 0.85)",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {score.sectionName.replace(/^E\d+:\s*/, "")}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "700",
                                                color: "white",
                                                textAlign: "center",
                                            }}
                                        >
                                            {score.average.toFixed(2)}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                color: "rgba(255, 255, 255, 0.4)",
                                                textAlign: "center",
                                            }}
                                        >
                                            {getSectionRange(score)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Radar Chart */}
                        <div style={{ position: "relative" }}>
                            <h3
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "700",
                                    color: "rgba(255, 255, 255, 0.5)",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    marginBottom: "16px",
                                }}
                            >
                                Performance Radar
                            </h3>
                            <div
                                ref={containerRef}
                                style={{
                                    background: "rgba(0, 0, 0, 0.2)",
                                    borderRadius: "16px",
                                    padding: "20px",
                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                }}
                            >
                                <canvas
                                    ref={canvasRef}
                                    width={340}
                                    height={340}
                                    style={{ maxWidth: "100%", cursor: "crosshair" }}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                />
                            </div>

                            {/* Tooltip */}
                            {tooltip.visible && (
                                <div
                                    style={{
                                        position: "fixed",
                                        left: tooltip.x + 12,
                                        top: tooltip.y - 10,
                                        background: "linear-gradient(135deg, rgba(30, 20, 15, 0.98) 0%, rgba(20, 15, 10, 0.98) 100%)",
                                        border: "1px solid rgba(249, 115, 22, 0.4)",
                                        borderRadius: "10px",
                                        padding: "10px 14px",
                                        zIndex: 1100,
                                        pointerEvents: "none",
                                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                                    }}
                                >
                                    <p style={{ fontSize: "13px", fontWeight: "600", color: "white", marginBottom: "4px" }}>
                                        {tooltip.text}
                                    </p>
                                    <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
                                        Score: <span style={{ color: "#f97316", fontWeight: "700" }}>{tooltip.score}</span> / 4
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons - Below Radar Chart */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                    marginTop: "20px",
                                    width: "100%",
                                }}
                            >
                                <button
                                    onClick={onClose}
                                    style={{
                                        flex: 1,
                                        padding: "14px 24px",
                                        borderRadius: "12px",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        border: "1px solid rgba(255, 255, 255, 0.15)",
                                        color: "rgba(255, 255, 255, 0.8)",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    ← Go Back
                                </button>
                                <button
                                    onClick={onConfirm}
                                    style={{
                                        flex: 1,
                                        padding: "14px 24px",
                                        borderRadius: "12px",
                                        background: "linear-gradient(135deg, #f97316, #ea580c)",
                                        border: "none",
                                        color: "white",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        boxShadow: "0 4px 20px rgba(249, 115, 22, 0.4)",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    Confirm & Submit ✓
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
