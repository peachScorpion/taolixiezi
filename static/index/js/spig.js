/* spig.js */

var url_pre = "http://taolixiezi.sinaapp.com/go.php?";
//对话标志位
var say_sign= 0;
//这里修改鼠标右击时间
jQuery(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        if(e.which==3){
			showMessage("主人，您嫌弃我了么<input type='button' onclick='rebotdisplay()' value='滚开'>",10000);
		}
			

});
$("#spig").bind("contextmenu", function(e) {
    return false;
});
});

function rebotdisplay(){
	$("#spig").css("display","none");
}

//这里是鼠标在消息上时
jQuery(document).ready(function ($) {
    $("#message").hover(function () {
       $("#message").fadeTo("100", 1);
     });
});


//这里鼠标在上方时需要的修改
jQuery(document).ready(function ($) {
    //$(".mumu").jrumble({rangeX: 2,rangeY: 2,rangeRot: 1});
    $(".mumu").mouseover(function () {
       $(".mumu").fadeTo("300", 0.3);
       msgs = ["我可是会隐身的哟", "我不会出来的！", "就不出来，且！", "出来又能把我怎么样！！！"];
       var i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i]);
    });
    $(".mumu").mouseout(function () {
        $(".mumu").fadeTo("300", 1)
    });
});

//刷新载入页面时候会根据设置的hour时间显示
//isindex表示是否主页载入
jQuery(document).ready(function ($) {
    if (isindex) { //如果是主页
        
        var myaction_a = $('#myaction_a').val();
//        alert(isindex);
        switch(isindex){
                    case 'knowledge':
			showMessage('学海无涯！！', 6000);
                        break;
                     case 'slowLife':
			showMessage('慢生活！！', 6000);
                        break;
                     case 'mood':
			showMessage('碎言碎语！！', 6000);
                        break;
                     case 'share':
			showMessage('图片分享！！', 6000);
                        break;   
                     case 'message':
			showMessage('留言板！！', 6000);
                        break;  
                     case 'about':
			showMessage('关于我！！', 6000);
                        break;    
                     default:
                        var now = (new Date()).getHours();
//						showMessage( ' <img src="resource/images/says/best.png" />', 12000);
						
                        if (now > 0 && now <= 8) {
                            showMessage( ' 我是桃李蝎子，居然还不睡觉', 6000);
                        } else if (now > 8 && now <= 11) {
                            showMessage( ' 我是桃李蝎子，又要上班了好无聊。。。', 6000);
                        } else if (now > 11 && now <= 13) {
                            showMessage( ' 我是桃李蝎子，中午的时光真难熬！还好有你在！', 6000);
                        } else if (now > 13 && now <= 17) {
                            showMessage( ' 我是桃李蝎子，是时候打瞌睡了。。。', 6000);
                        } else {
                            showMessage( ' 我是桃李蝎子，快来逗我玩吧！', 6000);
                        }
                        break;
                }      
    
    }
    else {
        showMessage('欢迎来到桃李蝎子的BLOG', 6000);
    }
    $(".spig").animate({
        top: $(".spig").offset().top + 500,
        left: document.body.offsetWidth/5
    },
	{
	    queue: false,
	    duration: 1000
	});
});

