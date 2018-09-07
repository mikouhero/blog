vm = new Vue({
    el: '.page-content',
    data: {
        menuList: '',
        addName:'',
        addUrl:'',
        addStatus:'',
        addParentname:'',
        addParentid:''
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
        },
        addTemp:function (id,name) {
            this.addParentname = name;
            this.addParentid= id;
        },
        addMenu:function () {
            
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getHomeMenu();
        });
    }
});