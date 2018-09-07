<?php
/**
 * Created by PhpStorm.
 * User: Mikou.hu
 * Date: 2018/9/7
 */

namespace app\admin\controller;

use think\Controller;
use think\Db;

class Category extends Controller
{
    public function index()
    {
        $css = config('style_path.admin_css_path');
        $js = config('style_path.admin_js_path');
        $img = config('style_path.admin_img_path');
        $picture = config('style_path.admin_picture_path');
        $this->assign(array(
            'css' => $css,
            'js' => $js,
            'img' => $img,
            'picture' => $picture
        ));
        return view('admin@category/index');
    }

    public function getMenuList()
    {
        $list = Db::name('category')->field('id,name,url,font')->where('status','1')->where('parent_id',0)->select();
        foreach ($list as $k => $v) {
            $child_result = Db::name('category')->field('id,name,url,font')->where('status','1')->where('parent_id',$v['id'])->select();
            $list[$k]['child'] = $child_result;
        }
        $this->ajaxReturnMsg(200,'success',$list);
    }


    private function ajaxReturnMsg($code = 200, $msg, $data, $api_id = 0)
    {
//        $this->api->end($api_id,$code,$msg,$data);
        header('Access-Control-Allow-Origin: *');//跨域
        header('Content-type: application/json');
        echo json_encode(array('code' => $code, 'msg' => $msg, 'data' => $data));
        die;
    }
}