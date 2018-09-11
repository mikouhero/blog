vm = new Vue({
    el: '.page-content',
    data: {
        roleList: '',
        pageNo: 1,   // 当前页数
        pages: 0,    //  多少页
        msg: {},
        msg: {'status': 1},
        editid: '',
        editmsg: {},
        delid: '',
        delkey: '',
    },
    methods: {
        getRoleList: function () {
            this.$http.post(ajaxUrl.getRoleList, {
                current_page: this.pageNo
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.roleList = res.data.data['list'];
                this.pages = res.data.data['count'];
            }, function (res) {
                alert("程序崩掉了");
            });
        },
        addRole: function () {
            this.msg['status'] = Number(this.msg['status']);
            this.$http.post(ajaxUrl.addRole, {
                'msg': JSON.stringify(this.msg)
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.msg.id = res.data.data;
                this.roleList.push(this.msg);
                this.msg = {};
                this.msg.status = 1;

            }, function (res) {
                alert("程序崩掉了");
            });
        },
        editRoleid: function (id, key) {
            this.editid = id;
            this.editmsg = this.roleList[key];
        },
        editRole: function () {
            this.editmsg['status'] = Number(this.editmsg['status']);
            this.$http.post(ajaxUrl.editRole, {
                msg: JSON.stringify(this.editmsg)
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    this.getRoleList();
                    return false;
                }
                this.editmsg = {};
            }, function (res) {
                alert("程序崩掉了");
            });
        },
        delTmp: function (id, key) {
            this.delid = id;
            this.delkey = key;
        },
        delRole: function (id) {
            this.$http.post(ajaxUrl.delRole, {
                id: id
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.roleList = this.roleList.filter(function (item) {
                    return item.id != id;
                });
                this.deleteId = '';

            }, function (res) {
            });
        },
        pageList: function (curPage) {
            //根据当前页获取数据
            this.pageNo = curPage;
            this.getRoleList(this.pageNo);
            // console.log("当前页：" + this.pageNo);
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getRoleList();
        });
    }
});