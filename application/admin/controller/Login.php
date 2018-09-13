<?php
/**
 * Created by PhpStorm.
 * User: Mikou
 * Date: 2018/9/13 0013
 * Time: 22:04
 */

namespace app\admin\controller;


use think\Controller;

class Login extends Controller
{
    public function index()
    {
        return view('admin@login/index');
    }
}