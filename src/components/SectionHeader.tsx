"use client";

interface SectionHeaderProps {
    section: string;
    sectionName: string;
    answered: number;
    total: number;
    average: number;
}

export function SectionHeader({
    sectionName,
    answered,
    total,
    average,
}: SectionHeaderProps) {
    const progress = total > 0 ? (answered / total) * 100 : 0;
    const isComplete = answered === total && total > 0;

    return (
        <div
            className="sticky top-[73px] z-10 py-4"
            id={sectionName.replace(/\s+/g, "-")}
            style={{ background: "linear-gradient(180deg, #000 80%, transparent 100%)" }}
        >
            <div
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
            >
                {/* Background Glow */}
                {isComplete && (
                    <div
                        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30"
                        style={{
                            background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
                        }}
                    />
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-white">{sectionName}</h2>
                        {isComplete && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                                <svg
                                    className="w-3.5 h-3.5 text-emerald-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-xs font-semibold text-emerald-400">
                                    Complete
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-white/40">Progress:</span>
                            <span className="text-white font-semibold">
                                {answered}
                                <span className="text-white/40">/{total}</span>
                            </span>
                        </div>
                        {answered > 0 && (
                            <div
                                className="px-4 py-1.5 rounded-full text-sm font-bold"
                                style={{
                                    background: "linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.1) 100%)",
                                    border: "1px solid rgba(249,115,22,0.3)",
                                    color: "#fb923c",
                                }}
                            >
                                Avg: {average.toFixed(1)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-1.5 rounded-full overflow-hidden bg-white/[0.05]">
                    <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                            width: `${progress}%`,
                            background: isComplete
                                ? "linear-gradient(90deg, #10b981, #34d399)"
                                : "linear-gradient(90deg, #f97316, #fb923c, #fdba74)",
                            boxShadow: isComplete
                                ? "0 0 12px rgba(16,185,129,0.5)"
                                : "0 0 12px rgba(249,115,22,0.5)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
