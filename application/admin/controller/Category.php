<?php
/**
 * Created by PhpStorm.
 * User: Mikou.hu
 * Date: 2018/9/7
 */

namespace app\admin\controller;

use think\Controller;
use think\Db;
use think\Request;

class Category extends Controller
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

        return view('admin@category/index');
    }

    public function getMenuList()
    {
        $list = Db::name('category')->field('id,name,url,font,status,sort')->where('status', '1')->where('parent_id', 0)->select();
        foreach ($list as $k => $v) {
            $child_result = Db::name('category')->field('id,name,url,font,status,sort')->where('parent_id', $v['id'])->select();
            $list[$k]['child'] = $child_result;
        }
        $this->ajaxReturnMsg(200, 'success', $list);
    }


    public function addMenu(Request $request)
    {
        $data = $request->post();
        if (!isset($data['name']) || empty($data['name']) || !isset($data['url']) || empty($data['url']) || !isset($data['status']) || !isset($data['sort']) || empty($data['sort'])) {
            $this->ajaxReturnMsg(201, '缺少参数', '');
        }
        $param = $data;
        $param['create_time'] = date('Y-m-d H:i:s');
        Db::name('category')->insert($param);
        $this->ajaxReturnMsg(200, 'success', '');

    }

    public function editMenu(Request $request)
    {
        $data = $request->post();

        if (!isset($data['msg']['id']) || empty($data['msg']['id']) || !isset($data['msg']['name']) || empty($data['msg']['name']) || !isset($data['msg']['url']) || empty($data['msg']['url']) || !isset($data['msg']['status']) || !isset($data['msg']['sort']) || empty($data['msg']['sort'])) {
            $this->ajaxReturnMsg(201, '缺少参数', '');
        }
        $param = $data['msg'];
        unset($param['child']);
        Db::name('category')->where('id', $param['id'])->update($param);
        $this->ajaxReturnMsg(200, 'success', '');

    }

    public function deleteMenu(Request $request)
    {
        $data = $request->post();

        if (!isset($data['id']) || empty($data['id'])) {
            $this->ajaxReturnMsg(201, '缺少参数', '');
        }
        $falg = Db::name('category')->where('id', $data['id'])->count();
        if (!$falg) {
            $this->ajaxReturnMsg(201, '网络错误', '');
        }
        Db::name('category')->where('id', $data['id'])->delete();

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