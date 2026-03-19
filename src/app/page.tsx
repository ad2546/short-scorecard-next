"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useScorecard } from "@/hooks/useScorecard";

export default function HomePage() {
  const router = useRouter();
  const {
    personalInfo,
    updatePersonalInfo,
    startScorecard,
    hasStarted,
    isHydrated,
  } = useScorecard();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    if (isHydrated && hasStarted) {
      router.push("/scorecard");
    }
  }, [isHydrated, hasStarted, router]);

  useEffect(() => {
    if (isHydrated) {
      setTimeout(() => setIsLoaded(true), 100);
    }
  }, [isHydrated]);

  if (isHydrated && hasStarted) {
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!personalInfo.firstName.trim()) newErrors.firstName = "Required";
    if (!personalInfo.lastName.trim()) newErrors.lastName = "Required";
    if (!personalInfo.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      newErrors.email = "Invalid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsStarting(true);
    try {
      await startScorecard();
      router.push("/scorecard");
    } catch {
      // startScorecard is non-fatal — localStorage is written before any network call
      // so we still navigate even if MongoDB fails
      router.push("/scorecard");
    } finally {
      setIsStarting(false);
    }
  };

  if (!isHydrated) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid #f97316", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  const inputStyle = (field: string, hasError: boolean) => ({
    width: "100%",
    padding: "18px 20px",
    fontSize: "15px",
    color: "white",
    background: focusedField === field ? "rgba(249,115,22,0.08)" : "rgba(255,255,255,0.03)",
    border: hasError
      ? "2px solid #ef4444"
      : focusedField === field
        ? "2px solid rgba(249,115,22,0.5)"
        : "2px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    outline: "none",
    transition: "all 0.3s ease",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#000", position: "relative", overflow: "hidden" }}>
      {/* Animated Background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* Large gradient orb - top right */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 60%)",
            filter: "blur(60px)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
        {/* Medium gradient orb - bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,146,60,0.2) 0%, transparent 60%)",
            filter: "blur(60px)",
            animation: "pulse 10s ease-in-out infinite reverse",
          }}
        />
        {/* Small accent orb */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "30%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 10,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}>
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h1 style={{ fontSize: "48px", fontWeight: "800", marginBottom: "12px", letterSpacing: "-1px" }}>
              <span style={{ color: "#f97316" }}>Short</span>
              <span style={{ color: "white" }}>Scorecard</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", marginBottom: "20px" }}>
              Wildfire Resilience Assessment Tool
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Progress auto-saves locally</span>
            </div>
          </div>

          {/* Form Card */}
          <div
            style={{
              padding: "40px",
              borderRadius: "24px",
              background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "700", color: "white", marginBottom: "8px" }}>
                Get Started
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                Enter your details to begin the assessment
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Name Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John"
                    style={inputStyle("firstName", !!errors.firstName)}
                  />
                  {errors.firstName && <p style={{ fontSize: "11px", color: "#ef4444", marginTop: "6px" }}>{errors.firstName}</p>}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Doe"
                    style={inputStyle("lastName", !!errors.lastName)}
                  />
                  {errors.lastName && <p style={{ fontSize: "11px", color: "#ef4444", marginTop: "6px" }}>{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@example.com"
                  style={inputStyle("email", !!errors.email)}
                />
                {errors.email && <p style={{ fontSize: "11px", color: "#ef4444", marginTop: "6px" }}>{errors.email}</p>}
              </div>

              {/* Organization */}
              <div style={{ marginBottom: "32px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                  Organization <span style={{ color: "rgba(255,255,255,0.2)" }}>(Optional)</span>
                </label>
                <input
                  type="text"
                  value={personalInfo.organization}
                  onChange={(e) => updatePersonalInfo({ organization: e.target.value })}
                  onFocus={() => setFocusedField("org")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your organization"
                  style={inputStyle("org", false)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isStarting}
                style={{
                  width: "100%",
                  padding: "20px",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "white",
                  background: isStarting ? "rgba(249,115,22,0.6)" : "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  border: "none",
                  borderRadius: "14px",
                  cursor: isStarting ? "not-allowed" : "pointer",
                  boxShadow: "0 10px 40px rgba(249,115,22,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 14px 50px rgba(249,115,22,0.5), inset 0 1px 0 rgba(255,255,255,0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 40px rgba(249,115,22,0.4), inset 0 1px 0 rgba(255,255,255,0.2)";
                }}
              >
                {isStarting ? (
                  <>
                    <span style={{ width: "18px", height: "18px", border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    Starting...
                  </>
                ) : (
                  <>
                    Start Scorecard
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p style={{ textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "24px" }}>
            Your data stays on your device • No account required
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder {
          color: rgba(255,255,255,0.25);
        }
      `}</style>
    </div>
  );
}
