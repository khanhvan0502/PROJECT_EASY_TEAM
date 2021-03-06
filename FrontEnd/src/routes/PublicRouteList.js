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
import AllQuestion from "../components/frontend/Question/AllQuestion";
import AskQuestion from "../components/frontend/Question/AskQuestion";
import ContentQuestion from "../components/frontend/Question/ContentQuestion";
import QuestionByTag from "../components/frontend/Question/QuestionByTag";
import QuestionByCategory from "../components/frontend/Question/QuestionByCategory";
import Result from "../components/frontend/features/Result";
import UserProfile from "../components/frontend/User/UserProfile";
import ChangePassword from "../components/frontend/User/ChangePassword";
import EditUserProfile from "../components/frontend/User/EditUserProfile";
import SearchResult from "../components/frontend/Question/SearchResult";
import MostView from "../components/frontend/Question/MostView";
import MostComment from "../components/frontend/Question/MostComment";
import MostVote from "../components/frontend/Question/MostVote";


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
    { path: '/question', exact: true, name: 'Question', component: AllQuestion },
    { path: '/ask-question', exact: true, name: 'AskQuestion', component: AskQuestion },
    { path: '/question/:slug', exact: true, name: 'ContentQuestion', component: ContentQuestion },
    { path: '/question/search/:key', exact:true, name: 'SearchResult', component: SearchResult },
    { path: '/question/tag/:id', exact: true, name: 'QuestionByTag', component: QuestionByTag },
    { path: '/question/category/:id', exact: true, name: 'QuestionByCategory', component: QuestionByCategory },
    { path: '/user/:username', exact: true, name: 'User'  },
    { path: '/result', exact: true, name: 'Result', component: Result },
    { path: '/user/:username', exact: true, name: 'User', component: UserProfile  },
    { path: '/user/:username/change-password', exact: true, name: 'ChangePassword', component: ChangePassword  },
    { path: '/user/:username/edit', exact: true, name: 'EditUser', component: EditUserProfile  },
    { path: '/questions/most-view', exact: true, name: 'MostView', component: MostView },
    { path: '/questions/most-comment', exact: true, name: 'MostComment', component: MostComment },
    { path: '/questions/most-vote', exact: true, name: 'MostVote', component: MostVote },
    

];

export default publicRoutesList;