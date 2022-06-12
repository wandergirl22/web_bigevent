$(function () {
    getUserInfo();
});
const layer = layui.layer;
// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // Headers ×
        // headers: {
        //     // 注入token
        //     // 请求头中携带 Authorization 身份认证字段
        //     Authorization: localStorage.getItem("token"),
        // },
        success: (res) => {
            console.log(res);
            // 添加判断 失败不执行下面的内容
            if (res.status !== 0) return layer.msg("获取用户信息失败！");
            // layer.msg("获取用户信息成功！");
            // 调用渲染函数
            renderAvatar(res.data)
        },
        // 有跳转闪动效果，后续用路由拦截器实现
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: (res) => {
        //     // 判断条件：1、未登录 2、token失效
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     // 认证成功为0 ，其他情况为1 
        //     if (res.responseJSON.status === 1 && 
        //         res.responseJSON.message === "身份认证失败！") {
        //         //  强制清空 token
        //         localStorage.removeItem("token");
        //         // 强制跳转到登录页面
        //         location.href = "/login.html"
        //     }
        // },
    });
}
// 渲染用户头像
const renderAvatar = (user) => {
    // 获取用户名字
    let name = user.nickname || user.username;
    // 设置欢迎文本
    $("#welcome").html(`欢迎 ${name}`);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        // 隐藏文本头像
        $(".text-avatar").hide();
    } else {
        // 隐藏图片头像
        $(".layui-nav-img").hide();
        // 渲染文本头像
        // 首字母转大写
        let firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName);
    }
};

// 退出登录
$("#btnLogout").click(() => {
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },
        // 每次弹提示框会有一个index
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
});

$('.layui-nav-child dd').on('click', function(){
    $(this).parents('layui-header').siblings('layui-side').children('layui-nav-item').click();
})
// 切换高亮
function change(){
    $('#change').addClass('layui-this').next().removeClass('layui-this')
}