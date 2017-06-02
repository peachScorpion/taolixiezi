<?php
/**
 * @desc 前台关于我类
 * @date 2017-06-02
 * @author taolixiezi <[411496785@qq.com]>
 */
namespace app\home\controller;
use think\Controller;

class About extends Controller{
    /**
	 * @desc 主页
	 * @date 2017-06-02
	 * @author taolixiezi <[411496785@qq.com]>
	 */
    public function index() {
        $this->title = '关于我';
        $this->view('index_view_about');
    }
}
