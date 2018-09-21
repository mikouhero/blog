Vm2 = new Vue({
    el: '.site-main',
    data: {
        allPhpList: {
        },
        pageNo: 1,   // 当前页数
        pages: 0,    //  多少页

    },
    methods: {
        pageList: function (curPage) {
            //根据当前页获取数据
            this.pageNo = curPage;
            this.getAllList(this.pageNo);
            // console.log("当前页：" + this.pageNo);
        },
        getAllList:function () {
            this.$http.post(ajaxUrl.getAllWebList, {
                current_page: this.pageNo
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.allPhpList = res.data.data['list'];
                this.pages = res.data.data['count'];
            }, function (res) {
                alert('系统崩掉了');
            });
        },

    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAllList();

        });
    }
});

Vm1 = new Vue({
    el: '.sidebar-right',
    data: {
        blogrecommendList: {
            0:{'title':{}}  //防止异步请求报错
        },
        blogHotList: {
            0:{'title':{}}  //防止异步请求报错
        },
        blogHotCommentList: {
            0:{'title':{}}  //防止异步请求报错
        },
        blogImageList: {
            0:{'title':{}}  //防止异步请求报错
        },
        blogToolsList:{
            0:{'title':{}}  //防止异步请求报错
        }
    },
    methods: {
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
            }, function (res) {
                alert('系统崩掉了');
            });
        },
        getHotBlog:function () {
            this.$http.post(ajaxUrl.getHotBlog, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.blogHotList = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        },
        getHotCommentBlog:function () {
            this.$http.post(ajaxUrl.getHotCommentBlog, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.blogHotCommentList = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        },
        getImageBlog:function () {
            this.$http.post(ajaxUrl.getImageBlog, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.blogImageList = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        },
        getToolsBlog:function () {
            this.$http.post(ajaxUrl.getToolsBlog, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.blogToolsList = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getBlogRecommendList();
            this.getHotBlog();
            this.getHotCommentBlog();
            this.getImageBlog();
        });
    }
});

vm = new Vue({
    el: '.header',
    data: {
        menuList: '',
        tmpclass:'',
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
            }, function (res) {
                alert(res);
            });
        },
        addmenuclass:function (key) {
            var tmp  = key || localStorage.getItem('keyclass');
            if(key === 0){
                tmp =0;
            }
            localStorage.setItem('keyclass',tmp);
            this.tmpclass=localStorage.getItem('keyclass');

        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getHomeMenu();
            this.addmenuclass();
        });
    }
});