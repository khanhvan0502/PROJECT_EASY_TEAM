import Dashboard from '../components/admin/Dashboard';
import AddProfile from '../components/admin/Profile/AddProfile';
import Profile from '../components/admin/Profile/Profile';
import AddCategoryQuiz from '../components/admin/CategoryQuiz/AddCategoryQuiz';
import ViewCategoryQuiz from '../components/admin/CategoryQuiz/ViewCategoryQuiz';
import EditCategoryQuiz from '../components/admin/CategoryQuiz/EditCategoryQuiz';
import AddItem from '../components/admin/Item/AddItem';
import ViewItem from '../components/admin/Item/ViewItem';
import EditItem from '../components/admin/Item/EditItem';
import EditProfile from '../components/admin/Profile/EditProfile';
import ViewQuiz from '../components/admin/Quiz/ViewQuiz';
import AddQuiz from '../components/admin/Quiz/AddQuiz';
import EditQuiz from '../components/admin/Quiz/EditQuiz';
import ViewNews from '../components/admin/News/ViewNews';
import AddNews from '../components/admin/News/AddNews';
import EditNews from '../components/admin/News/EditNews';
import ViewNewsItem from '../components/admin/NewsItem/ViewNewsItem';
import AddNewsItem from '../components/admin/NewsItem/AddNewsItem';
import EditNewsItem from '../components/admin/NewsItem/EditNewsItem';


const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/admin/profile/add', exact: true, name: 'AddProfile', component: AddProfile },
    { path: '/admin/profile/edit/:id', exact: true, name: 'EditProfile', component: EditProfile },
    { path: '/admin/view-category-quiz', exact: true, name: 'CategoryQuiz', component: ViewCategoryQuiz },
    { path: '/admin/add-category-quiz', exact: true, name: 'AddCategoryQuiz', component: AddCategoryQuiz },
    { path: '/admin/edit-category-quiz/:id', exact: true, name: 'EditCategoryQuiz', component: EditCategoryQuiz },
    { path: '/admin/add-item-quiz', exact: true, name: 'AddItem', component: AddItem },
    { path: '/admin/view-item-quiz', exact: true, name: 'ViewItem', component: ViewItem },
    { path: '/admin/edit-item-quiz/:id', exact: true, name: 'EditItem', component: EditItem },
    { path: '/admin/view-quiz', exact: true, name: 'ViewQuiz', component: ViewQuiz },
    { path: '/admin/add-quiz', exact: true, name: 'AddQuiz', component: AddQuiz },
    { path: '/admin/edit-quiz/:id', exact: true, name: 'EditQuiz', component: EditQuiz },
    { path: '/admin/view-news', exact: true, name: 'ViewNews', component: ViewNews },
    { path: '/admin/add-news', exact: true, name: 'AddNews', component: AddNews },
    { path: '/admin/edit-news/:id', exact: true, name: 'EditNews', component: EditNews },
    { path: '/admin/view-news-item', exact: true, name: 'ViewNewsItem', component: ViewNewsItem },
    { path: '/admin/add-news-item', exact: true, name: 'AddNewsItem', component: AddNewsItem },
    { path: '/admin/edit-news-item/:id', exact: true, name: 'EditNewsItem', component: EditNewsItem },


];

export default routes;