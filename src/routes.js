import stepper from './components/stepper.vue';
import about from './components/about.vue';
import bestsellers from './components/best_sellers.vue';

export const routes = [
    { path: '/', component: stepper, props: (route) => ({ query: route.query.q}) },
    { path: '/about', component: about  },
    { path: '/best_sellers', component: bestsellers }
]