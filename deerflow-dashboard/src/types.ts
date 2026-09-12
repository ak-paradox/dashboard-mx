export type ThemeMode = 'dark' | 'light';

export interface AgentStatusData {
  status: 'THINKING...' | 'EXECUTING' | 'IDLE' | 'ANALYZING';
  steps: number;
  tools: number;
  memory: number;
}

export interface ClaudeCodexData {
  tokens: string;
  requests: number;
  growth: string;
}

export interface DeviceOverviewData {
  totalDevices: number;
  onlinePct: number;
  offlinePct: number;
  alerts: number;
}

export interface TeslaStatusData {
  model: string;
  batteryPct: number;
  rangeKm: number;
  isLocked: boolean;
  status: 'PARKED' | 'CHARGING' | 'DRIVING';
}

export interface PharmaTrackData {
  compound: string;
  phase: string;
  currentStep: number;
  totalSteps: number;
  progressPct: number;
}

export interface MedicalMonitorData {
  hrBpm: number;
  spo2Pct: number;
  tempCelsius: number;
  status: 'STABLE' | 'ELEVATED' | 'CRITICAL';
}

export interface BioSensorData {
  moisturePct: number;
  lightLux: number;
}

export interface WordPlayData {
  word: string;
  revealed: string[];
  missingIndex: number;
  score: number;
  streak: number;
}

export interface RetailAnalyticsData {
  visitors: string;
  isLive: boolean;
  salesGrowth: string;
}

export interface EntertainmentData {
  isPlaying: boolean;
  trackName: string;
  artist: string;
  volume: number;
}

export interface GameZoneData {
  score: number;
  lives: number;
  maxLives: number;
}

export interface VisionAIData {
  isRecording: boolean;
  objectsCount: number;
  confidencePct: number;
}
