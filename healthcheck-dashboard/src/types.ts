export type HealthStatus = 'operational' | 'degraded' | 'outage' | 'maintenance'

export type ServiceVendor =
  | 'Application APIs'
  | 'GitHub'
  | 'Cloudflare'
  | 'Atlassian'
  | 'Salesforce'
  | 'MuleSoft'
  | 'Okta'
  | 'Stripe'

export interface EdgeNode {
  id: string
  name: string
  region: string
  status: HealthStatus
  latencyMs: number
  uptime: number
  x: number
  y: number
  vendor: ServiceVendor
}

export interface StatusDay {
  day: number
  status: HealthStatus
}

export interface ServiceRow {
  id: string
  name: ServiceVendor
  subtitle: string
  status: HealthStatus
  uptime90d: number
  p99Ms: number
  history: StatusDay[]
}

export interface IncidentItem {
  id: string
  title: string
  service: string
  badgeText: string
  badgeVariant: 'red' | 'green' | 'cyan' | 'amber'
  timeAgo: string
  severity: 'critical' | 'major' | 'minor' | 'info'
}

export interface FilterState {
  region: string
  surface: string
  status: string
  timeRange: string
}
