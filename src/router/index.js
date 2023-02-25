import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueRouter from 'vue-router';
import { Message } from 'element-ui';

Vue.use(Router)

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:resolve => require(['../view/Login'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component:resolve => require(['../view/Login'], resolve)
    },
    {
      path: '/VerbindlichEmail',
      name: 'VerbindlichEmail',
      component:resolve => require(['../view/VerbindlichEmail'], resolve)
    },
    {
      path: '/StudentManagement',
      name: 'StudentManagement',
      component:resolve => require(['../view/student/StudentManagement'], resolve),
      redirect: '/StudentManagement/NowProgress',
      children: [
        {
          path: '/StudentManagement/NowProgress',
          name: 'NowProgress',
          component:resolve => require(['../view/student/NowProgress'], resolve)
        },
        {
          path: '/StudentManagement/TeacherList',
          name: 'TeacherList',
          component:resolve => require(['../view/student/TeacherList'], resolve)
        },
        {
          path: '/StudentManagement/SelectSituation',
          name: 'SelectSituation',
          component:resolve => require(['../view/student/SelectSituation'], resolve)
        },
        {
          path: '/StudentManagement/CommitmentsSubmit',
          name: 'CommitmentsSubmit',
          component:resolve => require(['../view/student/CommitmentsSubmit'], resolve)
        },
        {
          path: '/StudentManagement/OpeningReportSubmit',
          name: 'OpeningReportSubmit',
          component:resolve => require(['../view/student/OpeningReportSubmit'], resolve)
        },
        {
          path: '/StudentManagement/IntermediateInspectionSubmit',
          name: 'IntermediateInspectionSubmit',
          component:resolve => require(['../view/student/IntermediateInspectionSubmit'], resolve)
        },
        {
          path: '/StudentManagement/FirstDraftSubmit',
          name: 'FirstDraftSubmit',
          component:resolve => require(['../view/student/FirstDraftSubmit'], resolve)
        },
        {
          path: '/StudentManagement/FinalizedSubmit',
          name: 'FinalizedSubmit',
          component:resolve => require(['../view/student/FinalizedSubmit'], resolve)
        },
        {
          path: '/StudentManagement/FinalSubmit',
          name: 'FinalSubmit',
          component:resolve => require(['../view/student/FinalSubmit'], resolve)
        },
        {
          path: '/StudentManagement/HistoricalTopic',
          name: 'HistoricalTopic',
          component:resolve => require(['../view/student/HistoricalTopic'], resolve)
        },
        {
          path: '/StudentManagement/TopicsDeclaration',
          name: 'TopicsDeclaration',
          component:resolve => require(['../view/student/TopicsDeclaration'], resolve)
        },
        {
          path: '/StudentManagement/TopicsReplace',
          name: 'TopicsReplace',
          component:resolve => require(['../view/student/TopicsReplace'], resolve)
        },
        {
          path: '/StudentManagement/AnnouncementInfo',
          name: 'AnnouncementInfo',
          component:resolve => require(['../view/student/AnnouncementInfo'], resolve)
        },
        // {
        //   path: '/StudentManagement/EmailInfo',
        //   name: 'EmailInfo',
        //   component:resolve => require(['../view/student/EmailInfo'], resolve)
        // }
      ]
    },
    {
      path: '/AdminManagement',
      name: 'AdminManagement',
      component:resolve => require(['../view/admin/AdminManagement'], resolve),
      redirect: '/AdminManagement/AdminHomePage',  //  设置默认的子路由
      children: [
        {
          path: '/AdminManagement/AdminHomePage',
          name: 'AdminHomePage',
          component:resolve => require(['../view/HomePage'], resolve)
        },
        {
          path: '/AdminManagement/AdminTutorial',
          name: 'AdminTutorial',
          component:resolve => require(['../view/admin/AdminTutorial'], resolve)
        },
        {
          path: '/AdminManagement/DepartmentsImport',
          name: 'DepartmentsImport',
          component:resolve => require(['../view/admin/DepartmentsImport'], resolve),
        },
        {
          path: '/AdminManagement/ProfessionalImport',
          name: 'ProfessionalImport',
          component:resolve => require(['../view/admin/ProfessionalImport'], resolve)
        },
        {
          path: '/AdminManagement/TeacherImport',
          name: 'TeacherImport',
          component:resolve => require(['../view/admin/TeacherImport'], resolve)
        },
        {
          path: '/AdminManagement/StudentImport',
          name: 'StudentImport',
          component:resolve => require(['../view/admin/StudentImport'], resolve)
        },
        {
          path: '/AdminManagement/HistoryTitleImport',
          name: 'HistoryTitleImport',
          component:resolve => require(['../view/admin/HistoryTitleImport'], resolve)
        },
        {
          path: '/AdminManagement/TeacherStatistical',
          name: 'TeacherStatistical',
          component:resolve => require(['../view/admin/TeacherStatistical'], resolve)
        },
        {
          path: '/AdminManagement/StudentStatistical',
          name: 'StudentStatistical',
          component:resolve => require(['../view/admin/StudentStatistical'], resolve)
        },
        {
          path: '/AdminManagement/AdminImport',
          name: 'AdminImport',
          component:resolve => require(['../view/admin/AdminImport'], resolve)
        },
      ]
    },
    {
      path: '/TeacherManagement',
      name: 'TeacherManagement',
      component:resolve => require(['../view/teacher/TeacherManagement'], resolve),
      redirect: '/TeacherManagement/TeacherHomePage',
      children: [
        {
          path: '/TeacherManagement/TeacherHomePage',
          name: 'TeacherHomePage',
          component:resolve => require(['../view/HomePage'], resolve)
        },
        {
          path: '/TeacherManagement/StudentList',
          name: 'StudentList',
          component:resolve => require(['../view/teacher/StudentList'], resolve)
        },
        {
          path: '/TeacherManagement/TSelectSituation',
          name: 'TSelectSituation',
          component:resolve => require(['../view/teacher/TSelectSituation'], resolve)
        },
        {
          path: '/TeacherManagement/DeclarationExamination',
          name: 'DeclarationExamination',
          component:resolve => require(['../view/teacher/DeclarationExamination'], resolve)
        },
        {
          path: '/TeacherManagement/ReplaceExamination',
          name: 'ReplaceExamination',
          component:resolve => require(['../view/teacher/ReplaceExamination'], resolve)
        },
        {
          path: '/TeacherManagement/CommitmentsExamination',
          name: 'CommitmentsExamination',
          component:resolve => require(['../view/teacher/CommitmentsExamination'], resolve)
        },
        {
          path: '/TeacherManagement/OpeningReportExamination',
          name: 'OpeningReportExamination',
          component:resolve => require(['../view/teacher/OpeningReportExamination'], resolve)
        },
        {
          path: '/TeacherManagement/IntermediateInspectionExamination',
          name: 'IntermediateInspectionExamination',
          component:resolve => require(['../view/teacher/IntermediateInspectionExamination'], resolve)
        },
        {
          path: '/TeacherManagement/FirstDraftExamination',
          name: 'FirstDraftExamination',
          component:resolve => require(['../view/teacher/FirstDraftExamination'], resolve)
        },
        {
          path: '/TeacherManagement/FinalizedExamination',
          name: 'FinalizedExamination',
          component:resolve => require(['../view/teacher/FinalizedExamination'], resolve)
        },
        {
          path: '/TeacherManagement/FinalExamination',
          name: 'FinalExamination',
          component:resolve => require(['../view/teacher/FinalExamination'], resolve)
        },
        {
          path: '/TeacherManagement/TAnnouncementInfo',
          name: 'TAnnouncementInfo',
          component:resolve => require(['../view/teacher/TAnnouncementInfo'], resolve)
        },
        // {
        //   path: '/TeacherManagement/TEmailInfo',
        //   name: 'TEmailInfo',
        //   component:resolve => require(['../view/teacher/TEmailInfo'], resolve)
        // },
      ]
    },
    {
      path: '/DepartmentChairManagement',
      name: 'DepartmentChairManagement',
      component:resolve => require(['../view/departmentChair/DepartmentChairManagement'], resolve),
      redirect: '/DepartmentChairManagement/DepartmentChairHomePage',
      children: [
        {
          path: '/DepartmentChairManagement/DepartmentChairHomePage',
          name: 'DepartmentChairHomePage',
          component:resolve => require(['../view/HomePage'], resolve)
        },
        {
          path: '/DepartmentChairManagement/Distribution',
          name: 'Distribution',
          component:resolve => require(['../view/departmentChair/Distribution'], resolve)
        },
        {
          path: '/DepartmentChairManagement/DeclareExamination',
          name: 'DeclareExamination',
          component:resolve => require(['../view/departmentChair/DeclareExamination'], resolve)
        },
        {
          path: '/DepartmentChairManagement/DReplaceExamination',
          name: 'DReplaceExamination',
          component:resolve => require(['../view/departmentChair/DReplaceExamination'], resolve)
        },
        // {
        //   path: '/DepartmentChairManagement/DCommitmentsExamination',
        //   name: 'DCommitmentsExamination',
        //   component:resolve => require(['../view/departmentChair/DCommitmentsExamination'], resolve)
        // },
        {
          path: '/DepartmentChairManagement/DIntermediateInspectionExamination',
          name: 'DIntermediateInspectionExamination',
          component:resolve => require(['../view/departmentChair/DIntermediateInspectionExamination'], resolve)
        },
        // {
        //   path: '/DepartmentChairManagement/DOpeningReportExamination',
        //   name: 'DOpeningReportExamination',
        //   component:resolve => require(['../view/departmentChair/DOpeningReportExamination'], resolve)
        // },
        {
          path: '/DepartmentChairManagement/DFirstDraftExamination',
          name: 'DFirstDraftExamination',
          component:resolve => require(['../view/departmentChair/DFirstDraftExamination'], resolve)
        },
        {
          path: '/DepartmentChairManagement/DFinalizedExamination',
          name: 'DFinalizedExamination',
          component:resolve => require(['../view/departmentChair/DFinalizedExamination'], resolve)
        },
        {
          path: '/DepartmentChairManagement/DFinalExamination',
          name: 'DFinalExamination',
          component:resolve => require(['../view/departmentChair/DFinalExamination'], resolve)
        },
        {
          path: '/DepartmentChairManagement/FinishStatistical',
          name: 'FinishStatistical',
          component:resolve => require(['../view/departmentChair/FinishStatistical'], resolve)
        },
        {
          path: '/DepartmentChairManagement/DAnnouncementInfo',
          name: 'DAnnouncementInfo',
          component:resolve => require(['../view/departmentChair/DAnnouncementInfo'], resolve)
        },
        // {
        //   path: '/DepartmentChairManagement/DEmailInfo',
        //   name: 'DEmailInfo',
        //   component:resolve => require(['../view/departmentChair/DEmailInfo'], resolve)
        // },
      ]
    },
  ]
});

// 为路由对象添加路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {  //  如果用户访问的是登录页面 直接放行
    return next();
  }

  let token = window.localStorage.getItem('token');  //  从LocalStorage中得到token
  const tokenStartTime = window.localStorage.getItem('tokenStartTime');  //   获取存储token的开始时间

  const timeOver = 2 * 3600 * 1000;  // 定义2个小时过期，让用户重新登录一下
  let date = new Date().getTime();  //  当前时间
  if(date - tokenStartTime > timeOver) {  //  如果大于说明是token过期了
    token = null;
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("tokenStartTime");
    window.localStorage.removeItem("userDTO");
  }

  // 如果没有token值 那么就跳转到'/login
  if (!token) {
    if(to.path == '/login') {
      return next();
    }
    Message({
        message: '登录状态过期，请重新登录',
        type: 'warning'
    });
    return next('/login');
  }

  // 如果有token则放行
  next();
})

export default router;

