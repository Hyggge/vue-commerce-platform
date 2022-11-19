export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({

  GET_SHOP_LIST (params) {
    // 接口请求
    return request({
      url: 'admin/shop/list',
      method: 'get',
      params: params
    })
  }
})
