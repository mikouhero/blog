<?php
/**
 * Created by PhpStorm.
 * User: Mikou
 * Date: 2018/9/20 0020
 * Time: 21:15
 */

namespace app\api\controller;


use think\Controller;
use think\Db;
use think\Request;

class Details extends Controller
{
    public function getAllPhpList(Request $request)
    {
        $data = $request->post();
        $current_page = $data['current_page'];
        $pagesize = 10;
        $start = ($current_page - 1) * $pagesize;
        $list = Db::name('blog')
            ->alias('p1')
            ->field('p1.id,p1.title,p1.content,p1.pic,p1.create_time')
            ->join('category p2','p2.id = p1.category_id','left')
            ->where('p2.parent_id',2)
            ->order('id','desc')
            ->limit($start,$pagesize)->select();
        foreach ($list as $k => $v ){
            $list[$k]['content'] = preg_replace('/\s/','',strip_tags($v['content']));
            $list[$k]['create_time'] = date('Y-m-d',strtotime($v['create_time']));
        }
        $count = Db::name('user')->count();
        $res = array(
            'list' => $list,
            'count' => ceil($count / $pagesize)
        );
        $this->ajaxReturnMsg(200, 'success', $res);
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