import { ChartactersGrid } from '@/views/charactersGrid'
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ChartactersGrid
    }, 
  ]
})

export default router
