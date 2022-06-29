import Vue from 'vue'
import VueRouter from 'vue-router'
import UserrootView from '../views/UserRootView.vue' 
import HomeView from '../views/HomeView.vue'
import StuView from '../views/StuView.vue'
import BlogView from '../views/BlogView.vue'
import LifeView from '../views/LifeView.vue'
import ArticledetailView from '../views/ArticledetailView.vue'
import SearchView from '../views/SearchView.vue'
import AdminLoginView from '../views/Admin/AdminLogin.vue'
import AdminRootView from '../views/Admin/AdminRoot.vue'
import AdminHomeView from '../views/Admin/children/AdminHome.vue'
import AdminUserView from '../views/Admin/children/AdminUser.vue'
import AdminCommentView from '../views/Admin/children/AdminComment.vue'
import AdminBlogsView from '../views/Admin/children/AdminBlogs.vue'
import AdminQuestionView from '../views/Admin/children/AdminQuestion.vue'
import AdminLifeView from '../views/Admin/children/AdminLife.vue'
import AddBlogView from '../views/Admin/children/AddBlog.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/myblog',
    name: 'UserRoot',
    component: UserrootView,
    children:[
      {
        path: 'home',
        name: 'home',
        component: HomeView
      },
      {
        path: 'stu',
        name:'study',
        component: StuView
      },
      {
        path: 'Blog',
        name:'Blog',
        component: BlogView
      },
      {
        path: 'Life',
        name:'Life',
        component: LifeView
      },
      {
        path: 'Articled',
        name:'Articledetail',
        component: ArticledetailView
      },
      {
        path: 'Search',
        name:'Search',
        component: SearchView
      },
    ]
  },
  {
    path: '/mlogin',
    name: 'managerlogin',
    component: AdminLoginView
  },
  {
    path: '/AdminRoot',
    name: 'AdminRoot',
    component: AdminRootView,
    children:[
      {
        path: 'Adminhome',
        name: 'Adminhome',
        component: AdminHomeView
      },
      {
        path: 'AdminUser',
        name: 'AdminUser',
        component: AdminUserView
      },
      {
        path: 'AdminComment',
        name: 'AdminComment',
        component: AdminCommentView
      },
      {
        path: 'AdminBlogs',
        name: 'AdminBlogs',
        component: AdminBlogsView
      },
      {
        path: 'AdminQuestion',
        name: 'AdminQuestion',
        component: AdminQuestionView
      },
      {
        path: 'AdminLife',
        name: 'AdminLife',
        component: AdminLifeView
      },
      {
        path: 'AddBlog',
        name: 'AddBlog',
        component: AddBlogView
      },
    ]
  },
  {
    path: '*', redirect: '/myblog/home'   //匹配不到路由时重定向会home
  },
  {
    path: '/', redirect: '/myblog/home'   //匹配不到路由时重定向会home
  },
  {
    path: '/AdminRoot', redirect: '/AdminRoot/Adminhome'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
