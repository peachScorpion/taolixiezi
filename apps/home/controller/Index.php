<?php
/**
 * @desc 前台首页类
 * @date 2017-06-02
 * @author taolixiezi <[411496785@qq.com]>
 */
namespace app\home\controller;
use think\Controller;

class Index extends Controller{
	/**
	 * @desc 首页
	 * @date 2017-06-02
	 * @author taolixiezi <[411496785@qq.com]>
	 */
    public function index(){
		return $this->fetch();
    }

    /**
	 * @desc 学海无涯
	 * @date 2017-06-02
	 * @author taolixiezi <[411496785@qq.com]>
	 */
    public function knowledge() {
        $this->title = '学海无涯';

        $where = "1";
        //$where .= $this->get_where();
        // 获取总数
        $total_argv = array('where' => $where, 'fields' => array('count(1) AS num'));
        $total_res = $this->knowledge_obj->select($total_argv);
        $total = isset($total_res[0]['num']) ? (int) $total_res[0]['num'] : 0;

        // 获取页数
        $page_num = (int) pf_request::get('page_num', 1);
        $page_num > 1 ? $page_num : 1;

        $limit = 5;

        $argv = array(
            'where' => $where,
            'limit' => $limit,
            'offset' => ($page_num - 1) * $limit,
            'order' => 'id DESC'
        );

        $artile_list = $this->knowledge_obj->select($argv);

        //引用框架分页类
        pf_load::include_lib('pf_page');
        $page_obj = new pf_page(array('total' => $total, 'perpage' => $limit));
        $pages = $page_obj->show(6);

        $this->assign('artile_list', $artile_list);
        $this->assign('pages', $pages);
        $this->assign('title', $this->title);

        $this->view('index_view_knowledge');
    }

    /**
     * 慢生活
     */
    /**
	 * @desc 学海无涯
	 * @date 2017-06-02
	 * @author taolixiezi <[411496785@qq.com]>
	 */
    public function slowLife() {
        $this->title = '慢生活';
        
        $where = "1";
//        $where .= $this->get_where();
  
        // 获取总数
		$total_argv = array('where'=>$where, 'fields'=>array('count(1) AS num'));
		$total_res = $this->life_obj->select($total_argv);
		$total = isset($total_res[0]['num']) ? (int)$total_res[0]['num'] : 0;
        
        // 获取页数
		$page_num = (int)pf_request::get('page_num', 1);
		$page_num > 1 ? $page_num : 1;
        
        $limit = 5;

        $argv = array(
            'where' => $where,
            'limit' => $limit,
            'offset' => ($page_num - 1) * $limit ,
            'order' => 'id DESC'
        );

        $artile_list = $this->life_obj->select($argv);
       
        //引用框架分页类
        pf_load::include_lib('pf_page');
        $page_obj = new pf_page(array('total' => $total,'perpage'=>$limit));
        $pages = $page_obj->show(6);

        $this->assign('artile_list', $artile_list);
        $this->assign('pages', $pages);
        
        $this->view('index_view_slowlife');
    }

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

    /**
     * 图片分享
     */
    /**
	 * @desc 学海无涯
	 * @date 2017-06-02
	 * @author taolixiezi <[411496785@qq.com]>
	 */
    public function share() {
        $this->title = '图片分享';
        $this->view('index_view_share2');
    }

    /**
     * 留言板
     */
    /**
	 * @desc 学海无涯
	 * @date 2017-06-02
	 * @author taolixiezi <[411496785@qq.com]>
	 */
    public function message() {
        $this->title = '留言板';
        $this->view('index_view_message');
    }

    /**
     * 关于我
     */
    public function about() {
        $this->title = '关于我';
        $this->view('index_view_about');
    }

    /**
     * 文章详情
     */
    public function detail() {
		
        $where = "1";
        $id = (int) (pf_request::get('id'));
        $title = trim(pf_request::get('title'));
        $where = $where . " and id = '$id' ";
        $argv = array(
            'where' => $where
        );
        
        $obj = trim(pf_request::get('obj'));
        
        $artile_list = $this->{$obj}->select($argv);
        $this->{$obj}->addcount($id);
        //计数++
//        $class_count = pf_load::init('index_class_readcount');
//        $class_count->addcount($id,$obj);
		
		$count_order = $this->getCountOrder($obj);
		$date_order = $this->getDateOrder($obj);
		
        $this->assign('artile_list', $artile_list);
		$this->assign('count_order', $count_order);
		$this->assign('date_order', $date_order);
		$this->assign('obj', $obj);
        $this->assign('title', $title);
        $this->view('index_view_detail');
    }
	
	function getCountOrder($obj){
		$argv = array(
			'where' => "1",
            'order' => "clickcount DESC"
        );
        $artile_list = $this->{$obj}->select($argv);
		
		return $artile_list;
	}
    
	function getDateOrder($obj){
		$argv = array(
			'where' => "1",
            'order' => "public_time DESC"
        );
        $artile_list = $this->{$obj}->select($argv);
		
		return $artile_list;
	}
	
    /**
     * 文章详情
     */
    public function shareDetail() {

       
        $this->view('index_view_sharedetail');
    }

    public function shareFull() {

        $this->view('index_view_sharefull');
    }
}
