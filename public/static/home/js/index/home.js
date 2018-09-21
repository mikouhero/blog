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

 new Vue({
    el: '.site-main',
    data: {
        bannerList: {},
        blogrecommendList: {
            0:{'title':{}}  //防止异步请求报错
        },
        recentblog:{},
        phpBlog:{},
        mysqlBlog:{
            0:{'title':{}}
        },
        jsBlog:{
            0:{'title':{}}
        },
        linuxBlog:{
            0:{'title':{}}
        },
        ciBlog:{
            0:{'title':{}}
        },
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
        getMySQLBlog:function () {
            this.$http.post(ajaxUrl.getMySQLBlog, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.mysqlBlog = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        },
        getJsBlog:function () {
            this.$http.post(ajaxUrl.getJsBlog, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.jsBlog = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        },
        getLinuxBlog:function () {
            this.$http.post(ajaxUrl.getLinuxBlog, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.linuxBlog = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        },
        getCiBlog:function () {
            this.$http.post(ajaxUrl.getCiBlog, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.ciBlog = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        },
        blog:function (id) {
            // location.href=homeurl + "/blog/" + id;
            // window.open(homeurl + "/blog/" + id);
        }

    },
    mounted: function () {
        this.$nextTick(function () {
            this.getHomeBanner();
            this.getBlogRecommendList();
            this.getRecontBlog();
            this.getPhpBlog();
            this.getMySQLBlog();
            this.getJsBlog();
            this.getLinuxBlog();
            this.getCiBlog();

        });
    }
});

Vm2 = new Vue({
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

Vm3 = new Vue({
    el: '.mx-cms1',
    data: {
        blogToolsList:{
            0:{'title':{}}  //防止异步请求报错
        }
    },
    methods: {
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
            this.getToolsBlog();
        });
    }
});
Vm4 = new Vue({
    el: '#mxlee-main',
    data: {
        blogOtherList:{}
    },
    methods: {
        getOtherBlog:function () {
            this.$http.post(ajaxUrl.getOtherBlog, {
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.blogOtherList = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getOtherBlog();
        });
    }
});