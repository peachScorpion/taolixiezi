<?php
/**
 * @desc 前台留言板类
 * @date 2017-06-02
 * @author taolixiezi <[411496785@qq.com]>
 */
namespace app\home\controller;
use think\Controller;

class Message extends Controller{
    /**
	 * @desc 留言板
	 * @date 2017-06-02
	 * @author taolixiezi <[411496785@qq.com]>
	 */
    public function index() {
        $this->title = '留言板';
        $this->view('index_view_message');
    }
}
