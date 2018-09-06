<?php

namespace app\index\controller;

use gmars\rbac\Rbac;
use think\Controller;
use think\config;

class Index extends Controller
{
    public function index()
    {
        $css = config('style_path.css_path');
        $js = config('style_path.js_path');
        $img = config('style_path.img_path');
        $picture = config('style_path.picture_path');
        $this->assign(array(
            'css' => $css,
            'js' => $js,
            'img' => $img,
            'picture' => $picture
        ));
        return view('index@index/index');
    }

    public function test()
    {
        $rbacObj = new Rbac();
        $data = ['user_name' => 'zhangsan', 'status' => 1, 'password' => md5('zhangsan')];
        $rbacObj->createUser($data);
    }
}
