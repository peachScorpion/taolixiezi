<?php
/**
 * @desc 前台碎言碎语类
 * @date 2017-06-02
 * @author taolixiezi <[411496785@qq.com]>
 */
namespace app\home\controller;
use think\Controller;

class Mood extends Controller{
	/**
     * @desc 碎言碎语
     * @date 2017-06-02
     * @author taolixiezi <[411496785@qq.com]>
     */
    public function mood() {
        $this->title = '碎言碎语';
        
        $where = "1";
//        $where .= $this->get_where();
  
        // 获取总数
        $total_argv = array('where'=>$where, 'fields'=>array('count(1) AS num'));
        $total_res = $this->mood_obj->select($total_argv);
        $total = isset($total_res[0]['num']) ? (int)$total_res[0]['num'] : 0;
        
        // 获取页数
        $page_num = (int)pf_request::get('page_num', 1);
        if($page_num <= 0) $page_num = 1;
        if($page_num >= $total) $page_num = $total;
        
        $limit = 20;

        $argv = array(
            'where' => $where,
            'limit' => $limit,
            'offset' => ($page_num - 1) * $limit ,
            'order' => 'id DESC'
        );

        $artile_list = $this->mood_obj->select($argv);
       
        //引用框架分页类
        pf_load::include_lib('pf_page');
        $page_obj = new pf_page(array('total' => $total,'perpage'=>$limit));
        $pages = $page_obj->show(2);

        $this->assign('artile_list', $artile_list);
        $this->assign('pages', $pages);

        $this->view('index_view_mood');
    }
}
