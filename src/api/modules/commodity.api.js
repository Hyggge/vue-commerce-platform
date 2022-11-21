
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({

  ADD_COMMODITY (shopId, data) {
    return request({
      path: `/api/shop/comm/add/${shopId}`,
      method: 'post',
      data
    })
  },

  DELETE_COMMODITY (commodityId) {
    return request({
      path: `/api/comm/${commodityId}`,
      method: 'delete'
    })
  },

  GET_COMMODITY_DETIALS (commodityId) {
    return request({
      path: `/api/comm/${commodityId}`,
      method: 'get'
    })
  },

  UPDATE_COMMODITY_DETAILS (commodityId, data) {
    return request({
      path: `/api/comm/${commodityId}`,
      method: 'put',
      data
    })
  },

  DELETE_COMMODITY_PARAM (paramId) {
    return request({
      path: `/api/comm/para/${paramId}`,
      method: 'delete'
    })
  },

  UPDATE_COMMODITY_PARAM (paramId, data) {
    return request({
      path: `/api/comm/para/${paramId}`,
      method: 'put',
      data
    })
  },

  ADD_COMMODITY_PARAM (paramId, data) {
    return request({
      path: `/api/comm/para/add_to_para_set/${paramId}`,
      method: 'post',
      data
    })
  },

  DELETE_COMMODITY_PARAM_GROUP (paramGroupId) {
    return request({
      path: `/api/comm/para_set/${paramGroupId}`,
      method: 'delete'
    })
  },

  UPDATE_COMMODITY_PARAM_GROUP (paramGroupId, data) {
    return request({
      path: `/api/comm/para_set/${paramGroupId}`,
      method: 'put',
      data
    })
  },

  ADD_COMMODITY_PARAM_GROUP (paramGroupId, data) {
    return request({
      path: `/api/comm/para_set/${paramGroupId}`,
      method: 'post',
      data
    })
  },

  GET_COMMODITY_LIST_FOR_USER (page, data) {
    return request({
      path: '/api/comm/list',
      method: 'get',
      params: { page },
      data
    })
  },

  GET_COMMODITY_LIST_FOR_SHOP (shopId, page, data) {
    return request({
      path: `/api/shop/comm/list/${shopId}`,
      method: 'get',
      params: { page },
      data
    })
  }

})
