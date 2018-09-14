vm = new Vue({
    el: '.main-content',
    data: {
        user_name:'',
        password:''

    },
    methods:{
        login:function () {
            if(!this.user_name) {alert('用户名为空');return false;}
            if(!this.password) {alert('密码为空');return false;}
            this.$http.post(ajaxUrl.login, {
                "user_name":this.user_name,
                'password':this.password
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                location.href= url;
            }, function (res) {
                alert("程序崩掉了");
            });

        }
    },
    mounted: function () {

    }
});