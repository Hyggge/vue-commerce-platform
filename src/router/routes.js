import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: () => import('@/views/home')
      },
      // 文章
      {
        path: 'articles',
        name: 'articles',
        meta: {
          title: '种草分享',
          auth: true
        },
        component: () => import('@/views/articles')
      },
      // 管理员页面
      {
        path: 'admin/show-users',
        name: 'show-users',
        meta: {
          title: '用户列表',
          auth: true
        },
        component: () => import('@/views/admin/show-users')
      },
      {
        path: 'admin/show-orders',
        name: 'show-orders',
        meta: {
          title: '订单列表',
          auth: true
        },
        component: () => import('@/views/admin/show-orders')
      },
      {
        path: 'admin/show-shops',
        name: 'show-shops',
        meta: {
          title: '店铺列表',
          auth: true
        },
        component: () => import('@/views/admin/show-shops')
      },
      {
        path: 'admin/show-user-certifications',
        name: 'show-user-certifications',
        meta: {
          title: '学生认证请求列表',
          auth: true
        },
        component: () => import('@/views/admin/show-user-certifications')
      },
      {
        path: 'admin/show-shop-certifications',
        name: 'show-shop-certifications',
        meta: {
          title: '店铺认证请求列表',
          auth: true
        },
        component: () => import('@/views/admin/show-shop-certifications')
      },
      // 用户页面
      {
        path: 'user/details',
        name: 'user-details',
        meta: {
          title: '用户信息',
          auth: true
        },
        component: () => import('@/views/user/details')
      },
      {
        path: 'user/orders',
        name: 'user-orders',
        meta: {
          title: '用户订单',
          auth: true
        },
        component: () => import('@/views/user/orders')
      },
      {
        path: 'user/certificate',
        name: 'user-certificate',
        meta: {
          title: '学生认证',
          auth: true
        },
        component: () => import('@/views/user/certificate')
      },
      // 店铺页面
      {
        path: 'shop/details',
        name: 'shop-details',
        meta: {
          title: '店铺信息',
          auth: true
        },
        component: () => import('@/views/shop/details')
      },
      {
        path: 'shop/orders',
        name: 'shop-orders',
        meta: {
          title: '店铺订单',
          auth: true
        },
        component: () => import('@/views/shop/orders')
      },
      {
        path: 'shop/goods',
        name: 'shop-goods',
        meta: {
          title: '店铺商品',
          auth: true
        },
        component: () => import('@/views/shop/orders')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/user/login')
  },
  {
    path: '/register',
    name: 'register',
    component: _import('system/user/register')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
