<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:61:"D:\phpStudy\WWW\YZNCMS/apps/home\view\knowledge\index.tpl.php";i:1496385524;s:59:"D:\phpStudy\WWW\YZNCMS/apps/home\view\public\header.tpl.php";i:1496385543;}*/ ?>
<!doctype html>
<html>

<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?a6653e96b23c01334bd5cbdcadc9abe2";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>

<head>
<meta charset="utf-8">
<title><?php echo '桃李蝎子部落格'; ?></title>
<meta name="Keywords" content="桃李蝎子" >
<meta name="Description" content="桃李蝎子" >
<meta content="yes" name="apple-mobile-web-app-capable"/>
<meta content="black" name="apple-mobile-web-app-status-bar-style"/>
<link type="image/x-icon" rel="shortcut icon" href="http://tp2.sinaimg.cn/2212116293/180/5695179355/0" /></head>
<link href="__STATIC__/index/css/index.css" rel="stylesheet">
<link href="__STATIC__/index/css/header.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" media="screen,print" href="__STATIC__/index/js/effect/star/star.css" />
<!--[if lt IE 9]>
<script src="<?php //echo sb::assets_url() ?>js/modernizr.js"></script>
<![endif]-->
</head>
<body>
<header>
    <div id="example" class="flash-replaced" style="float:left;margin-top:-75px;margin-left:-10px;">
        <EMBED width="273" height="273" type="application/x-shockwave-flash" pluginspage=http://www.macromedia.com/go/getflashplayer src="__STATIC__/index/flash/time4.swf" wmode="transparent" quality="best"></EMBED>
    </div>
    <div class="quotes" style="height:150px">
      <p>初遇时，她的微笑，她往日的深情、承诺和傻劲，两个人共度的美丽时刻，一一印在回忆里，今天的感情已经比不上从前，但是我爱着恋着往日的她，舍不得离开。</p>
      <div class="text5">记录·回忆</div>
      <div class="flower"><img src="__STATIC__/index/images/flower.jpg"></div>
    </div>
    <!--小人start*-->
    <div id="spig" class="spig">
        <div id="message">正在加载中……</div>
        <div id="mumu" class="mumu"></div>
    </div>
    <!--小人end*-->
  <!--nav begin-->
  <div id="nav">
    <ul>
      <li><a href="<?php echo url('index/index'); ?>">首页</a></li>
      <li><a href="<?php echo url('knowledge/index'); ?>">学海无涯</a></li>
      <li><a href="<?php echo url('slowlife/index'); ?>">慢生活</a></li>
      <li><a href="<?php echo url('mood/index'); ?>">碎言碎语</a></li>
      <li><a href="<?php echo url('share/index'); ?>">图片分享</a></li>
      <li><a href="<?php echo url('message/index'); ?>">留言板</a></li>
      <li><a href="<?php echo url('about/index'); ?>">关于我</a></li>
    </ul>
  </div>
  <!--nav end--> 
  <!--cenav start--> 
<!--    <div class='card-holder'>
        <div class='card-wrapper'>
          <a href='#'>
            <div class='card bg-01'>
              <span class='card-content'>item #1</span>
            </div>
          </a>
        </div>
        <div class='card-wrapper'>
          <a href='#'>
            <div class='card bg-02'>
              <span class='card-content'>long menu item #2</span>
            </div>
          </a>
        </div>
        <div class='card-wrapper'>
          <a href='#'>
            <div class='card bg-03'>
              <span class='card-content'>menu item #3</span>
            </div>
          </a>
        </div>
        <div class='card-wrapper'>
          <a href='#'>
            <div class='card bg-04'>
              <span class='card-content'>item #4</span>
            </div>
          </a>
        </div>
        <div class='card-wrapper'>
          <a href='#'>
            <div class='card bg-05'>
              <span class='card-content'>menu item #5</span>
            </div>
          </a>
        </div>
        <div class='card-wrapper'>
          <a href='#'>
            <div class='card bg-06'>
              <span class='card-content'>long menu item #1</span>
            </div>
          </a>
        </div>
    </div>-->
  <!--cenav end--> 
</header>
    
<!-- JiaThis Button BEGIN -->
<script type="text/javascript" src="http://v3.jiathis.com/code/jiathis_r.js?btn=r1.gif" charset="utf-8"></script>
<!-- JiaThis Button END -->

