import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Router from 'vue-router'

import Posts from '@/components/Posts'
import Contact from '@/components/Contact'
import Configuration from '@/components/Configuration'
import Management from '@/components/Management'
import Scenarios from '@/components/Scenarios'


Vue.use(Router)
Vue.use(VueClipboard)


export default new Router({
  routes: [{
      path: '/',
      component: Posts
    },

    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/configuration',
      component: Configuration
    },
    {
      path: '/management',
      component: Management
    },
    {
      path: '/scenarios',
      component: Scenarios

    },

  ]
})
