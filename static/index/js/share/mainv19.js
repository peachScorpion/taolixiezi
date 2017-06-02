jQuery(document).ready(function($) {
    // 页面跳转交互 add by rays
    $('.page_number_input').focus(function(event) {
        $(this).css({'margin-right':'0px', 'border': '1px solid #FF5F83'});
        $('#page_submit').show();
    });
    $('#search_submit').click(function(){
        if($("#query").val() == "精彩专辑等你发掘！" || $("#query").val() == ""){
            $("#query").val('').focus();
            return false;
        } else {
            return true;
        }
    });
    // app下载
    // $('#app_ad').click(function(event) {
    // 	$(this).after('<div>点击右上角下载</div>');
    // });
});

try{top.location.href.indexOf('x');}catch(e){try{top.location=self.location;}catch(e){}}
unopenItemId = null;
(function($) {
    $.fn.topbar = function(){
        $('body').append('<div class="topbar_photobar"><div id="photobar" class="photobar"><div class="thumbs albums" id="sets"><a href="#" class="prev"></a><div class="thumbsWrapper"><ul></ul></div><a href="#" class="next"></a><span class="images_toggle">图片拖放到专辑图标上即可加入专辑  <a id="topbar_album_create" target="_blank" href="/album/create">新建专辑</a></span></div><div class="thumbs images" id="images" style="bottom:-125px;"><a href="#" class="prev"></a><div class="thumbsWrapper"><ul></ul></div><a href="#" class="next"></a></div><a id="topbar_toggle" class="toggle">专辑</a></div></div>');
        var current	= -1;
        var continueNavigation = false;
        var albums_api = '/myalbums';

        var $setsContainer 		= $('#sets').find('ul');
        var $photosContainer 	= $('#images').find('ul');

        var ul_width,spacefit,fit;
        window.showAlbumBar = function(){
            if($.browser.msie){
                if(parseInt($.browser.version,10)==6){
                    $("#sets").css("height","96px");
                    $('#topbar_toggle').css('top',parseInt($('#topbar_toggle').css("top"))-96);
                }
            }
            $('#photobar').stop().animate({'bottom':'0px'},200,null, function(){
                if($setsContainer.is(':empty')){
                    $(".images_toggle").show();
                    $("#footer").css('margin-bottom','130px');
                    LoadSets();
                } else {
                    $(".images_toggle").show();
                    $("#footer").css('margin-bottom','130px');
                }
            });
        };
        window.hideAlbumBar = function(){
            if($.browser.msie){
                if(parseInt($.browser.version,10)==6){
                    $("#sets").css("height","0");
                    $('#topbar_toggle').css('top',parseInt($('#topbar_toggle').css("top"))+96);
                }
            }
            $(".images_toggle").hide();
            $('#photobar').stop().animate({'bottom':'-96px'},200,function(){
                $('#images').css('bottom','-125px');
            });
        };
        $('#topbar_toggle').toggle(window.showAlbumBar, window.hideAlbumBar);

        window.initDroppable = function(){
            $('a[id*="_drop_"]', $setsContainer).droppable({
                tolerance: 'pointer',
                over:function(ev,ui){
                    unopenItemId = ui.draggable.modelId();
                },
                drop:function(ev,ui){
                    var obj=$(this);
                    var act=obj.modelType();
                    var oid=obj.modelId();
                    ui.draggable.show(1, function () {
                        var type=$(this).modelType();
                        var id=$(this).modelId();
                        $.get('/do?t='+type+'&i='+id+'&act='+act+'&o='+oid, function(data){
                            $('img' ,obj).replaceWith(data);
                        });
                    });
                    ev.preventDefault();
                }
            });
            setTimeout(function(){
                $('a[id*="_drop_"]', $setsContainer).droppable("disable");
                $(document.body).scrollTop($(document.body).scrollTop()+10);
                $('a[id*="_drop_"]', $setsContainer).droppable("enable");
            }, 100);
        }

        function LoadSets(){
            $.getJSON(albums_api,function(data){
                var sets_count = data.count;
                ul_width = sets_count * 112 + 85;
                $setsContainer.css('width',ul_width + 'px');
                for(var i = 0; i < sets_count; ++i){
                    var $elem 			= $('<li />');
                    var $link 			= $('<a id="aa_drop_'+data.items[i].id+'" target="_blank" href="'+data.items[i].url+'" ><span>'+data.items[i].name+'</span><img src="'+data.items[i].src+'" /></a>');
                    $setsContainer.append($elem.append($link));
                }

                window.initDroppable();
            });
        }

        var scrollAllow = true;
        $('#sets,#images').find('.next').bind('click',function(e) {
            var target_id = $(e.target).parent().attr('id');

            var $theContainer;
            if(target_id == 'sets')
                $theContainer = $setsContainer;
            else if(target_id == 'images')
                $theContainer = $photosContainer;

            if(scrollAllow){
                scrollAllow		= false;
                spacefit 		= $(window).width() -44;
                fit 			= Math.floor(spacefit / 112);
                var left 		= parseFloat($theContainer.css('left'),10);
                var moveleft 	= left - (fit*112);
                if(ul_width - Math.abs(left) < $(window).width()){
                    scrollAllow = true;
                    e.preventDefault();
                    return;
                }
                $theContainer.animate({'left':moveleft+'px'},1000,function(){
                    scrollAllow = true;
                });
                e.preventDefault();
            }
        });
        $('#sets,#images').find('.prev').bind('click',function(e) {
            var target_id = $(e.target).parent().attr('id');

            var $theContainer;
            if(target_id == 'sets')
                $theContainer = $setsContainer;
            else if(target_id == 'images')
                $theContainer = $photosContainer;

            if(scrollAllow){
                scrollAllow		= false;
                spacefit 		= $(window).width() -44;
                fit 			= Math.floor(spacefit / 112);
                var left = parseFloat($theContainer.css('left'),10);
                var moveleft = left + (fit*112);
                if(left >= 0){
                    scrollAllow = true;
                    e.preventDefault();
                    return;
                }
                $theContainer.animate({'left':moveleft+'px'},1000,function(){
                    scrollAllow = true;
                });
                e.preventDefault();
            }
        });

        $('#images_toggle').bind('click',function(){
            $('#images').stop().animate({'bottom':'-125px'},200);
        });

        function resize($image){
            var widthMargin		= 10;
            var heightMargin 	= 60;
            var windowH      = $(window).height()-heightMargin;
            var windowW      = $(window).width()-widthMargin;
            $photopreview.find('.preview').css({'width':$(window).width()+'px','height':($(window).height()-25)+'px'});
            var theImage     = new Image();
            theImage.src     = $image.attr("src");
            var imgwidth     = theImage.width;
            var imgheight    = theImage.height;

            if((imgwidth > windowW)||(imgheight > windowH)){
                if(imgwidth > imgheight){
                    var newwidth 	= windowW;
                    var ratio 		= imgwidth / windowW;
                    var newheight	= imgheight / ratio;
                    theImage.height = newheight;
                    theImage.width	= newwidth;
                    if(newheight>windowH){
                        var newnewheight= windowH;
                        var newratio 	= newheight/windowH;
                        var newnewwidth = newwidth/newratio;
                        theImage.width 	= newnewwidth;
                        theImage.height	= newnewheight;
                    }
                }
                else{
                    var newheight = windowH;
                    var ratio = imgheight / windowH;
                    var newwidth = imgwidth / ratio;
                    theImage.height = newheight;
                    theImage.width= newwidth;
                    if(newwidth>windowW){
                        var newnewwidth = windowW;
                        var newratio = newwidth/windowW;
                        var newnewheight =newheight/newratio;
                        theImage.height = newnewheight;
                        theImage.width= newnewwidth;
                    }
                }
            }
            $image.css({'width':theImage.width+'px','height':theImage.height+'px'});
        }
        //window.showAlbumBar();
    };
})(jQuery);
eval(function(p,a,c,k,e,r){e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'([3467gjlmotuzA-Z]|[1-4]\\w)'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';(6($){$.fn.1V({1s:6(1W,3){7 1X=1i 1W=="1Y";3=$.1V({},$.O.2v,{1j:1X?1W:11,g:1X?11:1W,1Z:1X?$.O.2v.1Z:10,X:3&&!3.21?10:150},3);3.22=3.22||6(o){j o};3.23=3.23||3.2w;j H.Y(6(){24 $.O(H,3)})},D:6(26){j H.1k("D",26)},1z:6(26){j H.1t("1z",[26])},2x:6(){j H.1t("2x")},2y:6(3){j H.1t("2y",[3])},2z:6(){j H.1t("2z")}});$.O=6(m,3){7 V={UP:38,3g:40,3h:46,3i:9,3j:13,3k:27,3l:188,3m:33,3n:34,3o:8};7 $m=$(m).attr("1s","off").12(3.3p);7 1u;7 19="";7 1A=$.O.3q(3);7 1B=0;7 28;7 1v={29:t};7 u=$.O.3r(3,m,2A,1v);7 2a;$.1w.3s&&$(m.3t).1k("submit.1s",6(){4(2a){2a=t;j t}});$m.1k(($.1w.3s?"keypress":"keydown")+".1s",6(I){28=I.3u;switch(I.3u){1a V.UP:I.1C();4(u.14()){u.3v()}A{1l(0,E)}N;1a V.3g:I.1C();4(u.14()){u.3w()}A{1l(0,E)}N;1a V.3m:I.1C();4(u.14()){u.3x()}A{1l(0,E)}N;1a V.3n:I.1C();4(u.14()){u.3y()}A{1l(0,E)}N;1a 3.1D&&$.1E(3.1b)==","&&V.3l:1a V.3i:1a V.3j:4(2A()){I.1C();2a=E;j t}N;1a V.3k:u.1c();N;default:2B(1u);1u=2C(1l,3.1Z);N}}).2b(6(){1B++}).blur(6(){1B=0;4(!1v.29){3z()}}).3A(6(){4(1B++>1&&!u.14()){1l(0,E)}}).1k("1z",6(){7 fn=(2c.l>1)?2c[1]:11;6 2D(q,g){7 D;4(g&&g.l){1d(7 i=0;i<g.l;i++){4(g[i].D.Z()==q.Z()){D=g[i];N}}}4(1i fn=="6")fn(D);A $m.1t("D",D&&[D.g,D.o])}$.Y(1F($m.P()),6(i,o){2E(o,2D,2D)})}).1k("2x",6(){1A.1G()}).1k("2y",6(){$.1V(3,2c[1]);4("g"in 2c[1])1A.1H()}).1k("2z",6(){u.2d();$m.2d();$(m.3t).2d(".1s")});6 2A(){7 W=u.W();4(!W)j t;7 v=W.D;7 3C=$.1E(19);19=v;4(3.16==E){7 2F=$m.P();7 3D=2F.L(0,2e-1),3E=2F.L(2e+3C.l);v=3D+v+3E}A 4(3.1D&&3.16==t){7 Q=1F($m.P());4(Q.l>1){v=Q.1m(0,Q.l-1).3F(3.1b)+3.1b+v}v+=3.1b}$m.P(v);1I();$m.1t("D",[W.g,W.o]);j E}6 1l(crap,3G){4(28==V.3h){u.1c();j}7 B=$m.P();4(3.16==E){7 q=3H($(m)[0]);7 s=B.L(q-1,q),w="";4(s==" "||s=="@"){1J();u.1c();j}1d(s=q;s>0;s--){4(B.L(s,s-1)==" ")N;4(B.L(s,s-1)=="@"){w=B.L(s,q);4(w.l>5&&w.L(w.l-5,w.l)=="[/at]"){w="";N}4(B.l>q)1d(7 x=q+1;x<=B.l;x++)4(B.L(x,x-1)==" "||x==B.l){7 y=B.L(s,B.L(x,x-1)==" "?x-1:x);4(y.l>5&&y.L(y.l-5,y.l)=="[/at]"){w="";N}B=w=y}2e=s;4(w.l>15)N;B=w}}4(w=="")j}4(!3G&&B==19&&3.16==t)j;19=B;B=1K(B);4(B.l>=3.2G){$m.12(3.2H);4(!3.2f)B=B.Z();2E(B,3J,1I)}A{1J();u.1c()}};6 3H(a){7 e=0;4(!$.1w.2I){4(a.1e||a.1e=="0")e=a.1e}A try{a.2b();7 k=11;k=2J.selection.createRange();7 r=k.duplicate();r.moveToElementText(a);r.setEndPoint("EndToEnd",k);a.1e=r.2g.l-k.2g.l;a.3K=a.1e+k.2g.l;e=a.1e}catch(c){}j e}6 1F(o){4(!o){j[""]}7 Q=o.2K(3.1b);7 D=[];$.Y(Q,6(i,o){4($.1E(o))D[i]=$.1E(o)});j D}6 1K(o){4(!3.1D)j o;7 Q=1F(o);j Q[Q.l-1]}6 2h(q,2L){4(3.2h&&(1K($m.P()).Z()==q.Z())&&28!=V.3o){$m.P($m.P()+2L.L(1K(19).l));$.O.2M(m,19.l,19.l+2L.l)}};6 3z(){2B(1u);1u=2C(1I,200)};6 1I(){7 3L=u.14();u.1c();2B(1u);1J();4(3.3M){$m.1z(6(D){4(!D){4(3.1D){7 Q=1F($m.P()).1m(0,-1);$m.P(Q.3F(3.1b)+(Q.l?3.1b:""))}A $m.P("")}})}4(3L)$.O.2M(m,m.o.l,m.o.l)};6 3J(q,g){4(g&&g.l&&1B){1J();u.2N(g,q);2h(q,g[0].o);u.2O()}A{1I()}};6 2E(J,2i,3N){4(!3.2f)J=J.Z();7 g=1A.3O(J);4(g&&g.l){2i(J,g)}A 4((1i 3.1j=="1Y")&&(3.1j.l>0)){7 1L={timestamp:+24 Date()};$.Y(3.1L,6(3P,2j){1L[3P]=1i 2j=="6"?2j():2j});$.ajax({mode:"abort",port:"1s"+m.name,3Q:3.3Q,1j:3.1j,g:$.1V({q:1K(J),limit:3.X},1L),2i:6(g){7 1n=3.2k&&3.2k(g)||2k(g);1A.1M(J,1n);2i(J,1n)}})}A{u.3R();3N(J)}};6 2k(g){7 1n=[];7 2P=g.2K("\\n");1d(7 i=0;i<2P.l;i++){7 M=$.1E(2P[i]);4(M){M=M.2K("|");1n[1n.l]={g:M,o:M[0],D:3.2l&&3.2l(M,M[0])||M[0]}}}j 1n};6 1J(){$m.1N(3.2H)}};$.O.2v={3p:"ac_input",3S:"ac_results",2H:"ac_loading",2G:1,1Z:400,2f:t,1O:E,2m:t,1P:10,X:100,3M:t,1L:{},2Q:E,3T:t,3U:E,16:t,2w:6(M){j M[0]},23:11,2h:t,R:0,1D:t,1b:", ",22:6(o,J){j o.2R(24 RegExp("(?![^&;]+;)(?!<[^<>]*)("+J.2R(/([\\^\\$\\(\\)\\[\\]\\{\\}\\*\\.\\+\\?\\|\\\\])/gi,"\\\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<3V>$1</3V>");},21:E,2n:180};$.O.3q=6(3){7 g={};7 l=0;6 1O(s,2T){4(!3.2f)s=s.Z();7 i=s.indexOf(2T);4(3.2m=="2U"){i=s.Z().1z("\\\\b"+2T.Z());}4(i==-1)j t;j i==0||3.2m;};6 1M(q,o){4(l>3.1P){1G();}4(!g[q]){l++;}g[q]=o;}6 1H(){4(!3.g)j t;7 1o={},3W=0;4(!3.1j)3.1P=1;1o[""]=[];1d(7 i=0,ol=3.g.l;i<ol;i++){7 1f=3.g[i];1f=(1i 1f=="1Y")?[1f]:1f;7 o=3.23(1f,i+1,3.g.l);4(o===t)2V;7 2o=o.3Y(0).Z();4(!1o[2o])1o[2o]=[];7 M={o:o,g:1f,D:3.2l&&3.2l(1f)||o};1o[2o].2W(M);4(3W++<3.X){1o[""].2W(M);}};$.Y(1o,6(i,o){3.1P++;1M(i,o);});}2C(1H,25);6 1G(){g={};l=0;}j{1G:1G,1M:1M,1H:1H,3O:6(q){4(!3.1P||!l)j 11;4(!3.1j&&3.2m){7 1p=[];1d(7 k in g){4(k.l>0){7 c=g[k];$.Y(c,6(i,x){4(1O(x.o,q)){1p.2W(x);}});}}j 1p;}A 4(g[q]){j g[q];}A 4(3.1O){1d(7 i=q.l-1;i>=3.2G;i--){7 c=g[q.substr(0,i)];4(c){7 1p=[];$.Y(c,6(i,x){4(1O(x.o,q)){1p[1p.l]=x;}});j 1p;}}}j 11;}};};$.O.3r=6(3,m,u,1v){7 S={T:"ac_over"};7 z,C=-1,g,J="",2X=E,F,G;6 2p(){4(!2X)j;7 h=3.16==E?"<h4 id=\\"title\\">想用@提到谁？</h4>":"";F=$("<2Y/>").2q(h).1c().12(3.3S).U("2Z","41").30(2J.31);G=$("<ul/>").30(F).mouseover(6(I){4(1q(I).42&&1q(I).42.toUpperCase()==\'LI\'){C=$("li",G).1N(S.T).index(1q(I));$(1q(I)).12(S.T)}}).3A(6(I){$(1q(I)).12(S.T);u();m.2b();j t}).mousedown(6(){1v.29=E}).mouseup(6(){1v.29=t});4(3.R>0)F.U("R",3.R);2X=t}6 1q(I){7 F=I.1q;while(F&&F.tagName!="LI")F=F.parentNode;4(!F)j[];j F}6 1r(2r){z.1m(C,C+1).1N(S.T);44(2r);7 32=z.1m(C,C+1).12(S.T);4(3.21){7 K=0;z.1m(0,C).Y(6(){K+=H.1R});4((K+32[0].1R-G.1x())>G[0].clientHeight){G.1x(K+32[0].1R-G.innerHeight())}A 4(K<G.1x()){G.1x(K)}}};6 44(2r){C+=2r;4(C<0){C=z.1S()-1}A 4(C>=z.1S()){C=0}}6 45(35){j 3.X&&3.X<35?3.X:35}6 47(){G.48();7 X=45(g.l);1d(7 i=0;i<X;i++){4(!g[i])2V;7 36=3.2w(g[i].g,i+1,X,g[i].o,J);4(36===t)2V;7 li=$("<li/>").49(3.22(36,J)).12(i%2==0?"ac_even":"ac_odd").30(G)[0];$.g(li,"4a",g[i])}z=G.find("li");4(3.3T){z.1m(-1).12(S.T);C=z.l-1}A 4(3.2Q){z.1m(0,1).12(S.T);C=0}4($.fn.4b)G.4b()}6 4c(){7 p=$(m);7 c=4d(p,2e-1);4(c){7 i=p.K(),q=p.1x(),s=37(p.U("4e")),1T=[];4(isNaN(s))s=20;q=s-q;1T[\'17\']=i.17+q+c.17;1T[\'1g\']=i.1g+c.1g;1T[\'4f\']=s;j 1T}}7 4d=6(){6 a(r){7 c={"<":"&lt;",">":"&gt;",\'"\':"&quot;","\\\\":"&#92;","&":"&amp;","\'":"&#039;","\\r":"","\\n":"<br>"," ":!k?"<1h 39=\'white-space:3a-4g;\'> </1h>":"<3a 39=\'4h:hidden;2N:inline;2U-4g:N-2U;\'> </3a>"};j r.2R(/<|>|\\\'|\\"|&|\\\\|\\r\\n|\\n| /gi,6(i){j c[i]})}6 e(r){H.4i=r;H.2p()}7 k=t;4($.1w.2I&&$.1w.version<8)k=E;e.prototype={$p:11,$f:11,U:["overflowY","3b","R","paddingTop","paddingLeft","paddingRight","paddingBottom","marginTop","marginLeft","marginRight","marginBottom","fontFamily","borderStyle","borderWidth","wordWrap","fontSize","4e","overflowX"],2p:6(){7 r=H.$p=$("<2Y></2Y>"),c={opacity:0,2Z:"41",1g:0,17:0,"2g-align":"1g",zIndex:2E4},i=H.4i;$.Y(H.U,6(q,s){c[s]=i.U(s)});r.U(c);$("31").2q(r)},4j:6(r,c,i){7 q=H.$p;q.49("<1h>"+a(r)+"</1h>");H.$f=r=$("<1h>"+a(c)+"</1h>");q.2q(r);q.2q("<1h>"+a(i)+"</1h>")},4k:6(){j H.$f.2Z()}};j 6(r,c){7 i=$(r);i.g("3c")||i.g("3c",24 e(i));7 q=i.g("3c");4(!q)j{};7 s=i.P();i=s.L(0,c);7 w=s.3Y(c);s=s.L(c+1);q.4j(i,w,s);j q.4k()}}();j{2N:6(d,q){2p();g=d;J=q;47()},3w:6(){1r(1)},3v:6(){1r(-1)},3x:6(){4(C!=0&&C-8<0){1r(-C)}A{1r(-8)}},3y:6(){4(C!=z.1S()-1&&C+8>z.1S()){1r(z.1S()-1-C)}A{1r(8)}},1c:6(){F&&F.1c();z&&z.1N(S.T);C=-1},14:6(){j F&&F.is(":14")},current:6(){j H.14()&&(z.4l("."+S.T)[0]||3.2Q&&z[0])},2O:6(){7 K=3.16==t?$(m).K():4c();7 3d=F.3b();7 4m=3.3U==E?(3.16==t?K.17-3d:K.17-3d-K.4f):(3.16==t?K.17+m.1R:K.17);F.U({R:1i 3.R=="1Y"||3.R>0?3.R:$(m).R(),17:4m,1g:K.1g}).2O();4(3.21){G.1x(0);G.U({4n:3.2n,4h:\'auto\'});4($.1w.2I&&1i 2J.31.39.4n==="undefined"){7 2s=0;z.Y(6(){2s+=H.1R});7 3e=2s>3.2n;G.U(\'3b\',3e?3.2n:2s);4(!3e){z.R(G.R()-37(z.U("4o-1g"))-37(z.U("4o-right")))}}}},W:6(){7 W=z&&z.4l("."+S.T).1N(S.T);j W&&W.l&&$.g(W[0],"4a")},3R:6(){G&&G.48()},2d:6(){F&&F.remove()}}};$.O.2M=6(18,2t,2u){4(18.4p){7 1U=18.4p();1U.collapse(E);1U.moveStart("4q",2t);1U.moveEnd("4q",2u);1U.u()}A 4(18.4r){18.4r(2t,2u)}A{4(18.1e){18.1e=2t;18.3K=2u}}18.2b()}})(jQuery);',[],276,'|||options|if||function|var|||||||||data|||return||length|input||value|||||false|select|||||listItems|else|currentValue|active|result|true|element|list|this|event|term|offset|substring|row|break|Autocompleter|val|words|width|CLASSES|ACTIVE|css|KEY|selected|max|each|toLowerCase||null|addClass||visible||isAtmemode|top|field|previousValue|case|multipleSeparator|hide|for|selectionStart|rawValue|left|span|typeof|url|bind|onChange|slice|parsed|stMatchSets|csub|target|moveSelect|autocomplete|trigger|timeout|config|browser|scrollTop||search|cache|hasFocus|preventDefault|multiple|trim|trimWords|flush|populate|hideResultsNow|stopLoading|lastWord|extraParams|add|removeClass|matchSubset|cacheLength||offsetHeight|size|ret|selRange|extend|urlOrData|isUrl|string|delay||scroll|highlight|formatMatch|new||handler||lastKeyPressCode|mouseDownOnSelect|blockSubmit|focus|arguments|unbind|flagAt|matchCase|text|autoFill|success|param|parse|formatResult|matchContains|scrollHeight|firstChar|init|append|step|listHeight|start|end|defaults|formatItem|flushCache|setOptions|unautocomplete|selectCurrent|clearTimeout|setTimeout|findValueCallback|request|preStr|minChars|loadingClass|msie|document|split|sValue|Selection|display|show|rows|selectFirst|replace||sub|word|continue|push|needsInit|div|position|appendTo|body|activeItem|||available|formatted|parseInt||style|pre|height|mirror|eleh|scrollbarsVisible||DOWN|DEL|TAB|RETURN|ESC|COMMA|PAGEUP|PAGEDOWN|BACKSPACE|inputClass|Cache|Select|opera|form|keyCode|prev|next|pageUp|pageDown|hideResults|click||searchKey|str1|str2|join|skipPrevCheck|getCursorPos||receiveData|selectionEnd|wasVisible|mustMatch|failure|load|key|dataType|emptyList|resultsClass|selectLast|reverseMode|strong|nullData||charAt|||absolute|nodeName||movePosition|limitNumberOfItems||fillList|empty|html|ac_data|bgiframe|reposition|getCursorOffset|lineHeight|lineheight|wrap|overflow|ele|setContent|getPos|filter|topmode|maxHeight|padding|createTextRange|character|setSelectionRange'.split('|'),0,{}))
$(function(){
    if($.cookie("uid")){var uid = $.cookie("uid");var uname = $.cookie("uname");var uicon = $.cookie("uicon");$.getJSON('/mnum/'+uid, function(json){if(json.mnum && json.mnum != 0){$("#mnum").html('('+json.mnum+')');}});}
    if($.cookie('item-tip') != 'true') {$('#item-tip').tipsy({gravity:'w',fallback:"点击以放大"});$.cookie('item-tip', 'true', { expires: 1 });}
    if($.browser.msie){$('img[id*="_d_"]').mousedown(function(){this.setCapture();});$('img[id*="_d_"]').mouseup(function(){this.releaseCapture();});}
    $('img[id*="_d_"]').draggable({
        opacity:0.5,
        distance:10,
        revert:true,
        zIndex:2700,
        refreshPositions: true,
        start: function(event, ui){
            var _self = this;
            window.showAlbumNarTimer = setTimeout(function(){
                window.showAlbumBar();
            }, 1000); //1s
            //console.log(window.showAlbumNarTimer);
        },
        stop:function(ev,ui){
            if (window.showAlbumNarTimer) {
                //console.log("clear");
                clearTimeout(window.showAlbumNarTimer);
                window.showAlbumNarTimer = null;
            }

            var type=$(ui.helper).modelType();
            var id=$(ui.helper).modelId();
            if (unopenItemId!=id) {
                // window.open("/"+type+"/"+id);
                window.hideAlbumBar();
            } else {
            }
            unopenItemId=null;
        }
    });
    if($.cookie("uid")){var showTopbar=true;if($.browser.msie){var msieVersion=parseInt($.browser.version,10);if(msieVersion<7){showTopbar=true;}}if(showTopbar){$("body").topbar();}}
    $("div[id*='_heart_']").find('a').live('click', function(ev){$(this).parent().load(this.href);ev.preventDefault();});
    $(document).bind("keydown","s",function(){window.scrollTo(0,document.body.scrollHeight);});$(document).bind("keydown","w",function(){window.scroll(0, 0);});
    if($("#page-next").attr("href")){$(document).bind('keydown','del',movePageNext);$(document).bind('keydown','e',movePageNext);$("body").append('<a id="btn_page_next" onclick="movePageNext();return false;" href="#"><span>›</span></a>');}
    if($("#page-prev").attr("href")){$(document).bind('keydown','insert',movePagePrev);$(document).bind('keydown','q',movePagePrev);$("body").append('<a id="btn_page_prev" onclick="movePagePrev();return false;" href="#"><span>‹</span></a>');}
    $("#btn_page_prev,#btn_page_next").hover(function(){$(this).find("span").show();},function(){$(this).find("span").hide();});
    $("#comments_form form").submit(function(){$(this).find("input[type='submit']").attr("disabled",true);return true;});
    $("form[id*='_taform_']").bind('submit', function(ev){var obj = $(this);var type = obj.modelType();var id = obj.modelId();var op = '#'+type+'_tags_'+id;obj.ajaxSubmit({target: op}).clearForm();ev.preventDefault();});
    $("ul[id*='_tags_']").find('span a').live('click', function(ev){var obj = $(this).parent().parent().parent();obj.load(this.href);ev.preventDefault();});
    $('#tag_rec li a').click(function(ev){var text = $(this).text();var obj = $('#tag_rec').prev().find("input[name='tags']");var value = obj.val()+text+',';obj.val(value);ev.preventDefault();});
    $('#ajax_ev').live('click', function(ev){
        if($(this).attr('is_confirm') == 1){
            if(window.confirm('你真的真的真的要删除?')){
                $(this).parent().load(this.href);
                // alert('删除');
            }
        } else {
            $(this).parent().load(this.href);
            // alert('删除');
        }
        ev.preventDefault();
    });
    $("a[rel*='lightbox']").lightBox();
    $('img[id*="_drag_"],dl[id*="_drag_"],div[id*="_drag_"]').draggable({revert:true,zIndex:2700,start:function(ev, ui){	$("div[id*='_drop_']").droppable({drop:function(ev, ui){var obj = $(this);var act = obj.modelType();var oid = obj.modelId();ui.draggable.hide(1,function(){var type = $(this).modelType();var id = $(this).modelId();obj.load('/do?t='+type+'&i='+id+'&act='+act+'&o='+oid);});}});}});
    var ajaxurl="/ajx/login";var inittext='<div class="hd"></div><div class="pre">初始化中，请稍后……</div>';var json_show_join={"errorcode":0,"tips":{"header":"\u6ce8\u518c","col":2,"rightdiv":"<div class=\"login-mod\"><p>\u5df2\u7ecf\u6709Topit.me\u8d26\u6237?<\/p><p><a target=\"_blank\" class=\"lnk-login nologin\">\u73b0\u5728\u767b\u5f55<\/a><\/p><\/div>","act":"register","content":{"form":{"callback":"\/aaa","item":[{"name":"username","text":"\u7528\u6237\u540d","tips":"\u6700\u591a15\u4e2a\u5b57\u7b26"},{"name":"email","text":"Email","tips":"Email\u662f\u627e\u56de\u5bc6\u7801\u7684\u552f\u4e00\u9014\u5f84"},{"name":"password","text":"\u5bc6\u7801","type":"password","tips":"\u8bf7\u8f93\u5165\u4e00\u4e2a\u5bc6\u7801"},{"type":"submit","value":"\u70b9\u51fb\u6ce8\u518c!"}]}}}};var json_show_login={"errorcode":0,"tips":{"header":"\u767b\u5f55","col":2,"rightdiv":"<div class=\"login-mod\"><p>\u8fd8\u6ca1Topit.me\u8d26\u6237?<\/p><p><a target=\"_blank\" class=\"lnk-login nojoin\">\u73b0\u5728\u6ce8\u518c<\/a><\/p><\/div>","act":"login","content":{"form":{"callback":"\/aaa","item":[{"name":"email","text":"Email","tips":"\u8bf7\u586b\u5165\u6ce8\u518c\u7684Email\u5730\u5740\uff01"},{"name":"password","text":"\u5bc6\u7801","type":"password","tips":"\u8bf7\u8f93\u5165\u5bc6\u7801\uff01"},{"type":"submit","value":"\u63d0\u4ea4!"}]}}}};function init_dialog(boxname){if($("#"+boxname).attr("id")==null){var dialogbox=$("<div></div>").html('<div id="'+boxname+'" style="display:none"></div>');$("body").prepend(dialogbox.html())}thisbox=$("#"+boxname);thisbox.empty();thisbox.dialog({autoOpen:false,modal:false,minWidth:350,resizable:true,draggable:false,closeText:"X",dialogClass:"top-dialog"});if($(".top-bk").attr("class")==null)thisbox.before('<span class="top-bk"></span>');_fixed();if(thisbox.parent().css("display")=="none")thisbox.parent().css("display","block")}jQuery.emptify=function(element){var defaultValue=$(element).val();var isPwd=$(element).attr("type")=="password"?true:false;var noSee=$(element).hasClass("nosee");var isTips=$(element).attr("placeholder")!=""?true:false;if(isPwd==true)$(element).addClass("nosee");if(noSee==true)$(element).removeClass("nosee");if(isTips==true)$(element).addClass("tips");$(element).bind("focus",function(){$(this).parent().addClass("focus");if(noSee==true)$(this).addClass("nosee").prev().removeClass("nosee").focus();if(defaultValue==$(this).val()&&$(this).attr("type")!="submit"&&isTips==true)$(this).val("").removeClass("tips")}).bind("blur",function(){$(this).parent().removeClass("focus");if(isPwd==true&&defaultValue==$(this).val())$(this).addClass("nosee").next().addClass("tips").removeClass("nosee").val($(this).attr("placeholder"));if(!$(this).val()&&isTips)$(this).val(defaultValue).addClass("tips")})};function tips_pre_check(){var f=true;$(".boxf > input, .boxf > textarea").each(function(i){if(($(this).attr("type")=="text"&&$(this).attr("id")!=""&&$(this).attr("id")!=undefined&&$(this).val()==$(this).attr("placeholder"))||($(this).attr("type")=="password"&&$(this).val()=="")){update_tips($(this).prev("label").text().replace(":","").replace("：","")+"长度不能为空！");f=false}});if(f==false)return false;else return true}function update_tips(t){var tips=$(".d-notice");if(tips.has("ol").length==0)tips.html("<ol></ol>");if($.isArray(t)===true){ts="";$.each(t,function(i,n){ts+="<li>"+n+"</li>"})}else ts="<li>"+t+"</li>";tips.children().append(ts);if(data.tips.col==2){$(".top-bk").css("width",thisbox.width()+16).css("height",thisbox.height()+16);$(".top-dialog .rw").css("height",boxH+tips.height())}if($.browser.msie&&parseInt($.browser.version)==6)$(".top-dialog .ui-dialog-content").css("height",boxH+tips.height())}function check_length(o,n,min,max,show){var l=o.val().length;if(l>max||l<min){show&&update_tips(n+"长度应处于"+min+"-"+max+"之间！");return false}else return true}function _fixed(){if($.browser.msie&&parseInt($.browser.version)==6){thisbox.parent().css({position:"absolute"}).end().dialog("open");var top=parseInt(thisbox.parent().css("top"))-$(document).scrollTop();var left=parseInt(thisbox.parent().css("left"))-$(document).scrollLeft();$(window).scroll(function(){thisbox.parent().css({"top":$(document).scrollTop()+top,"left":$(document).scrollLeft()+left})});$(window).resize(function(){thisbox.dialog("close")})}else{thisbox.parent().css({position:"fixed"}).end().dialog("open");$(window).resize(function(){thisbox.dialog("option",{position:"center"})})}}function isemail(email){return email.length>6&&/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(email)}function json_praser_wrap(json){var str="",hw="",lw="",rw="";if(typeof(json)!="object")return"解析错误！";if(json.col==2){str='<div class="hw"><div class="lw">';str+=json_praser(json);str+='</div><div class="rw">';str+=json.rightdiv==undefined?"":json.rightdiv;str+='</div><div class="clear"></div><a href="#" class="top-dialog-close">X</a></div>'}else{str=json_praser(json);str+='<a href="#" class="top-dialog-close">X</a>'}return str}function json_praser(json){var hd="",ct="";if(typeof(json)!="object")return"解析错误！";if(json.header.length!=0)hd='<div class="hd"><span>'+json.header+'</span></div>';ct='<div class="ct"><div class="d-notice"></div>';if(json.content.length!=0){$.each(json.content,function(i,n){if(i=="form"){ct+='<form method="post" action="'+n.callback+'">';$.each(n.item,function(id,nd){var lab=nd.text==undefined?"":nd.text+":";var subp=nd.text==undefined?' class="boxf btnp" ':' class="boxf" ';var tips=nd.tips==undefined?"":nd.tips;var pwdp=nd.type=="password"?'<input type="text" value="'+tips+'" class="text nosee tips" />':"";if(nd.type=="textarea"){ct+='<p'+subp+'><label for="'+nd.name+'">'+lab+'</label><textarea rows="6" cols="50" name="'+nd.name+'" id="'+nd.name+'"></textarea></p>'}else if(nd.type=="hidden"){ct+='<input type="hidden" name="'+nd.name+'" value="'+nd.value+'" id="'+nd.name+'"></input>'}else{ct+='<p'+subp+'><label for="'+nd.name+'">'+lab+'</label><input ';if(nd.type==undefined||nd.type=="text"||nd.type=="password"){var st=nd.type=="password"?"password":"text";var va=nd.value!=undefined?'value="'+nd.value+'"':(nd.type!="password"?'value="'+tips+'"':"");var placeholder=nd.tips==undefined?"":'placeholder="'+tips+'"';ct+=placeholder+va+'type="'+st+'" name="'+nd.name+'" id="'+nd.name+'" class="text"'}else if(nd.type=="submit"){ct+='type="submit" value="'+nd.value+'" class="btn"'}ct+=' />'+pwdp+'</p>'}});ct+='</form>'}})}ct+='</div>';return hd+ct}function show_dialog(boxname,mod,obj){init_dialog(boxname);$(document).unbind('keydown');if(mod=='show_login'||mod=='show_join')data=eval("json_"+mod);else{if(mod=='show_tougao')var plus="&id="+$('#id_info').attr('class').split(' ')[0]+"&type="+$('#id_info').attr('class').split(' ')[1];else if(mod=='show_mail')var plus="&id="+obj.attr('id').split(' ')[0]+"&name="+obj.attr('id').split(' ')[1];data=$.parseJSON($.ajax({type:"POST",url:ajaxurl,data:"mod="+mod+plus,async:false}).responseText)}thisbox.append(json_praser_wrap(data.tips));thisbox.dialog("option","minWidth",500);if(data.tips.col==2){boxH=thisbox.height();$(".top-dialog .rw").css("height",boxH+4)}else if(data.tips.col==1){$(".top-dialog form").css("width",470);$(".top-dialog .ct .text").css("width",370)}$(".boxf > input, .boxf > textarea").each(function(i){$.emptify($(this))});if(data.tips.content.form!=undefined)$(".ct form").bind("submit",function(e){e.preventDefault();return eval("valid_"+data.tips.act+"()")});thisbox.dialog("option",{position:"center"});$(".top-dialog-close").bind("click",function(e){e.preventDefault();thisbox.parent().css("display","none")});if(data.tips.col==2)$(".top-bk").css("width",boxH+16).css("height",boxH+16);return false}function valid_login(){var email=$("#email"),password=$("#password"),valided=true;$(".d-notice").empty();$(".top-bk").css("width",boxH+16).css("height",boxH+16);$(".top-dialog .rw").css("height",boxH+4);if(!tips_pre_check())return false;if(!check_length(email,"Email",6,80,true))valided=false;if(!check_length(password,"密码",1,30,true))valided=false;if(!isemail(email.val())){update_tips("Email格式错误！");valided=false}if(!valided)return false;else{login(email.val(),password.val())}}function valid_register(){var username=$("#username"),email=$("#email"),password=$("#password"),valided=true;$(".d-notice").empty();$(".top-bk").css("width",boxH+16).css("height",boxH+16);$(".top-dialog .rw").css("height",boxH+4);if(!tips_pre_check())return false;if(!check_length(username,"用户名",2,15,true))valided=false;if(!check_length(email,"Email",6,80,true))valided=false;if(!check_length(password,"密码",1,30,true))valided=false;if(!isemail(email.val())){update_tips("Email格式错误！");valided=false}if(check_email(email.val())===false){valided=false}if(!valided)return false;else{register(email.val(),username.val(),password.val())}}function valid_tougao(){var tg=$("#tougao"),valided=true;$(".d-notice").empty();if(!tips_pre_check())return false;if(!check_length(tg,"感言",6,80,true))valided=false;if(!valided)return false;else{var code=$.parseJSON($.ajax({url:ajaxurl,data:"who="+$("#who").val()+"&type="+$('#id_info').attr('class').split(' ')[1]+"&tougao="+$("#tougao").val()+"&source="+$("#source").val()+"&pic="+$("#pic").val()+"&url="+document.URL+"&mod=tougao",type:"POST",async:false,beforeSend:function(){$(".btn").css("color","gainsboro").attr("disabled","disabled")}}).responseText);if(code.tips!="")update_tips(code.tips);if(code.errorcode==1){$(".btn").css("color","white").removeAttr("disabled");return false}else{thisbox.dialog("close");alert("投稿成功！")}}}function valid_mail(){var cont=$("#conts"),valided=true;$(".d-notice").empty();if(!tips_pre_check())return false;if(!check_length(cont,"内容",1,1000,true))valided=false;if(!valided)return false;else{var code=$.parseJSON($.ajax({url:ajaxurl,data:"toid="+$("#toid").val()+"&cont="+cont.val()+"&mod=mail",type:"POST",async:false,beforeSend:function(){$(".btn").css("color","gainsboro").attr("disabled","disabled")}}).responseText);if(code.tips!="")update_tips(code.tips);if(code.errorcode==1){$(".btn").css("color","white").removeAttr("disabled");return false}else{thisbox.dialog("close")}}}function check_email(email){if(email.length==0)return-1;var code=$.parseJSON($.ajax({url:ajaxurl,data:"email="+email+"&mod=userexists",type:"POST",async:false}).responseText);if(code.tips!="")update_tips(code.tips);if(code.errorcode==1)return false;else return true}function register(email,username,password){var code=$.parseJSON($.ajax({url:ajaxurl,data:"email="+email+"&username="+username+"&password="+password+"&mod=register",type:"POST",async:false,beforeSend:function(){$(".btn").css("color","gainsboro").attr("disabled","disabled")}}).responseText);if(code.tips!="")update_tips(code.tips);if(code.errorcode==1){$(".btn").css("color","white").removeAttr("disabled");return false}else{thisbox.dialog("close");window.location.reload()}}function login(email,password){var code=$.parseJSON($.ajax({url:ajaxurl,data:"email="+email+"&password="+password+"&mod=login",type:"POST",async:false,beforeSend:function(){$(".btn").css("color","gainsboro").attr("disabled","disabled")}}).responseText);if(code.tips!="")update_tips(code.tips);if(code.errorcode==1){$(".btn").css("color","white").removeAttr("disabled");return false}else{thisbox.dialog("close");window.location.reload()}}$(".nojoin").live("click",function(e){window.location = "http://www.topit.me/login";return;e.preventDefault();show_dialog("dialogbox","show_join")});$(".nologin").live("click",function(e){e.preventDefault();show_dialog("dialogbox","show_login")});$("#album_tougao, #item_tougao, #user_tougao").live("click",function(e){e.preventDefault();show_dialog("dialogbox","show_tougao")});$(".show_mail").live("click",function(e){e.preventDefault();show_dialog("dialogbox","show_mail",$(this))});
    $("#btn_close,#btn_return").mousemove(function(){$(this).children().css("display","block")});
    $("#btn_close,#btn_return").mouseout(function(){$(this).children().css("display","none")});
    $(".open_login a").click(function(){
        var childWindow, iUrl, iWidth = 770, iHeight = 410, iTop, iLeft;
        iUrl = this;
        iTop = (window.screen.availHeight-30-iHeight)/2;
        iLeft = (window.screen.availWidth-10-iWidth)/2;
        childWindow = window.open(iUrl,"TencentLogin","top=" + iTop + ",left=" + iLeft + ",width=" + iWidth + ",height=" + iHeight + ",menubar=0,scrollbars=no, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
        return false;
    });
    $.fn.extend({topitAtme:function(){this.autocomplete("/ajx/login?mod=getatinfo",{inputClass:"itme_at_input",resultsClass:"itme_at_results",loadingClass:"itme_at_loading",selectFirst:true,selectLast:false,scroll:false,matchContains:true,max:10,width:160,reverseMode:false,multiple:true,multipleSeparator:" ",isAtmemode:true,formatItem:function(row){return row[0]+"("+row[1]+")"},formatResult:function(row){return"[at:"+row[1]+"]@"+row[0]+"[/at]"},scrollHeight:300})}});
    $.geekGaTrackPage('UA-11429780-1');
});