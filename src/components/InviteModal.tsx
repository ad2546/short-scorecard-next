"use client";

import { useState } from "react";

interface InviteModalProps {
    isOpen: boolean;
    onClose: () => void;
    shareableLink: string;
}

export function InviteModal({ isOpen, onClose, shareableLink }: InviteModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareableLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    if (!isOpen) return null;

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
                    maxWidth: "500px",
                    background: "linear-gradient(145deg, rgba(30, 20, 15, 0.98) 0%, rgba(20, 15, 10, 0.98) 100%)",
                    border: "1px solid rgba(249, 115, 22, 0.2)",
                    borderRadius: "20px",
                    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(249, 115, 22, 0.1)",
                    padding: "32px",
                }}
            >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                            style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.1) 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <line x1="20" y1="8" x2="20" y2="14" />
                                <line x1="23" y1="11" x2="17" y2="11" />
                            </svg>
                        </div>
                        <div>
                            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "white", marginBottom: "2px" }}>
                                Invite Team Members
                            </h2>
                            <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.5)" }}>
                                Share this link with your team
                            </p>
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

                {/* Description */}
                <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6, marginBottom: "20px" }}>
                    Team members who join via this link can answer questions on this scorecard. Their name will appear on questions they answer.
                </p>

                {/* Link Box */}
                <div
                    style={{
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                        padding: "16px",
                        marginBottom: "20px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                            style={{
                                flex: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                fontSize: "13px",
                                fontFamily: "monospace",
                                color: "rgba(255, 255, 255, 0.8)",
                            }}
                        >
                            {shareableLink}
                        </div>
                        <button
                            onClick={handleCopy}
                            style={{
                                padding: "10px 20px",
                                borderRadius: "10px",
                                background: copied
                                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                                    : "linear-gradient(135deg, #f97316, #ea580c)",
                                border: "none",
                                color: "white",
                                fontSize: "13px",
                                fontWeight: "600",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                transition: "all 0.2s ease",
                                minWidth: "100px",
                                justifyContent: "center",
                            }}
                        >
                            {copied ? (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        padding: "14px",
                        background: "rgba(249, 115, 22, 0.08)",
                        border: "1px solid rgba(249, 115, 22, 0.15)",
                        borderRadius: "10px",
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                    </svg>
                    <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.5 }}>
                        This link is permanent and will work forever. Anyone with the link can view and contribute to this scorecard.
                    </p>
                </div>
            </div>
        </div>
    );
}
