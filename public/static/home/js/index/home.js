vm = new Vue({
    el: '.header',
    data: {
        menuList: ''
    },
    methods: {
        getHomeMenu:function () {
            this.$http.post(ajaxUrl.getMenuList, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.menuList = res.data.data;
                console.log(this.menuList);
            }, function (res) {
                alert(res);
            });
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getHomeMenu();
        });
    }
});

 new Vue({
    el: '.site-main',
    data: {
        bannerList: {},
        blogrecommendList: {
            0:{'title':{}}  //防止异步请求报错
        },
        recentblog:{},
        phpBlog:{},
    },
    methods: {
        getHomeBanner:function () {
            this.$http.post(ajaxUrl.getBannerList, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.bannerList = res.data.data;
                console.log(this.bannerList);
            }, function (res) {
                alert(res);
            });
        },
        getBlogRecommendList:function () {
            this.$http.post(ajaxUrl.getBlogRecommendList, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.blogrecommendList = res.data.data;
                console.log(this.blogrecommendList);
            }, function (res) {
                alert('系统崩掉了');
            });
        },
        getRecontBlog:function () {
            this.$http.post(ajaxUrl.getRecontBlog, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.recentblog = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        },
        getPhpBlog:function () {
            this.$http.post(ajaxUrl.getPhpBlog, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.phpBlog = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getHomeBanner();
            this.getBlogRecommendList();
            this.getRecontBlog();
            this.getPhpBlog();

        });
    }
});
