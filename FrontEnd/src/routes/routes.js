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

];

export default routes;