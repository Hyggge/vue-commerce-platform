
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({

  GET_USER_LIST (params) {
    // 接口请求
    return request({
      url: 'admin/user/list',
      method: 'get',
      params: params
    })
  }
})
