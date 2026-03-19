"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Question, Answer, SectionScore, PersonalInfo, TeamMember, AnsweredBy } from "@/types/scorecard";
import { questions as defaultQuestions, sectionNames } from "@/data/questions";

const STORAGE_KEY = "scorecard_state_v3";

const generateQuestionsHash = () => {
    const qids = defaultQuestions.map(q => q.QID).sort().join(",");
    return `${defaultQuestions.length}_${qids}`;
};

const generateSessionId = () => {
    return `sc_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
};

const QUESTIONS_HASH = generateQuestionsHash();

interface ScorecardState {
    version: string;
    questionsHash: string;
    sessionId: string;
    answers: Record<string, Answer>;
    personalInfo: PersonalInfo;
    teamMembers: TeamMember[];
    hasStarted: boolean;
    createdAt: number;
}

const getDefaultPersonalInfo = (): PersonalInfo => ({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    role: "",
});

const getDefaultAnswers = (): Record<string, Answer> => {
    const answers: Record<string, Answer> = {};
    defaultQuestions.forEach((q) => {
        answers[q.QID] = { qid: q.QID, score: null, notes: "" };
    });
    return answers;
};

// ── API helpers ──────────────────────────────────────────────────────────────

async function apiCreateSession(payload: {
    sessionId: string;
    personalInfo: PersonalInfo;
    answers: Record<string, Answer>;
    questionsHash: string;
}) {
    await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}

async function apiGetSession(id: string): Promise<ScorecardState | null> {
    const res = await fetch(`/api/sessions/${id}`);
    if (!res.ok) return null;
    return res.json();
}

async function apiUpdateSession(id: string, data: Partial<ScorecardState>) {
    await fetch(`/api/sessions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useScorecard(initialSessionId?: string) {
    const [questions] = useState<Question[]>(defaultQuestions);
    const [answers, setAnswers] = useState<Record<string, Answer>>(getDefaultAnswers);
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(getDefaultPersonalInfo);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [hasStarted, setHasStarted] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const [sessionId, setSessionId] = useState<string>("");
    const [isTeamMember, setIsTeamMember] = useState(false);
    const [needsToJoin, setNeedsToJoin] = useState(false);
    const [sessionOwner, setSessionOwner] = useState<string>("");

    // Debounce ref: avoid saving on every keystroke
    const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const shareableLink = useMemo(() => {
        if (!sessionId || typeof window === "undefined") return "";
        return `${window.location.origin}/scorecard?session=${sessionId}`;
    }, [sessionId]);

    // ── Load on mount ─────────────────────────────────────────────────────────
    useEffect(() => {
        async function load() {
            try {
                // Joining via shared session link
                if (initialSessionId) {
                    const state = await apiGetSession(initialSessionId);
                    if (state && state.questionsHash === QUESTIONS_HASH) {
                        setSessionId(initialSessionId);
                        setAnswers(state.answers || getDefaultAnswers());
                        setTeamMembers(state.teamMembers || []);
                        setSessionOwner(
                            `${state.personalInfo.firstName} ${state.personalInfo.lastName}`
                        );
                        setNeedsToJoin(true);
                        setHasStarted(true);
                        setIsTeamMember(true);
                        setIsHydrated(true);
                        return;
                    }
                }

                // Load from localStorage
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const state: ScorecardState = JSON.parse(saved);
                    if (state.questionsHash === QUESTIONS_HASH && state.version === "3") {
                        const validQIDs = new Set(defaultQuestions.map(q => q.QID));
                        const validAnswers: Record<string, Answer> = {};
                        defaultQuestions.forEach((q) => {
                            validAnswers[q.QID] = { qid: q.QID, score: null, notes: "" };
                        });
                        Object.entries(state.answers || {}).forEach(([qid, answer]) => {
                            if (validQIDs.has(qid)) validAnswers[qid] = answer;
                        });

                        setAnswers(validAnswers);
                        setPersonalInfo(state.personalInfo || getDefaultPersonalInfo());
                        setTeamMembers(state.teamMembers || []);
                        setHasStarted(state.hasStarted || false);
                        setSessionId(state.sessionId || "");
                    } else {
                        localStorage.removeItem(STORAGE_KEY);
                    }
                }
            } catch (e) {
                console.error("Failed to load saved state:", e);
                localStorage.removeItem(STORAGE_KEY);
            }
            setIsHydrated(true);
        }
        load();
    }, [initialSessionId]);

    // ── Save to localStorage + MongoDB (debounced 800ms) ─────────────────────
    useEffect(() => {
        if (!isHydrated || !sessionId) return;

        const state: ScorecardState = {
            version: "3",
            questionsHash: QUESTIONS_HASH,
            sessionId,
            answers,
            personalInfo,
            teamMembers,
            hasStarted,
            createdAt: Date.now(),
        };

        // Always keep localStorage in sync as an offline cache
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

        // Debounce the network write
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
            apiUpdateSession(sessionId, { answers, teamMembers, personalInfo });
        }, 800);

        return () => {
            if (saveTimer.current) clearTimeout(saveTimer.current);
        };
    }, [answers, personalInfo, teamMembers, hasStarted, isHydrated, sessionId]);

    // ── Poll MongoDB every 3 seconds for collaborator updates ────────────────
    useEffect(() => {
        if (!isHydrated || !sessionId || needsToJoin) return;

        const pollInterval = setInterval(async () => {
            try {
                const state = await apiGetSession(sessionId);
                if (!state) return;

                const storedAnswers = state.answers || {};
                let hasUpdates = false;
                const mergedAnswers = { ...answers };

                Object.entries(storedAnswers).forEach(([qid, storedAnswer]) => {
                    const currentAnswer = answers[qid];
                    const storedTs = storedAnswer.answeredBy?.timestamp || 0;
                    const currentTs = currentAnswer?.answeredBy?.timestamp || 0;
                    if (storedTs > currentTs) {
                        mergedAnswers[qid] = storedAnswer;
                        hasUpdates = true;
                    }
                });

                if (hasUpdates) setAnswers(mergedAnswers);

                if (state.teamMembers && state.teamMembers.length !== teamMembers.length) {
                    setTeamMembers(state.teamMembers);
                }
            } catch (e) {
                console.error("Polling error:", e);
            }
        }, 3000);

        return () => clearInterval(pollInterval);
    }, [isHydrated, sessionId, needsToJoin, answers, teamMembers]);

    // ── Actions ───────────────────────────────────────────────────────────────

    const updateAnswer = useCallback((answer: Answer, currentUser?: PersonalInfo) => {
        if (currentUser?.firstName) {
            const answeredBy: AnsweredBy = {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                initials: `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`.toUpperCase(),
                timestamp: Date.now(),
            };
            answer = { ...answer, answeredBy };
        }
        setAnswers((prev) => ({ ...prev, [answer.qid]: answer }));
    }, []);

    const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
        setPersonalInfo((prev) => ({ ...prev, ...info }));
    }, []);

    const addTeamMember = useCallback((member: Omit<TeamMember, "initials" | "joinedAt">) => {
        const newMember: TeamMember = {
            ...member,
            initials: `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`.toUpperCase(),
            joinedAt: Date.now(),
        };
        setTeamMembers((prev) => [...prev, newMember]);
    }, []);

    const startScorecard = useCallback(async (info?: PersonalInfo) => {
        const newSessionId = generateSessionId();
        const defaultAnswers = getDefaultAnswers();
        const newPersonalInfo = info || personalInfo;

        setSessionId(newSessionId);
        setAnswers(defaultAnswers);
        if (info) setPersonalInfo(info);
        setTeamMembers([]);
        setHasStarted(true);

        // Create session in MongoDB
        await apiCreateSession({
            sessionId: newSessionId,
            personalInfo: newPersonalInfo,
            answers: defaultAnswers,
            questionsHash: QUESTIONS_HASH,
        });
    }, [personalInfo]);

    const joinSession = useCallback((memberInfo: PersonalInfo) => {
        setPersonalInfo(memberInfo);
        setNeedsToJoin(false);
        addTeamMember({
            firstName: memberInfo.firstName,
            lastName: memberInfo.lastName,
            email: memberInfo.email,
        });
    }, [addTeamMember]);

    const resetScorecard = useCallback(() => {
        setAnswers(getDefaultAnswers());
        setPersonalInfo(getDefaultPersonalInfo());
        setTeamMembers([]);
        setHasStarted(false);
        setSessionId("");
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    // ── Derived state ─────────────────────────────────────────────────────────

    const groupedQuestions = useMemo(() => {
        const groups: Record<string, Question[]> = {};
        questions.forEach((q) => {
            if (!groups[q.Section]) groups[q.Section] = [];
            groups[q.Section].push(q);
        });
        return groups;
    }, [questions]);

    const sectionScores = useMemo((): SectionScore[] => {
        return Object.keys(groupedQuestions).map((section) => {
            const sectionQuestions = groupedQuestions[section];
            let weightedTotal = 0;
            let totalWeight = 0;
            let answered = 0;
            let min = Infinity;
            let max = -Infinity;

            sectionQuestions.forEach((q) => {
                const answer = answers[q.QID];
                const weight = q.Weight || 1;
                const isAnswered =
                    answer && (typeof answer.score === "number" || answer.score === "N/A");

                if (isAnswered) {
                    answered++;
                    if (typeof answer.score === "number") {
                        weightedTotal += answer.score * weight;
                        totalWeight += weight;
                        if (answer.score < min) min = answer.score;
                        if (answer.score > max) max = answer.score;
                    }
                }
            });

            return {
                section,
                sectionName: sectionNames[section] || section,
                average: totalWeight > 0 ? weightedTotal / totalWeight : 0,
                answered,
                total: sectionQuestions.length,
                min: min === Infinity ? 0 : min,
                max: max === -Infinity ? 0 : max,
            };
        });
    }, [groupedQuestions, answers]);

    const overallStats = useMemo(() => {
        let weightedTotal = 0;
        let totalWeight = 0;
        let answeredCount = 0;

        const questionWeights: Record<string, number> = {};
        questions.forEach((q) => { questionWeights[q.QID] = q.Weight || 1; });

        Object.entries(answers).forEach(([qid, answer]) => {
            if (!questionWeights[qid]) return;
            if (typeof answer.score === "number" || answer.score === "N/A") {
                answeredCount++;
                if (typeof answer.score === "number") {
                    const weight = questionWeights[qid] || 1;
                    weightedTotal += answer.score * weight;
                    totalWeight += weight;
                }
            }
        });

        return {
            average: totalWeight > 0 ? weightedTotal / totalWeight : 0,
            answered: answeredCount,
            total: questions.length,
            progress: questions.length > 0 ? (answeredCount / questions.length) * 100 : 0,
        };
    }, [answers, questions]);

    return {
        questions,
        answers,
        personalInfo,
        teamMembers,
        hasStarted,
        isHydrated,
        sessionId,
        shareableLink,
        isTeamMember,
        needsToJoin,
        sessionOwner,
        groupedQuestions,
        sectionScores,
        overallStats,
        updateAnswer,
        updatePersonalInfo,
        addTeamMember,
        startScorecard,
        joinSession,
        resetScorecard,
    };
}
