$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    $('#form_reg').on ('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                $('#form_reg')[0].reset()
                // 自动触发切换账号登录
                $('#link_login').click()

            }
        })
    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        console.log();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})