<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:44:"E:\yzncms/apps/admin\view\aboutus\index.html";i:1494841218;}*/ ?>
<div class="ncap-about">
  <div class="left-pic"></div>
  <div class="version">
    <h2>YZNCMS内容管理系统v1.0.0</h2>
    <h4>2017.05.15版</h4>
    <hr>
    <h5>安装日期：2017-05-15</h5>
  </div>
  <div class="content">
    <div class="scroll switchbox">
      <ul class="tema">
        <li>
          <h4>源码提供 - 御宅男工作室</h4>
          <p>码云：<a href="http://git.oschina.net/ken678/YZNCMS" target="_blank">http://git.oschina.net/ken678/YZNCMS</a></p>
          <p>唯一QQ账号：530765310(御宅男)</p>
          <p>对代码反馈或意见请提交到码云issues</p>
        </li>
      </ul>
    </div>
    <!-- 代码结束 -->
    <div class="scrollbar switchbox" style="display: none;">
      <div class="law-notice">
        <p>程序来源：御宅男工作室 <a href="http://www.yzncms.com" target="_blank">http://www.yzncms.com</a>。</p>
          感谢您选择Yzncms内容管理系统。Yzncms是完全开源的项目，基于ThinkPHP5.08最新版,框架易于功能扩展，代码维护，方便二次开发，帮助开发者简单高效降低二次开发成本，满足专注业务深度开发的需求。</p>
        <p>Yzncms内容管理对本版本只用户学习和研究，您使用过程中产生的利益与Yzncms无关，我们不负任何法律责任！</p>
        <p>尊爱网络环境！禁止非法传播。</p>
      </div>
    </div>
    <div class="switchbox" style="display:none;">
      <ul>
        <li>
          <h4>致产品用户</h4>
          <p>非常感谢您们对好商城产品的大力支持和信任，我们将一如既往地站在用户立场去开发产品，为用户的利益尽职尽责。Yzncms用户的完全满意就是我们奋斗的目标；您们所提出的任何有价值产意见和建议都是本公司的宝贵财富，并将激励我们更加努力地工作，不断改进提高，最终为贵方提供更优质的的产品与服务。</p>
        </li>
        <li>
          <h4>关注我们</h4>
          <p>官方网站 <a href="http://www.yzncms.com" target="_blank">http://www.yzncms.com</a></p>
          <p>获知Yzncms的最新版本动态，获得个性化的服务或获取我们的具体联系方式</p>
        </li>
        <li>
          <h4>相关声明</h4>
          <p>本项目引用了以下开源项目&nbsp;:&nbsp;&nbsp;jQuery,kindeditor等.&nbsp;原作者拥有其所有版权 </p>
        </li>
      </ul>
    </div>
  </div>
  <div class="btns"><a href="javascript:void(0);" onclick="about_change(0)" class="ncap-btn ncap-btn-green">开发团队</a><a href="javascript:void(0);" onclick="about_change(1)" class="ncap-btn">法律声明</a><a href="javascript:void(0);" onclick="about_change(2)" class="ncap-btn">致用户</a></div>
</div>
<script type="text/javascript">
$(function(){
	$("div.scroll").myScroll({
		speed:30,
		rowHeight:60
	});
	$("div.scrollbar").perfectScrollbar();
});
function about_change(i) {
    $(".switchbox").hide().eq(i).show();
    $(".btns > a").removeClass("ncap-btn-green").eq(i).addClass("ncap-btn-green");
    if (i == 0) {
        $("div.scroll").myScroll({
            speed:30,
            rowHeight:60
        });
    }
}
</script>