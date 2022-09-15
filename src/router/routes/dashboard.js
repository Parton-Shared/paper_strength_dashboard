export default [
  {
    path: '/dashboard/analytics',
    name: 'dashboard-analytics',
    component: () => import('@/views/dashboard/analytics/Analytics.vue'),
  },
  {
    path: '/dashboard/ecommerce',
    name: 'dashboard-ecommerce',
    component: () => import('@/views/dashboard/ecommerce/Ecommerce.vue'),
  },
  {
    path: '/dashboard/monitoring',
    name: 'dashboard-monitoring',
    component: () => import('@/views/dashboard/monitoring/Monitoring.vue'),
  },
  {
    path: '/dashboard/simulation',
    name: 'dashboard-simulation',
    component: () => import('@/views/dashboard/simulation/Simulation.vue'),
  },
  {
    path: '/dashboard/reports',
    name: 'dashboard-reports',
    component: () => import('@/views/dashboard/reports/Reports.vue'),
  },
]
