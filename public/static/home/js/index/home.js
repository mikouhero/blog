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
    el: '.site-content',
    data: {
        bannerList: ''
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
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getHomeBanner();
        });
    }
});

new Vue({
    el: '.deanpol',
    data: {
        blogrecommendList: ''
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
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getHomeBanner();
        });
    }
});