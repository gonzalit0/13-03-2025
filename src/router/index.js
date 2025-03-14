import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
	},
	{
		path: '/posts',
		name: 'posts',
		component: () => import('../views/PostsView.vue'),
	},
	{
		path: '/profile',
		name: 'profile',
		component: () => import('../views/ProfileView.vue'),
	},
	{
		path: '/menu',
		name: 'menu',
		component: () => import('../views/MenuView.vue'),
	},
	{
		path: '/report',
		name: 'report',
		component: () => import('../views/ReportView.vue'),
	},
	{
		path: '/chart',
		name: 'chart',
		component: () => import('../views/ChartView.vue'),
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
