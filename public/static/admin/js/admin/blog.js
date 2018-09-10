vm = new Vue({
    el: '.page-content',
    data: {
        menuList:'',
        child:{},
        msg:{"recommend":0},
        blogList:{},
        current_page:1,
        pagesize:10
    },
    methods: {
        getBlogList:function () {
            this.$http.post(ajaxUrl.getBlogList, {
                pagesize :this.pagesize,
                current_page:this.current_page
            }, {
                emulateJSON: true
            }).then(function (res) {
                if (res.data.code != 200) {
                    alert(res.data.msg);
                    return false;
                }
                this.blogList = res.data.data;
            }, function (res) {
                alert("程序崩掉了");
            });
        },
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
                alert("程序崩掉了");
            });
        },
        mchange:function () {
            var category = $('#category').val();
            this.child = [];
            var child = '';
            if(category){
                var list = this.menuList;
                for(var i=0;i<list.length;i++){
                    if(list[i]['id'] == category){
                        this.child = list[i]['child'];
                        if(list[i]['child'].length){
                            child = $('#categorychild').val();
                        }
                        break;
                    }
                }

            }
            this.msg['category_id'] = child || category;
        },
        addBlog:function () {
            var content = $('.markdown-body').html();
            var mackdown = $('#mackdown').val();
            var pic = $('#result').val();
            this.msg['content'] = content;
            this.msg['mackdown'] = mackdown;
            this.msg['pic'] = pic;
            this.msg['recommend'] = Number(this.msg['recommend']);
            this.$http.post(ajaxUrl.addBlog, {
                'msg' : JSON.stringify(this.msg)
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
        choosefile:function (name) {
            $("#"+name).hide().click();
        },
        base64:function (name1,name2,name3) {
            var file = $("#"+name1).get(0).files[0];
            //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
            if(!/image\/\w+/.test(file.type)){
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                $("#"+name2).attr('src',this.result);
                $("#"+name2).attr('width',300);
                $("#"+name3).html(this.result);
                // result.innerHTML = this.result;
                // img_area.innerHTML = '<div class="sitetip">图片img标签展示：</div><img src="'+this.result+'" alt=""/>';
            };
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getHomeMenu();
            this.getBlogList();
        });
    }
});