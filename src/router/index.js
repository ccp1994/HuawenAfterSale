import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ProblemInput from '@/components/ProblemInput'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: '/',
  routes: [

    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/problemIn',
      name: 'ProblemInput',
      component: ProblemInput
    }
  ]
})