//这里鼠标在某些元素上方时
//设置当前页面中的该元素触发事件
jQuery(document).ready(function ($) {
    $('h2 a').click(function () {//标题被点击时
        showMessage('正在用吃奶的劲加载《<span style="color:#0099cc;">' + $(this).text() + '</span>》请稍候');
    });
    $('h2 a').mouseover(function () {
        showMessage('要看看《<span style="color:#0099cc;">' + $(this).text() + '</span>》这篇文章么？');
    });
    $('#prev-page').mouseover(function(){
        showMessage('要翻到上一页吗?');
    });
    $('#next-page').mouseover(function(){
        showMessage('要翻到下一页吗?');
    });
    $('#index-links li a').mouseover(function () {
        showMessage('去 <span style="color:#0099cc;">' + $(this).text() + '</span> 逛逛');
    });
    $('.comments').mouseover(function () {
        showMessage('<span style="color:#0099cc;">' + visitor + '</span> 向评论栏出发吧！');
    });
    $('#submit').mouseover(function () {
        showMessage('确认提交了么？');
    });
    $('#s').mouseover(function () {
        showMessage('输入你想搜索的关键词再按Enter(回车)键就可以搜索啦!');
    });
    $('#go-prev').mouseover(function () {
        showMessage('点它可以后退哦！');
    });
    $('#go-next').mouseover(function () {
        showMessage('点它可以前进哦！');
    });
    $('#refresh').mouseover(function () {
        showMessage('点它可以重新载入此页哦！');
    });
    $('#go-home').mouseover(function () {
        showMessage('点它就可以回到首页啦！');
    });
    $('#addfav').mouseover(function () {
        showMessage('点它可以把此页加入书签哦！');
    });
    $('#nav-two a').mouseover(function () {
        showMessage('嘘，从这里可以进入控制面板的哦！');
    });
    $('.post-category a').mouseover(function () {
        showMessage('点击查看此分类下得所有文章');
    });
    $('.post-heat a').mouseover(function () {
        showMessage('点它可以直接跳到评论列表处.');
    });
    $('#tho-shareto span a').mouseover(function () {
        showMessage('你知道吗?点它可以分享本文到'+$(this).attr('title'));
    });
    $('#switch-to-wap').mouseover(function(){
        showMessage('点击可以切换到手机版博客版面');
    });
	//机器人对话功能
	$('#dialogue').focus(function(){
		//得到焦点 开启回话模式
        showMessage('你想对我说什么？');
		say_sign = 1;
		say_setting();
		//设置位置 当前屏幕中心
    });
	$('#dialogue').blur(function(){
		//失去焦点 关闭回话模式
		$('#mysay').css('display','block');
                $('.side-bar').css('width','10%');
		$('#dialogue').css('display','none');
                deal_over();
                showMessage('终于自由咯!');
		say_sign = 0;
		//设置自由位置
    });
	$('#dialogue').keydown(function(e){
                deal_over();
		//判断是否输入完毕
		if(e.keyCode==13){
			//标志回车
			words = $('#dialogue').val();
			var dealsign = deal_seay(words);
			if( !dealsign ){
				if( words.length <= 0 ){
					showMessage('你不说我也不说。。。');
				}else{
					
					
					tosay(words);
				}
			}
		}
	}); 
});

    function deal_over(){
        $("#today_flower").fadeOut(2000);
        $("#today_star").fadeOut(2000); 
    }
    
	function deal_seay(word){
            
                switch(word){
                    case '下雪':
                        $.getScript('resource/js/effect/snow.src.js');
						showMessage('以后的冬天，桃李蝎子都要陪天天去看雪！！');
						$('#dialogue').val('');
                        return true;
                        break;
                    case '桃李蝎子':
                        //$('#today_flower').css("display","block");
//                        $("#today_flower").css("left",document.body.offsetWidth/2);
//                        $("#today_flower").css("top",document.body.scrollTop + document.body.offsetHeight/2);
                        $("#today_flower").fadeIn(1000);
                        $("#today_star").fadeIn(2000);
                        showMessage('感谢和桃李蝎子的遇见！希望有一天你也愿意相信这个人,相信着自己,在未来和梦想的路上一起披荆斩棘');
                        return true;
                        break;
                    case '玫瑰花':
                        //$('#today_flower').css("display","block");
//                        $("#today_flower").css("left",document.body.offsetWidth/2);
//                        $("#today_flower").css("top",document.body.scrollTop + document.body.offsetHeight/2);
                        $("#today_flower").fadeIn(2000);
                        showMessage('桃李蝎子的红玫瑰');
                        return true;
                        break;       
                    case '星星':
                        //$('#today_flower').css("display","block");
//                        $("#today_flower").css("left",document.body.offsetWidth/2);
//                        $("#today_flower").css("top",document.body.scrollTop + document.body.offsetHeight/2);
                        $("#today_star").fadeIn(2000);
                        showMessage('来自星星的老大0.0');
                        return true;
                        break;    
                }
                
                
//		if( word == '下雪' ){
//			$.getScript('resource/js/effect/snow.src.js');
//			showMessage('以后的冬天，桃李蝎子都要陪天天去看雪！！');
//			$('#dialogue').val('');
//			return true;
//		}	
	}
	
	function tosay(words)
	{   
			var url = url_pre + "c=rebot&a=getreply&question=" + words;
	//    var track_id = 0;
		$.ajax({
				type: "get",
				timeout : 1000, //超时时间设置，单位毫秒
				url: url,
				async: false,
				success: function(msg) {
					// msg = getMsg(msg);
					//msg = deal_after(words,msg);
					showMessage(msg);
					$('#dialogue').val('');
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					
	//            alert(123);
				}
		});
	 
	 
	}
	
	function deal_after(words,msg){
			//switch(words){
              //      case '笑话':
			//			var obj = eval('(' + msg + ')');
            //            var changemsg = "标题:"+obj.title+"<br>内容："+obj.content;
            //            msg = changemsg;
			//		break;
			//}
		return msg;
	}
	
	function getMsg(msg)
	{	
		alert(msg.title);
		var replys = '';
		if( msg.title.length > 0 ){
			replys = replys + '标题：' + msg.title + '<br>' + msg.content;
		}else{
			replys = msg;
		}
		return replys;
	}
	
	//开启对话模式小人设置
	function say_setting(){
		s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6,0.7,0.75,-0.1, -0.2, -0.3, -0.4, -0.5, -0.6,-0.7,-0.75];
		var i1 = Math.floor(Math.random() * s.length);
		$(".spig").animate({
		left: document.body.offsetWidth/2*(1+s[i1]),
		top: $(window).scrollTop() + 300
				});
	}