<!-- Today Flower BEGIN -->
<canvas id="today_flower" style="display:none;position: fixed;z-index: 999 "></canvas>
<script>
var b = document.body;
var c = document.getElementsByTagName('canvas')[0];
var a = c.getContext('2d');
document.body.clientWidth;
</script>
<script>
// start of submission //
with (m = Math) C = cos, S = sin, P = pow, R = random; c.width = c.height = f = 500; h = -250; function p(a, b, c) { if (c > 60) return [S(a * 7) * (13 + 5 / (.2 + P(b * 4, 4))) - S(b) * 50, b * f + 50, 625 + C(a * 7) * (13 + 5 / (.2 + P(b * 4, 4))) + b * 400, a * 1 - b / 2, a]; A = a * 2 - 1; B = b * 2 - 1; if (A * A + B * B < 1) { if (c > 37) { n = (j = c & 1) ? 6 : 4; o = .5 / (a + .01) + C(b * 125) * 3 - a * 300; w = b * h; return [o * C(n) + w * S(n) + j * 610 - 390, o * S(n) - w * C(n) + 550 - j * 350, 1180 + C(B + A) * 99 - j * 300, .4 - a * .1 + P(1 - B * B, -h * 6) * .15 - a * b * .4 + C(a + b) / 5 + P(C((o * (a + 1) + (B > 0 ? w : -w)) / 25), 30) * .1 * (1 - B * B), o / 1e3 + .7 - o * w * 3e-6] } if (c > 32) { c = c * 1.16 - .15; o = a * 45 - 20; w = b * b * h; z = o * S(c) + w * C(c) + 620; return [o * C(c) - w * S(c), 28 + C(B * .5) * 99 - b * b * b * 60 - z / 2 - h, z, (b * b * .3 + P((1 - (A * A)), 7) * .15 + .3) * b, b * .7] } o = A * (2 - b) * (80 - c * 2); w = 99 - C(A) * 120 - C(b) * (-h - c * 4.9) + C(P(1 - b, 7)) * 50 + c * 2; z = o * S(c) + w * C(c) + 700; return [o * C(c) - w * S(c), B * 99 - C(P(b, 7)) * 50 - c / 3 - z / 1.35 + 450, z, (1 - b / 1.2) * .9 + a * .1, P((1 - b), 20) / 4 + .05] } } setInterval('for(i=0;i<1e4;i++)if(s=p(R(),R(),i%46/.74)){z=s[2];x=~~(s[0]*f/z-h);y=~~(s[1]*f/z-h);if(!m[q=y*f+x]|m[q]>z)m[q]=z,a.fillStyle="rgb("+~(s[3]*h)+","+~(s[4]*h)+","+~(s[3]*s[3]*-80)+")",a.fillRect(x,y,1,1)}', 0)
// end of submission //
</script>
<!-- Today Flower END -->
<!-- Star END -->

<!-- generated by: jsdo.it - http://jsdo.it/haii/5vSL -->
<!-- Copyright haii - http://jsdo.it/haii -->
<!-- Licensed under MIT License - http://www.opensource.org/licenses/mit-license.php -->
<canvas id="today_star" style="display:none;position: fixed;z-index: 998 "></canvas>
<!--引入动画人物效果-->
<script type="text/javascript" src="__STATIC__/index/js/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="__STATIC__/index/js/jquery-1.7.2.js"></script>
<script type="text/javascript" src="__STATIC__/index/js/effect/star/star.js"></script>
<script type="text/javascript" src="__STATIC__/index/js/spig.js"></script>
<link rel="stylesheet" href="__STATIC__/index/css/spigPet.css" type="text/css"/>
<!--<script language="javascript" type="text/javascript" src="http://182.50.124.221:9004/resouce/cps.js"></script>-->

