<?php
/**
 * Created by PhpStorm.
 * User: Mikou
 * Date: 2018/9/9 0009
 * Time: 17:15
 */

namespace app\admin\controller;

use think\Controller;
use think\Db;
use think\Request;

class Blog extends Controller
{
    public function _initialize()
    {
        parent::_initialize(); // TODO: Change the autogenerated stub
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
    }

    public function index()
    {
        return view('admin@blog/index');
    }

    public function add()
    {
        return view('admin@blog/add');
    }

    public function addBlog(Request $request)
    {
        $input= $request->post();

        $data = json_decode($input['msg'],true);

        if(!isset($data['title']) || empty($data['title']) || !isset($data['category_id']) || empty($data['category_id']) || !isset($data['summary']) || empty($data['summary']) || !isset($data['content']) || empty($data['content']) ){
            $this->ajaxReturnMsg(201,'参数错误','');
        }
        $img = base64_image_content($data['pic'],'upload/blog/');
        if(!$img){
            $this->ajaxReturnMsg(202,'上传失败','');
        }
        $param = $data;
        $param['pic'] = $img;
        $param['create_time'] = date('Y-m-d H:i:s',time());
        Db::name('blog')->insert($param);
        $this->ajaxReturnMsg(200, 'success', '');
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