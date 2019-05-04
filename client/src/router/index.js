import Vue from 'vue'
import Router from 'vue-router'
import Posts from '../components/Posts'
import Editor from '../components/Editor'
import NewPost from '../components/NewPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/posts',
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/editor/',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/editor/:id',
      name: 'Editor',
      component: Editor
    }
  ]
})
