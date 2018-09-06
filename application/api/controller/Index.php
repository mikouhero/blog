<?php
/**
 * Created by PhpStorm.
 * User: Mikou.hu
 * Date: 2018/9/6
 */

namespace app\api\controller;


use think\Controller;
use think\Db;

class Index extends Controller
{
    public function getMenuList()
    {
        $list = Db::name('home_menu')->field('id,name,url,font')->where('status','1')->where('parent_id',0)->select();
        foreach ($list as $k => $v) {
            $child_result = Db::name('home_menu')->field('id,name,url,font')->where('status','1')->where('parent_id',$v['id'])->select();
            $list[$k]['child'] = $child_result;
        }
        $this->ajaxReturnMsg(200,'success',$list);
    }

    public function getBannerList()
    {
        $list = Db::name('home_banner')->field('id,pic,status,url')->where('status','1')->select();
        $this->ajaxReturnMsg(200,'success',$list);
    }

    private function ajaxReturnMsg($code=200,$msg,$data,$api_id=0) {
//        $this->api->end($api_id,$code,$msg,$data);
        header('Access-Control-Allow-Origin: *');//跨域
        header('Content-type: application/json');
        echo json_encode(array('code'=>$code,'msg'=>$msg,'data'=>$data));
        die;
    }
}