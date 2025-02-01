import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard/Dashboard.vue';
import TransactionUploader from '../components/Transactions/TransactionUploader.vue';
import Goals from '../components/Goals/GoalsList.vue';
import Chatbot from '../components/Chatbot/Chatbot.vue';
import Login from '../components/Login.vue';
import FinancialDNAQuestions from '../components/DNA/FinancialDNAQuestions.vue';

const routes = [
    { path: '/', component: Dashboard, meta: { requiresAuth: true } }, // Protected route
    { path: '/transactions', component: TransactionUploader, meta: { requiresAuth: true } }, // Protected route
    { path: '/goals', component: Goals, meta: { requiresAuth: true } }, // Protected route
    { path: '/chatbot', component: Chatbot, meta: { requiresAuth: true } }, // Protected route
    { path: '/login', component: Login, name: 'Login' },
    { path: '/financial-dna', component: FinancialDNAQuestions, meta: { requiresAuth: true } }, // Protected route
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;