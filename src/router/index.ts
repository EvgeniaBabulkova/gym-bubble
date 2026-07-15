import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/history',
      name: 'history',
      // route level code-splitting
      component: () => import('../views/HistoryView.vue'),
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('../views/AnalyticsView.vue'),
    },
    {
      path: '/workouts/:workoutId',
      name: 'workout-details',
      component: () => import('../views/WorkoutDetailsView.vue'),
    },
    {
      path: '/workouts/:workoutId/session',
      name: 'workout-session',
      component: () => import('../views/WorkoutSessionView.vue'),
    },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
})

export default router
