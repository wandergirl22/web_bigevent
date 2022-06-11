$(function () {
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });
    const layer = layui.layer;
    // 初始化用户信息
    const initUserInfo = () => {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: (res) => {
                if (res.status !== 0) return layer.msg("获取用户信息失败！");
                console.log(res);
                // 调用 form.val()方法为表单赋值
                form.val("formUserInfo", res.data);
            },
        });
    };
    // 重置表单数据
    $("#btnReset").click((e) => {
        e.preventDefault();
        //  重新获取用户信息
        initUserInfo()
    });
    // 更新用户数据
    $(".layui-form").on("submit", (e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            // 路径相同，方式不同，处理数据位置不同
            url: "/my/userinfo",
            data: $(".layui-form").serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("更新用户信息失败！");
                layer.msg("更新用户信息成功！");
                // 调用父页面渲染函数
                // 方法挂载在window上
                window.parent.getUserInfo();
                // parent方法 是一个window对象
                // 写在箭头函数或者入口函数里不生效
                // console.log(window);
            },
        });
    });
    initUserInfo();
})