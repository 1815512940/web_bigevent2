var baseAPL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function  (params) {
    params.url = baseAPL + params.url

    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 拦截所有响应 判断身份认证信息
    params.complete = function (res) {
        if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})