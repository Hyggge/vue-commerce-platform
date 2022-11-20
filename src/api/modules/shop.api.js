export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({

  GET_SHOP_LIST (params) {
    // 接口请求
    return request({
      url: 'admin/shop/list',
      method: 'get',
      params: params
    })
  },

  GET_USER_SHOP_LIST (userId) {
    return request({
      url: `shop/user_shop/${userId}`,
      method: 'get'
    })
  },

  GET_SHOP_DETAILS (shopId) {
    return request({
      url: `shop/${shopId}`,
      method: 'get'
    })
  },

  DELETE_SHOP_ADMIN (shopId, adminId) {
    return request({
      url: `shop/shop_admin/${shopId}`,
      method: 'delete',
      data: { adminId }
    })
  },

  ADD_SHOP_ADMIN (shopId, adminId) {
    return request({
      url: `shop/shop_admin/${shopId}`,
      method: 'POST',
      data: { adminId }
    })
  },

  CREATE_NEW_SHOP (data) {
    return request({
      url: 'shop/register',
      method: 'post',
      data
    })
  }
})
