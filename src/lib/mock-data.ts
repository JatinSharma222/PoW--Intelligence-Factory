import { Session, TaskType, Environment, SessionStatus, QualityFlag, DailyMetric, TaskTypeMetric, CoverageCell, CoverageGap } from "./types";

export const TASK_TYPES: TaskType[] = [
  "Pick and Place",
  "Bin Sorting",
  "Shelf Stocking",
  "Box Packing",
  "Item Sorting",
];

export const ENVIRONMENTS: Environment[] = [
  "Warehouse A",
  "Warehouse B",
  "Grocery Pilot Site 1",
  "Grocery Pilot Site 2",
];

export const MOCK_SESSIONS: Session[] = [
  { id: "SES-1064", operator: "Marcus Vance", taskType: "Pick and Place", environment: "Warehouse A", durationMinutes: 60, status: "Recording", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-30T15:20:00Z", gloveDeviceIds: ["GLV-L-014", "GLV-R-014"] },
  { id: "SES-1063", operator: "Elena Rostova", taskType: "Shelf Stocking", environment: "Warehouse A", durationMinutes: 60, status: "Recording", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-30T14:45:00Z", gloveDeviceIds: ["GLV-L-008", "GLV-R-008"] },
  { id: "SES-1062", operator: "David Chen", taskType: "Pick and Place", environment: "Warehouse B", durationMinutes: 60, status: "Pending Review", qualityFlag: "Needs Review", taskSuccess: true, recordedAt: "2026-07-30T13:10:00Z", gloveDeviceIds: ["GLV-L-022", "GLV-R-022"], reviewerNotes: "Minor trajectory jitter on right wrist sensor near minute 42." },
  { id: "SES-1061", operator: "Sarah Jenkins", taskType: "Bin Sorting", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-30T11:30:00Z", gloveDeviceIds: ["GLV-L-003", "GLV-R-003"], reviewerNotes: "High tactile fidelity across all sorting cycles." },
  { id: "SES-1060", operator: "Tariq Ahmad", taskType: "Shelf Stocking", environment: "Warehouse B", durationMinutes: 60, status: "Pending Review", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-30T10:15:00Z", gloveDeviceIds: ["GLV-L-019", "GLV-R-019"] },
  { id: "SES-1059", operator: "Maya Lin", taskType: "Pick and Place", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-29T16:40:00Z", gloveDeviceIds: ["GLV-L-011", "GLV-R-011"] },
  { id: "SES-1058", operator: "Alex Rivera", taskType: "Bin Sorting", environment: "Warehouse B", durationMinutes: 60, status: "Rejected", qualityFlag: "Corrupted Frame Detected", taskSuccess: false, recordedAt: "2026-07-29T14:20:00Z", gloveDeviceIds: ["GLV-L-005", "GLV-R-005"], reviewerNotes: "Left glove IMU dropped frames." },
  { id: "SES-1057", operator: "Chloe Bennett", taskType: "Shelf Stocking", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-29T11:00:00Z", gloveDeviceIds: ["GLV-L-027", "GLV-R-027"] },
  { id: "SES-1056", operator: "Samira Khan", taskType: "Box Packing", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-29T09:30:00Z", gloveDeviceIds: ["GLV-L-002", "GLV-R-002"] },
  { id: "SES-1055", operator: "Liam O'Connor", taskType: "Item Sorting", environment: "Grocery Pilot Site 2", durationMinutes: 60, status: "Discarded", qualityFlag: "Corrupted Frame Detected", taskSuccess: false, recordedAt: "2026-07-28T17:15:00Z", gloveDeviceIds: ["GLV-L-015", "GLV-R-015"] },

  { id: "SES-1054", operator: "Nina Patel", taskType: "Pick and Place", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-28T15:00:00Z", gloveDeviceIds: ["GLV-L-009", "GLV-R-009"] },
  { id: "SES-1053", operator: "Victor Dubois", taskType: "Bin Sorting", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-28T13:40:00Z", gloveDeviceIds: ["GLV-L-018", "GLV-R-018"] },
  { id: "SES-1052", operator: "Marcus Vance", taskType: "Shelf Stocking", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-28T10:30:00Z", gloveDeviceIds: ["GLV-L-014", "GLV-R-014"] },
  { id: "SES-1051", operator: "Elena Rostova", taskType: "Box Packing", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-27T16:10:00Z", gloveDeviceIds: ["GLV-L-008", "GLV-R-008"] },
  { id: "SES-1050", operator: "David Chen", taskType: "Item Sorting", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-27T14:00:00Z", gloveDeviceIds: ["GLV-L-022", "GLV-R-022"] },
  { id: "SES-1049", operator: "Sarah Jenkins", taskType: "Pick and Place", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-27T11:20:00Z", gloveDeviceIds: ["GLV-L-003", "GLV-R-003"] },
  { id: "SES-1048", operator: "Tariq Ahmad", taskType: "Bin Sorting", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-27T09:15:00Z", gloveDeviceIds: ["GLV-L-019", "GLV-R-019"] },
  { id: "SES-1047", operator: "Maya Lin", taskType: "Shelf Stocking", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-26T15:45:00Z", gloveDeviceIds: ["GLV-L-011", "GLV-R-011"] },
  { id: "SES-1046", operator: "Alex Rivera", taskType: "Pick and Place", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-26T13:30:00Z", gloveDeviceIds: ["GLV-L-005", "GLV-R-005"] },
  { id: "SES-1045", operator: "Chloe Bennett", taskType: "Shelf Stocking", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-26T10:00:00Z", gloveDeviceIds: ["GLV-L-027", "GLV-R-027"] },

  { id: "SES-1044", operator: "Samira Khan", taskType: "Pick and Place", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-25T16:20:00Z", gloveDeviceIds: ["GLV-L-002", "GLV-R-002"] },
  { id: "SES-1043", operator: "Liam O'Connor", taskType: "Bin Sorting", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-25T14:10:00Z", gloveDeviceIds: ["GLV-L-015", "GLV-R-015"] },
  { id: "SES-1042", operator: "Nina Patel", taskType: "Box Packing", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-25T11:45:00Z", gloveDeviceIds: ["GLV-L-009", "GLV-R-009"] },
  { id: "SES-1041", operator: "Victor Dubois", taskType: "Item Sorting", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-24T15:30:00Z", gloveDeviceIds: ["GLV-L-018", "GLV-R-018"] },
  { id: "SES-1040", operator: "Marcus Vance", taskType: "Pick and Place", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-24T13:00:00Z", gloveDeviceIds: ["GLV-L-014", "GLV-R-014"] },
  { id: "SES-1039", operator: "Elena Rostova", taskType: "Shelf Stocking", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-24T10:15:00Z", gloveDeviceIds: ["GLV-L-008", "GLV-R-008"] },
  { id: "SES-1038", operator: "David Chen", taskType: "Bin Sorting", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-23T16:00:00Z", gloveDeviceIds: ["GLV-L-022", "GLV-R-022"] },
  { id: "SES-1037", operator: "Sarah Jenkins", taskType: "Box Packing", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-23T13:40:00Z", gloveDeviceIds: ["GLV-L-003", "GLV-R-003"] },
  { id: "SES-1036", operator: "Tariq Ahmad", taskType: "Item Sorting", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-23T11:10:00Z", gloveDeviceIds: ["GLV-L-019", "GLV-R-019"] },
  { id: "SES-1035", operator: "Maya Lin", taskType: "Pick and Place", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-22T15:20:00Z", gloveDeviceIds: ["GLV-L-011", "GLV-R-011"] },

  { id: "SES-1034", operator: "Alex Rivera", taskType: "Shelf Stocking", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-22T13:00:00Z", gloveDeviceIds: ["GLV-L-005", "GLV-R-005"] },
  { id: "SES-1033", operator: "Chloe Bennett", taskType: "Bin Sorting", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-22T10:30:00Z", gloveDeviceIds: ["GLV-L-027", "GLV-R-027"] },
  { id: "SES-1032", operator: "Samira Khan", taskType: "Box Packing", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-21T16:00:00Z", gloveDeviceIds: ["GLV-L-002", "GLV-R-002"] },
  { id: "SES-1031", operator: "Liam O'Connor", taskType: "Item Sorting", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-21T14:15:00Z", gloveDeviceIds: ["GLV-L-015", "GLV-R-015"] },
  { id: "SES-1030", operator: "Nina Patel", taskType: "Pick and Place", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-21T11:00:00Z", gloveDeviceIds: ["GLV-L-009", "GLV-R-009"] },
  { id: "SES-1029", operator: "Victor Dubois", taskType: "Bin Sorting", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-20T15:10:00Z", gloveDeviceIds: ["GLV-L-018", "GLV-R-018"] },
  { id: "SES-1028", operator: "Marcus Vance", taskType: "Shelf Stocking", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-20T13:00:00Z", gloveDeviceIds: ["GLV-L-014", "GLV-R-014"] },
  { id: "SES-1027", operator: "Elena Rostova", taskType: "Box Packing", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-20T10:20:00Z", gloveDeviceIds: ["GLV-L-008", "GLV-R-008"] },
  { id: "SES-1026", operator: "David Chen", taskType: "Item Sorting", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-19T16:00:00Z", gloveDeviceIds: ["GLV-L-022", "GLV-R-022"] },
  { id: "SES-1025", operator: "Sarah Jenkins", taskType: "Pick and Place", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-19T13:30:00Z", gloveDeviceIds: ["GLV-L-003", "GLV-R-003"] },

  { id: "SES-1024", operator: "Tariq Ahmad", taskType: "Bin Sorting", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-18T15:40:00Z", gloveDeviceIds: ["GLV-L-019", "GLV-R-019"] },
  { id: "SES-1023", operator: "Maya Lin", taskType: "Shelf Stocking", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-18T13:10:00Z", gloveDeviceIds: ["GLV-L-011", "GLV-R-011"] },
  { id: "SES-1022", operator: "Alex Rivera", taskType: "Box Packing", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-17T16:15:00Z", gloveDeviceIds: ["GLV-L-005", "GLV-R-005"] },
  { id: "SES-1021", operator: "Chloe Bennett", taskType: "Item Sorting", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-17T14:00:00Z", gloveDeviceIds: ["GLV-L-027", "GLV-R-027"] },
  { id: "SES-1020", operator: "Samira Khan", taskType: "Pick and Place", environment: "Grocery Pilot Site 1", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-16T15:00:00Z", gloveDeviceIds: ["GLV-L-002", "GLV-R-002"] },
  { id: "SES-1019", operator: "Liam O'Connor", taskType: "Pick and Place", environment: "Grocery Pilot Site 1", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-16T12:30:00Z", gloveDeviceIds: ["GLV-L-015", "GLV-R-015"] },
  { id: "SES-1018", operator: "Nina Patel", taskType: "Pick and Place", environment: "Grocery Pilot Site 1", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-15T16:20:00Z", gloveDeviceIds: ["GLV-L-009", "GLV-R-009"] },
  { id: "SES-1017", operator: "Victor Dubois", taskType: "Shelf Stocking", environment: "Grocery Pilot Site 1", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-15T13:45:00Z", gloveDeviceIds: ["GLV-L-018", "GLV-R-018"] },
  { id: "SES-1016", operator: "Marcus Vance", taskType: "Shelf Stocking", environment: "Grocery Pilot Site 1", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-14T15:10:00Z", gloveDeviceIds: ["GLV-L-014", "GLV-R-014"] },
  { id: "SES-1015", operator: "Elena Rostova", taskType: "Bin Sorting", environment: "Grocery Pilot Site 1", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-14T11:30:00Z", gloveDeviceIds: ["GLV-L-008", "GLV-R-008"] },

  { id: "SES-1014", operator: "David Chen", taskType: "Box Packing", environment: "Grocery Pilot Site 1", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-13T16:00:00Z", gloveDeviceIds: ["GLV-L-022", "GLV-R-022"] },
  { id: "SES-1013", operator: "Sarah Jenkins", taskType: "Item Sorting", environment: "Grocery Pilot Site 1", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-13T13:20:00Z", gloveDeviceIds: ["GLV-L-003", "GLV-R-003"] },
  { id: "SES-1012", operator: "Tariq Ahmad", taskType: "Pick and Place", environment: "Grocery Pilot Site 2", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-12T15:40:00Z", gloveDeviceIds: ["GLV-L-019", "GLV-R-019"] },
  { id: "SES-1011", operator: "Maya Lin", taskType: "Pick and Place", environment: "Grocery Pilot Site 2", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-12T13:10:00Z", gloveDeviceIds: ["GLV-L-011", "GLV-R-011"] },
  { id: "SES-1010", operator: "Alex Rivera", taskType: "Pick and Place", environment: "Grocery Pilot Site 2", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-11T16:15:00Z", gloveDeviceIds: ["GLV-L-005", "GLV-R-005"] },
  { id: "SES-1009", operator: "Chloe Bennett", taskType: "Shelf Stocking", environment: "Grocery Pilot Site 2", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-11T14:00:00Z", gloveDeviceIds: ["GLV-L-027", "GLV-R-027"] },
  { id: "SES-1008", operator: "Samira Khan", taskType: "Shelf Stocking", environment: "Grocery Pilot Site 2", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-10T15:00:00Z", gloveDeviceIds: ["GLV-L-002", "GLV-R-002"] },
  { id: "SES-1007", operator: "Liam O'Connor", taskType: "Bin Sorting", environment: "Grocery Pilot Site 2", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-10T12:30:00Z", gloveDeviceIds: ["GLV-L-015", "GLV-R-015"] },
  { id: "SES-1006", operator: "Nina Patel", taskType: "Box Packing", environment: "Grocery Pilot Site 2", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-09T16:20:00Z", gloveDeviceIds: ["GLV-L-009", "GLV-R-009"] },
  { id: "SES-1005", operator: "Victor Dubois", taskType: "Item Sorting", environment: "Grocery Pilot Site 2", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-09T13:45:00Z", gloveDeviceIds: ["GLV-L-018", "GLV-R-018"] },

  { id: "SES-1004", operator: "Marcus Vance", taskType: "Pick and Place", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-08T15:10:00Z", gloveDeviceIds: ["GLV-L-014", "GLV-R-014"] },
  { id: "SES-1003", operator: "Elena Rostova", taskType: "Shelf Stocking", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-08T11:30:00Z", gloveDeviceIds: ["GLV-L-008", "GLV-R-008"] },
  { id: "SES-1002", operator: "David Chen", taskType: "Bin Sorting", environment: "Warehouse A", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-07T16:00:00Z", gloveDeviceIds: ["GLV-L-022", "GLV-R-022"] },
  { id: "SES-1001", operator: "Sarah Jenkins", taskType: "Pick and Place", environment: "Warehouse B", durationMinutes: 60, status: "Approved", qualityFlag: "Good", taskSuccess: true, recordedAt: "2026-07-07T13:20:00Z", gloveDeviceIds: ["GLV-L-003", "GLV-R-003"] }
];

export function formatDateString(isoString: string): string {
  const d = new Date(isoString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getUTCMonth()];
  const day = d.getUTCDate();
  let hours = d.getUTCHours();
  const minutes = d.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = hours.toString().padStart(2, "0");
  return `${month} ${day}, ${hoursStr}:${minutes} ${ampm}`;
}

const BASELINE_HOURS: Record<string, number> = {
  "Pick and Place::Warehouse A": 32.5,
  "Bin Sorting::Warehouse A": 31.0,
  "Shelf Stocking::Warehouse A": 36.5,
  "Box Packing::Warehouse A": 23.0,
  "Item Sorting::Warehouse A": 19.5,

  "Pick and Place::Warehouse B": 30.5,
  "Bin Sorting::Warehouse B": 21.5,
  "Shelf Stocking::Warehouse B": 26.0,
  "Box Packing::Warehouse B": 17.0,
  "Item Sorting::Warehouse B": 15.5,

  "Pick and Place::Grocery Pilot Site 1": 17.5,
  "Bin Sorting::Grocery Pilot Site 1": 11.0,
  "Shelf Stocking::Grocery Pilot Site 1": 12.5,
  "Box Packing::Grocery Pilot Site 1": 8.5,
  "Item Sorting::Grocery Pilot Site 1": 5.5,

  "Pick and Place::Grocery Pilot Site 2": 14.0,
  "Bin Sorting::Grocery Pilot Site 2": 8.0,
  "Shelf Stocking::Grocery Pilot Site 2": 11.5,
  "Box Packing::Grocery Pilot Site 2": 6.0,
  "Item Sorting::Grocery Pilot Site 2": 4.0,
};

export function getAggregateStats(sessions: Session[]) {
  const now = new Date("2026-07-30T16:00:00Z");
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const sessionsThisWeek = sessions.filter(
    (s) => new Date(s.recordedAt) >= sevenDaysAgo
  );

  const sessionMinutes = sessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const baselineTotal = Object.values(BASELINE_HOURS).reduce((acc, h) => acc + h, 0);
  const hoursCaptured = Math.round((baselineTotal + sessionMinutes / 60) * 10) / 10;

  const pendingReviewCount = sessions.filter(
    (s) => s.status === "Pending Review"
  ).length;

  const reviewedSessions = sessions.filter(
    (s) => s.status === "Approved" || s.status === "Rejected"
  );
  const approvedCount = sessions.filter((s) => s.status === "Approved").length;
  const approvalRate = reviewedSessions.length > 0
    ? Math.round((approvedCount / reviewedSessions.length) * 1000) / 10
    : 0;

  return {
    sessionsThisWeekCount: sessionsThisWeek.length,
    hoursCaptured,
    pendingReviewCount,
    approvalRate,
  };
}

export function getDailyMetrics(sessions: Session[]): DailyMetric[] {
  const daysMap = new Map<string, { minutes: number; count: number }>();
  
  for (let i = 13; i >= 0; i--) {
    const d = new Date("2026-07-30T00:00:00Z");
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    daysMap.set(dateStr, { minutes: 0, count: 0 });
  }

  sessions.forEach((s) => {
    const dateStr = s.recordedAt.split("T")[0];
    if (daysMap.has(dateStr)) {
      const current = daysMap.get(dateStr)!;
      daysMap.set(dateStr, {
        minutes: current.minutes + s.durationMinutes,
        count: current.count + 1,
      });
    }
  });

  const result: DailyMetric[] = [];
  daysMap.forEach((val, dateStr) => {
    const monthDay = dateStr.slice(5).replace("-", "/");
    result.push({
      date: monthDay,
      hours: Math.round((val.minutes / 60) * 10) / 10,
      sessionsCount: val.count,
    });
  });

  return result;
}

export function getTaskTypeMetrics(sessions: Session[]): TaskTypeMetric[] {
  const map = new Map<TaskType, { minutes: number; count: number }>();
  TASK_TYPES.forEach((t) => map.set(t, { minutes: 0, count: 0 }));

  sessions.forEach((s) => {
    const curr = map.get(s.taskType);
    if (curr) {
      map.set(s.taskType, {
        minutes: curr.minutes + s.durationMinutes,
        count: curr.count + 1,
      });
    }
  });

  return TASK_TYPES.map((taskType) => {
    const item = map.get(taskType)!;
    let baseTaskHours = 0;
    ENVIRONMENTS.forEach((e) => {
      baseTaskHours += BASELINE_HOURS[`${taskType}::${e}`] || 0;
    });

    return {
      taskType,
      hours: Math.round((baseTaskHours + item.minutes / 60) * 10) / 10,
      count: item.count,
    };
  }).sort((a, b) => b.hours - a.hours);
}

export function getCoverageMatrix(sessions: Session[]): CoverageCell[] {
  const matrix = new Map<string, { minutes: number; count: number }>();

  TASK_TYPES.forEach((t) => {
    ENVIRONMENTS.forEach((e) => {
      matrix.set(`${t}::${e}`, { minutes: 0, count: 0 });
    });
  });

  sessions.forEach((s) => {
    const key = `${s.taskType}::${s.environment}`;
    if (matrix.has(key)) {
      const curr = matrix.get(key)!;
      matrix.set(key, {
        minutes: curr.minutes + s.durationMinutes,
        count: curr.count + 1,
      });
    }
  });

  const targetMap: Record<string, number> = {
    "Pick and Place": 50,
    "Bin Sorting": 50,
    "Shelf Stocking": 50,
    "Box Packing": 45,
    "Item Sorting": 40,
  };

  const result: CoverageCell[] = [];
  TASK_TYPES.forEach((t) => {
    ENVIRONMENTS.forEach((e) => {
      const key = `${t}::${e}`;
      const item = matrix.get(key)!;
      const baseHours = BASELINE_HOURS[key] || 0;
      const target = targetMap[t] || 40;
      const totalCellHours = baseHours + item.minutes / 60;

      result.push({
        taskType: t,
        environment: e,
        hoursCaptured: Math.round(totalCellHours * 10) / 10,
        targetHours: target,
        sessionCount: item.count + Math.round(baseHours * 1.2),
      });
    });
  });

  return result;
}

export function getCoverageGaps(matrix: CoverageCell[]): CoverageGap[] {
  return [...matrix]
    .sort((a, b) => (a.hoursCaptured / a.targetHours) - (b.hoursCaptured / b.targetHours))
    .slice(0, 3)
    .map((cell) => ({
      taskType: cell.taskType,
      environment: cell.environment,
      currentHours: cell.hoursCaptured,
      targetHours: cell.targetHours,
    }));
}
