import Home from "../components/frontend/Home";
import ViewCategoryQuiz from '../components/frontend/features/ViewCategoryQuiz';
import ViewItemQuiz from "../components/frontend/features/ViewItemQuiz";
import Tinlienquan from '../components/frontend/ContentMenu/Tinlienquan';
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import Page403 from '../components/errors/Page403';
import Page404 from '../components/errors/Page404';
import ViewQuiz from "../components/frontend/features/ViewQuiz";
import Search from "../components/frontend/features/Search";
import ViewNews from "../components/frontend/features/ViewNews";
import ViewNewsItem from "../components/frontend/features/ViewNewsItem";
import ViewNewsItemDetail from "../components/frontend/features/ViewNewsItemDetail";


const publicRoutesList = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/tinlienquan', exact: true, name: 'Tinlienquan', component: Tinlienquan },
    { path: '/403', exact: true, name: 'Page403', component: Page403 },
    { path: '/403', exact: true, name: 'Page404', component: Page404 },
    { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/register', exact: true, name: 'Register', component: Register },
    { path: '/listquiz', exact: true, name: 'ListQuiz', component: ViewCategoryQuiz },
    { path: '/listquiz/:slug', exact: true, name: 'ItemQuiz', component: ViewItemQuiz },
    { path: '/listquiz/:slug/:slug', exact: true, name: 'Quiz', component: ViewQuiz },
    { path: '/search', exact: true, name: 'Search', component: Search },
    { path: '/news', exact: true, name: 'ViewNews', component: ViewNews },
    { path: '/news/:slug', exact: true, name: 'ViewNewsItem', component: ViewNewsItem },
    { path: '/news/:news/:newsitem', exact: true, name: 'ViewNewsItemDetail', component: ViewNewsItemDetail },
];

export default publicRoutesList;