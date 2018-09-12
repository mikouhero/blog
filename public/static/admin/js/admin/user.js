vm = new Vue({
    el: '.page-content',
    data: {
        random: ['label-success', 'label-warning', 'label-danger', 'label-info', 'label-purple', 'label-inverse', 'label-pink', 'label-yellow', 'label-grey', 'label-primary', 'label-light'],
        userList: '',
        pageNo: 1,   // 当前页数
        pages: 0,    //  多少页
        roleList: {},
        msg: {},
        msg: {'status': 1},
        editid: '',
        editmsg: {},
        delid: '',
        delkey: '',
        rolekey:'',
        hasRole:{},
        nohasRole:{}
    },
    methods: {
        getUserList: function () {
            this.$http.post(ajaxUrl.getUserList, {
                current_page: this.pageNo
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.userList = res.data.data['list'];
                this.pages = res.data.data['count'];
                this.roleList = res.data.data['roleList'];
            }, function (res) {
                alert("程序崩掉了");
            });
        },
        addUser: function () {
            this.msg['status'] = Number(this.msg['status']);
            this.$http.post(ajaxUrl.addUser, {
                'msg': JSON.stringify(this.msg)
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.msg.id = res.data.data;
                this.userList.push(this.msg);
                this.msg = {};
                this.msg.status = 1;

            }, function (res) {
                alert("程序崩掉了");
            });
        },
        editUserid: function (id, key) {
            this.editid = id;
            this.editmsg = this.userList[key];
        },
        editUser: function () {
            this.editmsg['status'] = Number(this.editmsg['status']);
            this.$http.post(ajaxUrl.editUser, {
                msg: JSON.stringify(this.editmsg)
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    this.getUserList();
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
        delUser: function (id) {
            this.$http.post(ajaxUrl.delUser, {
                id: id
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.userList = this.userList.filter(function (item) {
                    return item.id != id;
                });
                this.deleteId = '';

            }, function (res) {
            });
        },
        pageList: function (curPage) {
            //根据当前页获取数据
            this.pageNo = curPage;
            this.getUserList(this.pageNo);
            // console.log("当前页：" + this.pageNo);
        },
        tmp: function (key) {   //
            this.rolekey = key;
            this.hasRole = this.userList[key]['role'];
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getUserList();
        });
    }
});