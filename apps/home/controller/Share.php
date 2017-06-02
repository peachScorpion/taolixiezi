<?php
/**
 * @desc前台所有页面，包括[首页、学海无涯、慢生活、碎言碎语、图片分享、留言板、关于我]
 * @date 2017-06-02
 * @author taolixiezi <[411496785@qq.com]>
 */
namespace app\home\controller;
use think\Controller;

class Share extends Controller{
    /**
	 * @desc 图片分享
	 * @date 2017-06-02
	 * @author taolixiezi <[411496785@qq.com]>
	 */
    public function index() {
        $this->title = '图片分享';
        $this->view('index_view_share2');
    }
}
