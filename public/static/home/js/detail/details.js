Vm2 = new Vue({
    el: '.site-main',
    data: {
        allPhpList: {
        },
        pageNo: 1,   // 当前页数
        pages: 12,    //  多少页

    },
    methods: {
        pageList: function (curPage) {
            //根据当前页获取数据
            this.pageNo = curPage;
            this.getUserList(this.pageNo);
            // console.log("当前页：" + this.pageNo);
        },
        getAllPhpList:function () {
            this.$http.post(ajaxUrl.getAllPhpList, {
                current_page: this.pageNo
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.allPhpList = res.data.data;
            }, function (res) {
                alert('系统崩掉了');
            });
        },

    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAllPhpList();

        });
    }
});