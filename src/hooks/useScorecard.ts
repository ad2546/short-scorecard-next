"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Question, Answer, SectionScore, PersonalInfo, TeamMember, AnsweredBy } from "@/types/scorecard";
import { questions as defaultQuestions, sectionNames } from "@/data/questions";

const STORAGE_KEY = "scorecard_state_v3";
const SESSION_PREFIX = "scorecard_session_";

// Generate a hash of the current questions to detect changes
const generateQuestionsHash = () => {
    const qids = defaultQuestions.map(q => q.QID).sort().join(",");
    return `${defaultQuestions.length}_${qids}`;
};

// Generate a unique session ID
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

    // Generate shareable link
    const shareableLink = useMemo(() => {
        if (!sessionId || typeof window === "undefined") return "";
        return `${window.location.origin}/scorecard?session=${sessionId}`;
    }, [sessionId]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            // Check if joining via session ID
            if (initialSessionId) {
                const sessionKey = `${SESSION_PREFIX}${initialSessionId}`;
                const sessionData = localStorage.getItem(sessionKey);

                if (sessionData) {
                    const state: ScorecardState = JSON.parse(sessionData);
                    if (state.questionsHash === QUESTIONS_HASH) {
                        setSessionId(initialSessionId);
                        setAnswers(state.answers || getDefaultAnswers());
                        setTeamMembers(state.teamMembers || []);
                        // Store owner info for display but don't set as current user
                        setSessionOwner(`${state.personalInfo.firstName} ${state.personalInfo.lastName}`);
                        // User needs to enter their own info to join
                        setNeedsToJoin(true);
                        setHasStarted(true);
                        setIsTeamMember(true);
                        setIsHydrated(true);
                        return;
                    }
                }
            }

            // Load from regular storage
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
                        if (validQIDs.has(qid)) {
                            validAnswers[qid] = answer;
                        }
                    });

                    setAnswers(validAnswers);
                    setPersonalInfo(state.personalInfo || getDefaultPersonalInfo());
                    setTeamMembers(state.teamMembers || []);
                    setHasStarted(state.hasStarted || false);
                    setSessionId(state.sessionId || "");
                } else {
                    localStorage.removeItem(STORAGE_KEY);
                    localStorage.removeItem("scorecard_state");
                    localStorage.removeItem("scorecard_state_v2");
                    setAnswers(getDefaultAnswers());
                    setPersonalInfo(getDefaultPersonalInfo());
                    setHasStarted(false);
                }
            }
        } catch (e) {
            console.error("Failed to load saved state:", e);
            localStorage.removeItem(STORAGE_KEY);
        }

        setIsHydrated(true);
    }, [initialSessionId]);

    // Save to localStorage on every change
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

        // Save to main storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

        // Also save to session-specific storage for sharing
        const sessionKey = `${SESSION_PREFIX}${sessionId}`;
        localStorage.setItem(sessionKey, JSON.stringify(state));
    }, [answers, personalInfo, teamMembers, hasStarted, isHydrated, sessionId]);

    // Poll for updates from other users (every 3 seconds)
    useEffect(() => {
        if (!isHydrated || !sessionId || needsToJoin) return;

        const pollInterval = setInterval(() => {
            try {
                const sessionKey = `${SESSION_PREFIX}${sessionId}`;
                const sessionData = localStorage.getItem(sessionKey);

                if (sessionData) {
                    const state: ScorecardState = JSON.parse(sessionData);

                    // Check if there are new answers we don't have
                    const storedAnswers = state.answers || {};
                    let hasUpdates = false;

                    // Merge answers - keep newer timestamps
                    const mergedAnswers = { ...answers };
                    Object.entries(storedAnswers).forEach(([qid, storedAnswer]) => {
                        const currentAnswer = answers[qid];
                        const storedTimestamp = storedAnswer.answeredBy?.timestamp || 0;
                        const currentTimestamp = currentAnswer?.answeredBy?.timestamp || 0;

                        // Update if stored answer is newer
                        if (storedTimestamp > currentTimestamp) {
                            mergedAnswers[qid] = storedAnswer;
                            hasUpdates = true;
                        }
                    });

                    if (hasUpdates) {
                        setAnswers(mergedAnswers);
                    }

                    // Also update team members
                    if (state.teamMembers && state.teamMembers.length !== teamMembers.length) {
                        setTeamMembers(state.teamMembers);
                    }
                }
            } catch (e) {
                console.error("Polling error:", e);
            }
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(pollInterval);
    }, [isHydrated, sessionId, needsToJoin, answers, teamMembers]);

    const updateAnswer = useCallback((answer: Answer, currentUser?: PersonalInfo) => {
        // Add answerer info if provided
        if (currentUser && currentUser.firstName) {
            const answeredBy: AnsweredBy = {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                initials: `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`.toUpperCase(),
                timestamp: Date.now(),
            };
            answer = { ...answer, answeredBy };
        }

        setAnswers((prev) => ({
            ...prev,
            [answer.qid]: answer,
        }));
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

    const startScorecard = useCallback((info?: PersonalInfo) => {
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);
        setAnswers(getDefaultAnswers());
        if (info) {
            setPersonalInfo(info);
        }
        setTeamMembers([]);
        setHasStarted(true);
    }, []);

    // Join an existing session as a team member
    const joinSession = useCallback((memberInfo: PersonalInfo) => {
        setPersonalInfo(memberInfo);
        setNeedsToJoin(false);
        addTeamMember({
            firstName: memberInfo.firstName,
            lastName: memberInfo.lastName,
            email: memberInfo.email,
        });
    }, [addTeamMember]);

    // Group questions by section
    const groupedQuestions = useMemo(() => {
        const groups: Record<string, Question[]> = {};
        questions.forEach((q) => {
            if (!groups[q.Section]) {
                groups[q.Section] = [];
            }
            groups[q.Section].push(q);
        });
        return groups;
    }, [questions]);

    // Calculate section scores with weighted average
    const sectionScores = useMemo((): SectionScore[] => {
        const sections = Object.keys(groupedQuestions);
        return sections.map((section) => {
            const sectionQuestions = groupedQuestions[section];
            let weightedTotal = 0;
            let totalWeight = 0;
            let answered = 0;

            sectionQuestions.forEach((q) => {
                const answer = answers[q.QID];
                const weight = q.Weight || 1;
                if (answer && (typeof answer.score === "number") || answer?.score === "N/A") {
                    answered++;
                    if (typeof answer.score === "number") {
                        weightedTotal += answer.score * weight;
                        totalWeight += weight;
                    }
                }
            });

            return {
                section,
                sectionName: sectionNames[section] || section,
                average: totalWeight > 0 ? weightedTotal / totalWeight : 0,
                answered,
                total: sectionQuestions.length,
            };
        });
    }, [groupedQuestions, answers]);

    // Calculate overall stats with weighted average
    const overallStats = useMemo(() => {
        let weightedTotal = 0;
        let totalWeight = 0;
        let answeredCount = 0;

        const questionWeights: Record<string, number> = {};
        questions.forEach((q) => {
            questionWeights[q.QID] = q.Weight || 1;
        });

        Object.entries(answers).forEach(([qid, answer]) => {
            if (!questionWeights[qid]) return;

            if ((typeof answer.score === "number") || answer.score === "N/A") {
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

    const resetScorecard = useCallback(() => {
        if (sessionId) {
            const sessionKey = `${SESSION_PREFIX}${sessionId}`;
            localStorage.removeItem(sessionKey);
        }
        setAnswers(getDefaultAnswers());
        setPersonalInfo(getDefaultPersonalInfo());
        setTeamMembers([]);
        setHasStarted(false);
        setSessionId("");
        localStorage.removeItem(STORAGE_KEY);
    }, [sessionId]);

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
