<?php
/**
 * Created by PhpStorm.
 * User: Mikou
 * Date: 2018/9/13 0013
 * Time: 22:04
 */

namespace app\admin\controller;


use think\Controller;
use think\Request;
use think\Db;
use think\Session;

class Login extends Controller
{
    public function index()
    {
        return view('admin@login/index');
    }

    public function dologin(Request $request)
    {
        $data = $request->post();
        if (!isset($data['user_name']) || empty($data['user_name']) || !isset($data['password']) || empty($data['password'])) {
            $this->ajaxReturnMsg(201, '参数错误', '');
        }
        //1 用户是否存在
        $user = Db::name('user')->where('user_name', $data['user_name'])->find();
        if (!$user) {
            $this->ajaxReturnMsg(201, '用户不存在', '');
        }

        if (0 == $user['status']) {
            $this->ajaxReturnMsg(201, '该账户已被锁定，请联系管理员', '');
        }

        //2.判断密码是否正确
        $password = md5($data['password']);
        if ($password != $user['password']) {
            //密码不对，记录连续错误次数
            $param = array();
            if ($user['error_times'] == 0) {//记录首次错误登录时间
                $param['error_start_time'] = date("Y-m-d H:i:s");
            }
            $param['error_times'] = $user['error_times'] + 1;
            //判断当前时间是否已过首次错误密码的第二天凌晨
            if (!empty($user['error_start_time'])) {
                $error_end_time = strtotime(date("Y-m-d", strtotime($user['error_start_time']))) + 24 * 3600;
                if (time() > $error_end_time) {
                    $param['error_times'] = 1;
                    $param['error_start_time'] = date("Y-m-d H:i:s");
                }
            }
            Db::name('user')->where('id', $user['id'])->update($param);

            //如果错误次数超过限制，锁定状态
            if (config('user_lock_times') > 0) {
                if ($param['error_times'] > config('user_lock_times')) {
                    $param = array();
                    $param['status'] = 0;
                    Db::name('user')->where('id', $user['id'])->update($param);
                    $this->ajaxReturnMsg(201, '该账户输入密码错误超过' . config('user_lock_times') . '次，已被锁定', '');
                }
            }
            //返回错误信息
            $this->ajaxReturnMsg(201, '用户名或密码错误', '');
        } else {
            //密码正确，清除错误次数
            $param = array();
            $param['error_times'] = 0;
            $param['status'] =1;
            Db::name('user')->where('id', $user['id'])->update($param);
        }

        //3.判断该用户是否锁定
        if (0 == $user['status']) {
            $this->ajaxReturnMsg(201, '该账户已被锁定，请联系管理员', '');
        }

        // 4 存session
        Session::set('manger_user', array('id' => $user['id'], 'user_name' => $user['user_name']));

        //5.记录登录日志

        $param = array();
        $param['login_name'] = $user['user_name'];
        $request = Request::instance();
        $ip_address = $request->ip();
        $param['service_ip'] = $ip_address = $request->ip();;//登录ip地址
        $param['login_time'] = date("Y-m-d H:i:s");
        Db::name('login_log')->insert($param);
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