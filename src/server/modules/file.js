import request from '../index.js'

// 上传分片
export const postBreakpointContinuationFile = (data) => {
  return request({
    url: '/post-breakpoint-continuation-file',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
}

// 合并分片
export const postMergeFile = (data) => {
  return request({
    url: '/merge-file',
    method: 'post',
    data,
  });
}
