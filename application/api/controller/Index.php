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
    /**
     * 获取导航栏
     */
    public function getMenuList()
    {
        $list = Db::name('category')->field('id,name,url,font')->where('status', '1')->where('parent_id', 0)->select();
        foreach ($list as $k => $v) {
            $child_result = Db::name('category')->field('id,name,url,font')->where('status', '1')->where('parent_id', $v['id'])->select();
            $list[$k]['child'] = $child_result;
        }
        $this->ajaxReturnMsg(200, 'success', $list);
    }

    /**
     * 背景图
     */
    public function getBannerList()
    {
        $list = Db::name('banner')->field('id,pic,title,url')->where('status', '1')->select();
        $this->ajaxReturnMsg(200, 'success', $list);
    }

    /**
     * Decription :推荐
     * @author: Mikou.hu
     * Date: 2018/9/19
     */
    public function getRecommend()
    {
        $list = Db::name('blog')
            ->field('id,title,content,pic,create_time')
            ->where('recommend',1)->order('id','desc')
            ->limit(9)->select();
        foreach ($list as $k => $v ){
            $list[$k]['content'] = preg_replace('/\s/','',strip_tags($v['content']));
            $list[$k]['create_time'] = date('m-d',strtotime($v['create_time']));
        }

        $this->ajaxReturnMsg(200, 'success', $list);

    }


    /**
     * Decription :最近更新
     * @author: Mikou.hu
     * Date: 2018/9/19
     */
    public function getRecontBlog()
    {
        $list = Db::name('blog')
            ->alias('p1')
            ->join('blog_category p2','p1.id = p2.blog_id','left')
            ->join('category p3','p2.category_id = p3.id','left')
            ->field('p1.id,p1.title,p1.content,p1.pic,p1.create_time,p1.see_count,p1.comment_count,p3.name as category')
            ->where('recommend',1)->order('id','desc')
            ->order('id','desc')
            ->limit(6)->select();
        foreach ($list as $k => $v ){
            $list[$k]['content'] = preg_replace('/\s/','',strip_tags($v['content']));
            $list[$k]['create_time'] = date('Y-m-d',strtotime($v['create_time']));
        }

        $this->ajaxReturnMsg(200, 'success', $list);

    }

    public function getPhpBlog()
    {
        $list = Db::name('blog')
            ->alias('p1')
            ->field('p1.id,p1.title,p1.content,p1.pic,p1.create_time')
            ->join('category p2','p2.id = p1.category_id','left')
            ->where('p2.parent_id',2)
            ->order('id','desc')
            ->limit(3)->select();
        foreach ($list as $k => $v ){
            $list[$k]['content'] = preg_replace('/\s/','',strip_tags($v['content']));
            $list[$k]['create_time'] = date('Y-m-d',strtotime($v['create_time']));
        }

        $this->ajaxReturnMsg(200, 'success', $list);
    }

    public function getMySQLBlog()
    {
        $list = Db::name('blog')
            ->alias('p1')
            ->field('p1.id,p1.title,p1.content,p1.pic,p1.create_time')
            ->join('category p2','p2.id = p1.category_id','left')
            ->where('p2.parent_id',2)
            ->order('id','desc')
            ->limit(6)->select();
        foreach ($list as $k => $v ){
            $list[$k]['content'] = preg_replace('/\s/','',strip_tags($v['content']));
            $list[$k]['create_time'] = date('m-d',strtotime($v['create_time']));
        }

        $this->ajaxReturnMsg(200, 'success', $list);
    }

    public function getJsBlog()
    {
        $list = Db::name('blog')
            ->alias('p1')
            ->field('p1.id,p1.title,p1.content,p1.pic,p1.create_time')
            ->join('category p2','p2.id = p1.category_id','left')
            ->where('p2.parent_id',2)
            ->order('id','desc')
            ->limit(6)->select();
        foreach ($list as $k => $v ){
            $list[$k]['content'] = preg_replace('/\s/','',strip_tags($v['content']));
            $list[$k]['create_time'] = date('m-d',strtotime($v['create_time']));
        }

        $this->ajaxReturnMsg(200, 'success', $list);
    }
    public function getLinuxBlog()
    {
        $list = Db::name('blog')
            ->alias('p1')
            ->field('p1.id,p1.title,p1.content,p1.pic,p1.create_time')
            ->join('category p2','p2.id = p1.category_id','left')
            ->where('p2.parent_id',2)
            ->order('id','desc')
            ->limit(6)->select();
        foreach ($list as $k => $v ){
            $list[$k]['content'] = preg_replace('/\s/','',strip_tags($v['content']));
            $list[$k]['create_time'] = date('m-d',strtotime($v['create_time']));
        }

        $this->ajaxReturnMsg(200, 'success', $list);
    }
    public function getCiBlog()
    {
        $list = Db::name('blog')
            ->alias('p1')
            ->field('p1.id,p1.title,p1.content,p1.pic,p1.create_time')
            ->join('category p2','p2.id = p1.category_id','left')
            ->where('p2.parent_id',2)
            ->order('id','desc')
            ->limit(6)->select();
        foreach ($list as $k => $v ){
            $list[$k]['content'] = preg_replace('/\s/','',strip_tags($v['content']));
            $list[$k]['create_time'] = date('m-d',strtotime($v['create_time']));
        }

        $this->ajaxReturnMsg(200, 'success', $list);
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