//设置无触发事件的时候更新一些信息
jQuery(document).ready(function ($) {

    window.setInterval(function () {
		if(say_sign == 0){
			msgs = ["播报天气<iframe name=\"xidie\" src=\"http://i.tianqi.com/index.php?c=code&id=11\"frameborder=\“0\” scrolling=\"no\" height=\"15px\"  width=\"130px\" allowtransparency=\"true\" ></iframe>", "陪我聊天吧！",  "好无聊哦，你都不陪我玩！", "你是猴子排来的逗比么！嘻嘻!~^_^!~~","大脸猫，大脸猫，爱吃鱼，嘻嘻嘻，嘻嘻嘻。。。"];
			var i = Math.floor(Math.random() * msgs.length);
			showMessage(msgs[i], 10000);
		}		
    }, 35000);
});

//设置无触发事件的时候乱跑一跑 好吸引注意力0,0
jQuery(document).ready(function ($) {

		window.setInterval(function () {
			if(say_sign == 0){
				msgs = ["播报天气<iframe name=\"xidie\" src=\"http://i.tianqi.com/index.php?c=code&id=11\"frameborder=\“0\” scrolling=\"no\" height=\"15px\"  width=\"130px\" allowtransparency=\"true\" ></iframe>", "乾坤大挪移！", "我飘过来了！~", "我飘过去了", "我得意地飘！~飘！~"];
				var i = Math.floor(Math.random() * msgs.length);
				s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6,0.7,0.75,-0.1, -0.2, -0.3, -0.4, -0.5, -0.6,-0.7,-0.75];
				var i1 = Math.floor(Math.random() * s.length);
				var i2 = Math.floor(Math.random() * s.length);
					$(".spig").animate({
					left: document.body.offsetWidth/2*(1+s[i1]),
					top:  document.body.offsetHeight/2*(1+s[i1])
				},
					{
						duration: 2000,
						complete: showMessage(msgs[i])
					});
			}else{
				say_setting();
					
			}		
		}, 8000);
			
});

