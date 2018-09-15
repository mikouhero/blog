vm = new Vue({
    el: '.page-content',
    data: {
        menuList: '',
        child: {},
        msg: {"recommend": 0},
        blogList: {},
        pageNo: 1,   // 当前页数
        pages: 0,    //  多少页
        div: '',
        editItem: {},
    },
    methods: {
        getBlogList: function () {
            this.$http.post(ajaxUrl.getBlogList, {
                current_page: this.pageNo
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.blogList = res.data.data['list'];
                this.pages = res.data.data['count'];
            }, function (res) {
                alert("程序崩掉了");
            });
        },
        getHomeMenu: function () {
            this.$http.post(ajaxUrl.getMenuList, {}, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.menuList = res.data.data;
            }, function (res) {
                alert("程序崩掉了");
            });
        },
        mchange: function () {
            var category = $('#category').val();
            this.child = [];
            var child = '';
            if (category) {
                var list = this.menuList;
                for (var i = 0; i < list.length; i++) {
                    if (list[i]['id'] == category) {
                        this.child = list[i]['child'];
                        if (list[i]['child'].length) {
                            child = $('#categorychild').val();
                        }
                        break;
                    }
                }

            }
            this.msg['category_id'] = child || category;
        },
        addBlog: function () {
            var content = $('.markdown-body').html();
            var mackdown = $('#mackdown').val();
            var pic = $('#result').val();
            this.msg['content'] = content;
            this.msg['mackdown'] = mackdown;
            this.msg['pic'] = pic;
            this.msg['recommend'] = Number(this.msg['recommend']);
            this.$http.post(ajaxUrl.addBlog, {
                'msg': JSON.stringify(this.msg)
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }

            }, function (res) {
                alert("程序崩掉了");
            });
        },
        choosefile: function (name) {
            $("#" + name).hide().click();
        },
        base64: function (name1, name2, name3) {
            var file = $("#" + name1).get(0).files[0];
            //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                $("#" + name2).attr('src', this.result);
                $("#" + name2).attr('width', 300);
                $("#" + name3).html(this.result);
                // result.innerHTML = this.result;
                // img_area.innerHTML = '<div class="sitetip">图片img标签展示：</div><img src="'+this.result+'" alt=""/>';
            };
        },
        pageList: function (curPage) {
            //根据当前页获取数据
            this.pageNo = curPage;
            this.getBlogList(this.pageNo);
            // console.log("当前页：" + this.pageNo);
        },
        tmp: function (key) {
            this.div = this.blogList[key].content;
        },
        edit: function (id, key) {
           localStorage.setItem(key,JSON.stringify(this.blogList[key]));

            console.log(JSON.parse(localStorage.getItem(key)));

            location.href = url + '/blog/edit?id=' + id + '&key=' + key;
        },
        editmsg: function () {
            var key =this.getKey('key');
            this.editItem=JSON.parse(localStorage.getItem(key));
        },
        getKey: function (paraName) {

            var url = document.location.toString();
            var arrObj = url.split("?");
            if (arrObj.length > 1) {
                var arrPara = arrObj[1].split("&");
                var arr;

                for (var i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split("=");
                    if (arr !== null && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return false;
            }
            else {
                return false;
            }
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getHomeMenu();
            this.getBlogList();
            this.editmsg();
        });
    }
});