<script type="text/javascript">
//首页标志
var isindex = true;
//可替换访问者
var visitor = true;
</script>
<!--引入动画人物效果-->
<!-- Star END -->
</head>
<link href="__STATIC__/index/css/base.css" rel="stylesheet">
<article id='container'>
    <div class="bloglist left">
        <h2 class="title_tj">
            <p>文章<span>推荐</span></p>
        </h2>
        <h3>程序员请放下你的技术情节，与你的同伴一起进步</h3>
        <figure><img src="__STATIC__/index/images/001.png"></figure>
        <ul>
            <p>如果说掌握一门赖以生计的技术是技术人员要学会的第一课的话， 那么我觉得技术人员要真正学会的第二课，不是技术，而是业务、交流与协作，学会关心其他工作伙伴的工作情况和进展...</p>
            <a title="阅读全文" href="<?php echo url('knowledge/index'); ?>" target="_blank" class="readmore">阅读全文>></a>
        </ul>
        <p class="dateview"><span>2013-11-04</span><span>作者：杨青</span><span>个人博客：[<a href="/news/life/">程序人生</a>]</span></p>
        <h3>程序员请放下你的技术情节，与你的同伴一起进步</h3>
        <figure><img src="__STATIC__/index/images/001.png"></figure>
        <ul>
            <p>如果说掌握一门赖以生计的技术是技术人员要学会的第一课的话， 那么我觉得技术人员要真正学会的第二课，不是技术，而是业务、交流与协作，学会关心其他工作伙伴的工作情况和进展...</p>
            <a title="阅读全文" href="<?php echo url('knowledge/index'); ?>" target="_blank" class="readmore">阅读全文>></a>
        </ul>
        <p class="dateview"><span>2013-11-04</span><span>作者：杨青</span><span>个人博客：[<a href="/news/life/">程序人生</a>]</span></p>
        <h3>程序员请放下你的技术情节，与你的同伴一起进步</h3>
        <figure><img src="__STATIC__/index/images/001.png"></figure>
        <ul>
            <p>如果说掌握一门赖以生计的技术是技术人员要学会的第一课的话， 那么我觉得技术人员要真正学会的第二课，不是技术，而是业务、交流与协作，学会关心其他工作伙伴的工作情况和进展...</p>
            <a title="阅读全文" href="<?php echo url('knowledge/index'); ?>" target="_blank" class="readmore">阅读全文>></a>
        </ul>
        <p class="dateview"><span>2013-11-04</span><span>作者：杨青</span><span>个人博客：[<a href="/news/life/">程序人生</a>]</span></p>
        <h3>程序员请放下你的技术情节，与你的同伴一起进步</h3>
        <figure><img src="__STATIC__/index/images/001.png"></figure>
        <ul>
            <p>如果说掌握一门赖以生计的技术是技术人员要学会的第一课的话， 那么我觉得技术人员要真正学会的第二课，不是技术，而是业务、交流与协作，学会关心其他工作伙伴的工作情况和进展...</p>
            <a title="阅读全文" href="<?php echo url('knowledge/index'); ?>" target="_blank" class="readmore">阅读全文>></a>
        </ul>
        <p class="dateview"><span>2013-11-04</span><span>作者：杨青</span><span>个人博客：[<a href="/news/life/">程序人生</a>]</span></p>
        <h3>程序员请放下你的技术情节，与你的同伴一起进步</h3>
        <figure><img src="__STATIC__/index/images/001.png"></figure>
        <ul>
            <p>如果说掌握一门赖以生计的技术是技术人员要学会的第一课的话， 那么我觉得技术人员要真正学会的第二课，不是技术，而是业务、交流与协作，学会关心其他工作伙伴的工作情况和进展...</p>
            <a title="阅读全文" href="<?php echo url('knowledge/index'); ?>" target="_blank" class="readmore">阅读全文>></a>
        </ul>
        <p class="dateview"><span>2013-11-04</span><span>作者：杨青</span><span>个人博客：[<a href="/news/life/">程序人生</a>]</span></p>
    </div>
    <aside class="right">
        <div class="weather"><iframe width="250" scrolling="no" height="60" frameborder="0" allowtransparency="true" src="http://i.tianqi.com/index.php?c=code&id=12&icon=1&num=1"></iframe></div>
        <div class="news">
            <h3>
                <p>最新<span>文章</span></p>
            </h3>
            <ul class="rank">
                <li><a href="/" title="with love for you 个人网站模板" target="_blank">with love for you 个人网站模板</a></li>
                <li><a href="/" title="免费收录网站搜索引擎登录口大全" target="_blank">免费收录网站搜索引擎登录口大全</a></li>
                <li><a href="/" title="做网站到底需要什么?" target="_blank">做网站到底需要什么?</a></li>
                <li><a href="/" title="企业做网站具体流程步骤" target="_blank">企业做网站具体流程步骤</a></li>
                <li><a href="/" title="建站流程篇——教你如何快速学会做网站" target="_blank">建站流程篇——教你如何快速学会做网站</a></li>
                <li><a href="/" title="box-shadow 阴影右下脚折边效果" target="_blank">box-shadow 阴影右下脚折边效果</a></li>
                <li><a href="/" title="打雷时室内、户外应该需要注意什么" target="_blank">打雷时室内、户外应该需要注意什么</a></li>
            </ul>
            <h3 class="ph">
                <p>点击<span>排行</span></p>
            </h3>
            <ul class="paih">
                <li><a href="/" title="withlove for you 个人网站模板" target="_blank">with love for you 个人网站模板</a></li>
                <li><a href="/" title="免费收录网站搜索引擎登录口大全" target="_blank">免费收录网站搜索引擎登录口大全</a></li>
                <li><a href="/" title="做网站到底需要什么?" target="_blank">做网站到底需要什么?</a></li>
                <li><a href="/" title="企业做网站具体流程步骤" target="_blank">企业做网站具体流程步骤</a></li>
            </ul>
            <h3 class="links">
                <p>友情<span>链接</span></p>
            </h3>
            <ul class="website">
                <li><a href="http://weibo.com/u/2212116293">桃李蝎子的新浪微博</a></li>
                <li><a href="http://www.jiawo.com/link.php?linkcode=16c0AVVSCQkJBwMDAlFTBQRWUAdXVQEHBABVBwZUVwc">佳沃+市集</a></li>
            </ul> 
        </div>  
        <!-- Baidu Button BEGIN -->
<!--        <div id="bdshare" class="bdshare_t bds_tools_32 get-codes-bdshare"><a class="bds_tsina"></a><a class="bds_qzone"></a><a class="bds_tqq"></a><a class="bds_renren"></a><span class="bds_more"></span><a class="shareCount"></a></div>
        <script type="text/javascript" id="bdshare_js" data="type=tools&amp;uid=6574585" ></script> 
        <script type="text/javascript" id="bdshell_js"></script> 
        <script type="text/javascript">
            document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + Math.ceil(new Date() / 3600000)
        </script> -->
        <!-- Baidu Button END -->   
        <h3 class="links">
            <p>桃李蝎子公众号<span>链接</span></p>
        </h3>
        <a href="/" class="weixin"> </a></aside>
</article> 