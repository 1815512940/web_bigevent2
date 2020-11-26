$(function () {
    getUserInfo()

    // 退出
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确定退出?', {icon: 3, title:'提示'}, function(index){
            // 清空本地token
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = '/login.html'
            layer.close(index);
          });
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            renderAvater(res.data)
        }
    })
}

function renderAvater(user) {
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎  ${name}`)

    if (user.user_pic !== null) {
        $('.layui-nav-img').show().prop('src', user.user_pic)
        $('.text-avater').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avater').show().html(text)
    }
}