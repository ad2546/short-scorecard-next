"use client";

import { useState } from "react";
import { PersonalInfo } from "@/types/scorecard";

interface JoinSessionFormProps {
    onJoin: (info: PersonalInfo) => void;
    sessionId: string;
}

export function JoinSessionForm({ onJoin, sessionId }: JoinSessionFormProps) {
    const [formData, setFormData] = useState<PersonalInfo>({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        role: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.firstName && formData.lastName) {
            onJoin(formData);
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "16px 20px",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        background: "rgba(255, 255, 255, 0.03)",
        color: "white",
        fontSize: "15px",
        outline: "none",
        transition: "all 0.2s ease",
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "480px",
                    background: "linear-gradient(145deg, rgba(30, 20, 15, 0.98) 0%, rgba(20, 15, 10, 0.98) 100%)",
                    border: "1px solid rgba(249, 115, 22, 0.2)",
                    borderRadius: "24px",
                    padding: "40px",
                    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6)",
                }}
            >
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div
                        style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "16px",
                            background: "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.1) 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 20px",
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <line x1="20" y1="8" x2="20" y2="14" />
                            <line x1="23" y1="11" x2="17" y2="11" />
                        </svg>
                    </div>
                    <h1 style={{ fontSize: "24px", fontWeight: "700", color: "white", marginBottom: "8px" }}>
                        Join Scorecard Session
                    </h1>
                    <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.5)", marginBottom: "8px" }}>
                        You've been invited to collaborate on a scorecard
                    </p>
                    <p style={{ fontSize: "12px", color: "rgba(249, 115, 22, 0.8)", fontFamily: "monospace" }}>
                        Session: {sessionId.substring(0, 20)}...
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                        <div>
                            <label style={{ display: "block", fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "8px" }}>
                                First Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                style={inputStyle}
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "8px" }}>
                                Last Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                style={inputStyle}
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "8px" }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={inputStyle}
                            placeholder="john@example.com"
                        />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "8px" }}>
                            Role
                        </label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            style={inputStyle}
                            placeholder="e.g., Risk Analyst, Manager"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!formData.firstName || !formData.lastName}
                        style={{
                            width: "100%",
                            padding: "18px",
                            marginTop: "16px",
                            borderRadius: "14px",
                            border: "none",
                            background: formData.firstName && formData.lastName
                                ? "linear-gradient(135deg, #f97316, #ea580c)"
                                : "rgba(255, 255, 255, 0.1)",
                            color: formData.firstName && formData.lastName ? "white" : "rgba(255, 255, 255, 0.3)",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: formData.firstName && formData.lastName ? "pointer" : "not-allowed",
                            boxShadow: formData.firstName && formData.lastName
                                ? "0 8px 32px rgba(249, 115, 22, 0.3)"
                                : "none",
                            transition: "all 0.3s ease",
                        }}
                    >
                        Join & Start Contributing →
                    </button>
                </form>

                <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.4)", textAlign: "center", marginTop: "20px" }}>
                    Your name will appear on questions you answer
                </p>
            </div>
        </div>
    );
}
