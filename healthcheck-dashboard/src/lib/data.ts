import type { EdgeNode, HealthStatus, IncidentItem, ServiceRow, StatusDay } from '../types'

const statuses: HealthStatus[] = ['operational', 'degraded', 'outage', 'maintenance']

function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export function buildHistory(seed: number, bias: HealthStatus = 'operational'): StatusDay[] {
  return Array.from({ length: 45 }, (_, i) => {
    const r = seeded(seed * 97 + i)
    let status: HealthStatus = bias
    if (r > 0.97) status = 'outage'
    else if (r > 0.9) status = 'degraded'
    else if (r > 0.86) status = 'maintenance'
    else status = 'operational'
    // Force a few memorable incidents on popular vendors
    if (seed === 2 && i === 38) status = 'degraded'
    if (seed === 3 && i === 41) status = 'outage'
    if (seed === 5 && i === 30) status = 'degraded'
    return { day: i, status }
  })
}

export const edgeNodes: EdgeNode[] = [
  { id: 'iad', name: 'IAD', region: 'US-East', status: 'operational', latencyMs: 42, uptime: 99.98, x: 24, y: 38, vendor: 'Cloudflare' },
  { id: 'sfo', name: 'SFO', region: 'US-West', status: 'operational', latencyMs: 38, uptime: 99.99, x: 14, y: 40, vendor: 'Cloudflare' },
  { id: 'lhr', name: 'LHR', region: 'EU-West', status: 'degraded', latencyMs: 186, uptime: 99.41, x: 48, y: 32, vendor: 'Application APIs' },
  { id: 'fra', name: 'FRA', region: 'EU-Central', status: 'operational', latencyMs: 61, uptime: 99.97, x: 52, y: 34, vendor: 'MuleSoft' },
  { id: 'sin', name: 'SIN', region: 'APAC', status: 'operational', latencyMs: 74, uptime: 99.95, x: 74, y: 58, vendor: 'Salesforce' },
  { id: 'syd', name: 'SYD', region: 'Oceania', status: 'maintenance', latencyMs: 112, uptime: 99.2, x: 84, y: 78, vendor: 'Atlassian' },
  { id: 'gru', name: 'GRU', region: 'LATAM', status: 'operational', latencyMs: 95, uptime: 99.91, x: 32, y: 72, vendor: 'GitHub' },
  { id: 'nrt', name: 'NRT', region: 'Japan', status: 'outage', latencyMs: 940, uptime: 97.2, x: 82, y: 40, vendor: 'Application APIs' },
]

export const services: ServiceRow[] = [
  {
    id: 'apis',
    name: 'Application APIs',
    subtitle: 'Orders · Identity · Billing · Search',
    status: 'degraded',
    uptime90d: 99.42,
    p99Ms: 312,
    history: buildHistory(1),
  },
  {
    id: 'github',
    name: 'GitHub',
    subtitle: 'Actions · Packages · Webhooks',
    status: 'operational',
    uptime90d: 99.97,
    p99Ms: 118,
    history: buildHistory(2),
  },
  {
    id: 'cf',
    name: 'Cloudflare',
    subtitle: 'CDN · WAF · Workers · DNS',
    status: 'operational',
    uptime90d: 99.99,
    p99Ms: 28,
    history: buildHistory(3),
  },
  {
    id: 'atl',
    name: 'Atlassian',
    subtitle: 'Jira · Confluence · Bitbucket',
    status: 'maintenance',
    uptime90d: 99.61,
    p99Ms: 240,
    history: buildHistory(4),
  },
  {
    id: 'sf',
    name: 'Salesforce',
    subtitle: 'Core CRM · Experience Cloud',
    status: 'operational',
    uptime90d: 99.94,
    p99Ms: 165,
    history: buildHistory(5),
  },
  {
    id: 'mule',
    name: 'MuleSoft',
    subtitle: 'Anypoint · API Gateway · MQ',
    status: 'degraded',
    uptime90d: 99.18,
    p99Ms: 480,
    history: buildHistory(6),
  },
]

export const incidents: IncidentItem[] = [
  {
    id: 'inc-1',
    title: 'Tokyo API gateway elevated errors',
    service: 'Application APIs · NRT',
    badgeText: 'Partial Outage',
    badgeVariant: 'red',
    timeAgo: '4 min ago',
    severity: 'critical',
  },
  {
    id: 'inc-2',
    title: 'MuleSoft Anypoint queue backlog',
    service: 'MuleSoft · EU-Central',
    badgeText: 'Degraded',
    badgeVariant: 'amber',
    timeAgo: '18 min ago',
    severity: 'major',
  },
  {
    id: 'inc-3',
    title: 'Atlassian Confluence scheduled window',
    service: 'Atlassian · SYD',
    badgeText: 'Maintenance',
    badgeVariant: 'cyan',
    timeAgo: '42 min ago',
    severity: 'info',
  },
  {
    id: 'inc-4',
    title: 'GitHub Actions runners recovered',
    service: 'GitHub · US-East',
    badgeText: 'Resolved',
    badgeVariant: 'green',
    timeAgo: '2 hr ago',
    severity: 'minor',
  },
]

export function statusColor(status: HealthStatus): string {
  switch (status) {
    case 'operational':
      return 'var(--status-ok)'
    case 'degraded':
      return 'var(--status-warn)'
    case 'outage':
      return 'var(--status-crit)'
    case 'maintenance':
      return 'var(--status-info)'
  }
}

export function statusLabel(status: HealthStatus): string {
  switch (status) {
    case 'operational':
      return 'Operational'
    case 'degraded':
      return 'Degraded'
    case 'outage':
      return 'Outage'
    case 'maintenance':
      return 'Maintenance'
  }
}

export { statuses }