//元素点击的时候触发的事件 这都是很有用的哟
jQuery(document).ready(function ($) {
    $("#author").click(function () {
        showMessage("留下你的尊姓大名！");
        $(".spig").animate({
            top: $("#author").offset().top - 70,
            left: $("#author").offset().left - 170
        },
		{
		    queue: false,
		    duration: 1000
		});
    });
    $("#email").click(function () {
        showMessage("留下你的邮箱，不然就是无头像人士了！");
        $(".spig").animate({
            top: $("#email").offset().top - 70,
            left: $("#email").offset().left - 170
        },
		{
		    queue: false,
		    duration: 1000
		});
    });
    $("#url").click(function () {

        showMessage("快快告诉我你的家在哪里，好让我去参观参观！");
        $(".spig").animate({
            top: $("#url").offset().top - 70,
            left: $("#url").offset().left - 170
        },
		{
		    queue: false,
		    duration: 1000
		});
    });
    $("#comment").click(function () {
        showMessage("认真填写哦！不然会被认作垃圾评论的！我的乖乖~");
        $(".spig").animate({
            top: $("#comment").offset().top - 70,
            left: $("#comment").offset().left - 170
        },
		{
		    queue: false,
		    duration: 1000
		});
    });
});

var spig_top = 50;
//滚动条移动 会有延迟飞下来的效果
jQuery(document).ready(function ($) {
    var f = $(".spig").offset().top;
    $(window).scroll(function () {
        $(".spig").animate({
            top: $(window).scrollTop() + f +300
        },
		{
		    queue: false,
		    duration: 1000
		});
    });
});

//这里鼠标点击时触发的事件
jQuery(document).ready(function ($) {
    var stat_click = 0;
    $(".mumu").click(function () {
        if (!ismove) {
            stat_click++;
            if (stat_click > 4) {
                msgs = ["你有完没完呀？", "你已经摸我" + stat_click + "次了", "无语。。。。。。"];
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            } else {
                msgs = ["筋斗云！~我飞！", "我跑呀跑呀跑！~~", "唱起小歌：有个姑凉叫美芳，长得温柔又漂亮。。。", "当我想你的时候。。。", "你抓不住我的哈哈！"];
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            }
        s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6,0.7,0.75,-0.1, -0.2, -0.3, -0.4, -0.5, -0.6,-0.7,-0.75];
        var i1 = Math.floor(Math.random() * s.length);
        var i2 = Math.floor(Math.random() * s.length);
            $(".spig").animate({
            left: document.body.offsetWidth/2*(1+s[i1]),
            top:  document.body.offsetHeight/2*(1+s[i1])
            },
			{
			    duration: 500,
			    complete: showMessage(msgs[i])
			});
        } else {
            ismove = false;
        }
    });
});
//显示消息函数 
function showMessage(a, b) {
    if (b == null) b = 10000;
    jQuery("#message").hide().stop();
    jQuery("#message").html(a);
    jQuery("#message").fadeIn();
    jQuery("#message").fadeTo("1", 1);
    jQuery("#message").fadeOut(b);
};

//这里是拖动时候触发的事件
var _move = false;
var ismove = false; //移动标记
var _x, _y; //鼠标离控件左上角的相对位置
jQuery(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt($("#spig").css("left"));
        _y = e.pageY - parseInt($("#spig").css("top"));
     });
    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x; 
            var y = e.pageY - _y;
            var wx = $(window).width() - $('#spig').width();
            var dy = $(document).height() - $('#spig').height();
            if(x >= 0 && x <= wx && y > 0 && y <= dy) {
                $("#spig").css({
                    top: y,
                    left: x
                }); //控件新位置
            ismove = true;
            }
        }
    }).mouseup(function () {
        _move = false;
    });
});



//结束。。。