import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'student-list', component: () => import('pages/StudentList.vue') },
      { path: 'student-form/:id?', component: () => import('pages/StudentForm.vue') },
      { path: 'course-list', component: () => import('pages/CourseList.vue') },
      { path: 'course-form/:id?', component: () => import('pages/CourseForm.vue') },
      { path: 'application-list', component: () => import('pages/ApplicationList.vue') },
      { path: 'application-form/:id?', component: () => import('pages/ApplicationForm.vue') },
    
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
