<?php
/**
 * @desc 前台学海无涯类
 * @date 2017-06-02
 * @author taolixiezi <[411496785@qq.com]>
 */
namespace app\home\controller;
use think\Controller;

class knowledge extends Controller{
	/**
     * @desc 学海无涯
     * @date 2017-06-02
     * @author taolixiezi <[411496785@qq.com]>
     */
    public function index() {
        // $this->title = '学海无涯';

        // $where = "1";
        // //$where .= $this->get_where();
        // // 获取总数
        // $total_argv = array('where' => $where, 'fields' => array('count(1) AS num'));
        // $total_res = $this->knowledge_obj->select($total_argv);
        // $total = isset($total_res[0]['num']) ? (int) $total_res[0]['num'] : 0;

        // // 获取页数
        // $page_num = (int) pf_request::get('page_num', 1);
        // $page_num > 1 ? $page_num : 1;

        // $limit = 5;

        // $argv = array(
        //     'where' => $where,
        //     'limit' => $limit,
        //     'offset' => ($page_num - 1) * $limit,
        //     'order' => 'id DESC'
        // );

        // $artile_list = $this->knowledge_obj->select($argv);

        // //引用框架分页类
        // pf_load::include_lib('pf_page');
        // $page_obj = new pf_page(array('total' => $total, 'perpage' => $limit));
        // $pages = $page_obj->show(6);

        // $this->assign('artile_list', $artile_list);
        // $this->assign('pages', $pages);
        // $this->assign('title', $this->title);

        return $this->fetch();
    }
}
