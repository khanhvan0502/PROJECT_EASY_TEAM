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
import AllQuestion from "../components/frontend/Question/AllQuestion";
import AskQuestion from "../components/frontend/Question/AskQuestion";
import ContentQuestion from "../components/frontend/Question/ContentQuestion";

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
    { path: '/question', exact: true, name: 'Question', component: AllQuestion },
    { path: '/ask-question', exact: true, name: 'AskQuestion', component: AskQuestion },
    { path: '/question/:slug', exact: true, name: 'ContentQuestion', component: ContentQuestion },
];

export default publicRoutesList;