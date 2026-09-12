export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical'

export interface RiskHotspot {
  id: number
  name: string
  region: string
  riskLevel: RiskLevel
  riskScore: number
  assetsCount: number
  description: string
  x: number // percentage 0-100
  y: number // percentage 0-100
  trend: 'up' | 'down' | 'stable'
  badge: string
}

export interface RegionIncident {
  id: string
  title: string
  location: string
  badgeText: string
  badgeType: 'red' | 'green' | 'cyan' | 'amber'
  timeAgo: string
  iconType: 'flood' | 'heat' | 'water' | 'fire'
}

export interface FilterState {
  region: string
  asset: string
  riskType: string
  timeRange: string
}
