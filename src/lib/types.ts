export type TaskType = 
  | "Pick and Place" 
  | "Bin Sorting" 
  | "Shelf Stocking" 
  | "Box Packing" 
  | "Item Sorting";

export type Environment = 
  | "Warehouse A" 
  | "Warehouse B" 
  | "Grocery Pilot Site 1" 
  | "Grocery Pilot Site 2";

export type SessionStatus = 
  | "Recording" 
  | "Pending Review" 
  | "Approved" 
  | "Rejected" 
  | "Discarded";

export type QualityFlag = 
  | "Good" 
  | "Needs Review" 
  | "Corrupted Frame Detected";

export interface Session {
  id: string;
  operator: string;
  taskType: TaskType;
  environment: Environment;
  durationMinutes: number;
  status: SessionStatus;
  qualityFlag: QualityFlag;
  taskSuccess: boolean;
  recordedAt: string;
  gloveDeviceIds: string[];
  reviewerNotes?: string;
}

export interface DailyMetric {
  date: string;
  hours: number;
  sessionsCount: number;
}

export interface TaskTypeMetric {
  taskType: TaskType;
  hours: number;
  count: number;
}

export interface CoverageCell {
  taskType: TaskType;
  environment: Environment;
  hoursCaptured: number;
  targetHours: number;
  sessionCount: number;
}

export interface CoverageGap {
  taskType: TaskType;
  environment: Environment;
  currentHours: number;
  targetHours: number;
}
