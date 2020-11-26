$(function () {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,16}$/
            ,'密码必须6到16位，且不能出现空格！'
          ] ,

        //   判断旧密码和新密码是否相同
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '原密码和旧密码不能相同！'
            }
        },

        // 判断新密码和确认密码是否相同
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致！'
            }
        }
    })

    // 表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })
})