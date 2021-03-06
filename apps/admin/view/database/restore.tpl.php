{extend name="Public:layout" /}
{block name="content"}
<div class="page">
  <div class="fixed-bar">
    <div class="item-title">
      <div class="subject">
        <h3>数据库</h3>
        <h5>数据库恢复与备份</h5>
      </div>
      <ul class="tab-base nc-row">
            {include file="public/nav" /}
      </ul>
  </div>
  </div>
  <!-- 操作说明 -->
  <div class="explanation" id="explanation">
    <div class="title" id="checkZoom"><i class="fa fa-lightbulb-o"></i>
      <h4 title="提示相关设置操作时应注意的要点">操作提示</h4>
      <span id="explanationZoom" title="网站全局基本设置，网站及其他模块相关内容在其各自栏目设置项内进行操作"></span> </div>
    <ul>
      <li>点击导入选项进行数据库恢复</li>
    </ul>
  </div>
    <table class="flex-table">
      <thead>
        <tr>
          <th width="150" align="center">操作</th>
          <th width="150" align="center">备份名</th>
          <th width="150" align="center">备份时间</th>
          <th width="150" align="center">备份大小</th>
          <th width="100" align="center">卷数</th>
          <th width="100" align="center">压缩</th>
          <th width="100" align="center">状态</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {volist name="_list" id="data"}
      <tr class="hover">
          <td class="handle">
          <span class="btn"><em><i class="fa fa-cog"></i>设置<i class="arrow"></i></em>
            <ul><li><a href="javascript:if(confirm('您确定要删除吗?')){location.href='{:url('del?time='.$data['time'])}'};">删除</a></li>
              <li><a class="confirm-on-click" href="{:url('import?time='.$data['time'])}">导入</a></li>
            </ul>
          </span>
          </td>
          <td>{$data.time|date='Ymd-His',###}</td>
          <td>{$key}</td>
          <td>{$data.size|format_bytes}</td>
          <td>{$data.part}</td>
          <td>{$data.compress}</td>
          <td class="info">-</td>
          <td></td>
      </tr>
      {/volist}
      </tbody>
    </table>
</div>
</div>
<script type="text/javascript">
$(function(){
  $('.flex-table').flexigrid({
    height:'auto',// 高度自动
    usepager: false,// 不翻页
    striped:false,// 不使用斑马线
    resizable: false,// 不调节大小
    title: '数据库备份列表',// 表格标题
    reload: false,// 不使用刷新
    columnControl: false,// 不使用列控制
  });
});

$('.confirm-on-click').live('click', function() {
  var self = this, status = ".";
  if(confirm('确认备份这项吗？')){
      } else {
      return false;
  }
  $.get(self.href, success, "json");
  window.onbeforeunload = function(){ return "正在还原数据库，请不要关闭！" }
  return false;

  function success(data){
      if(data.code){
          if(data.data.gz){
              data.msg += code;
              if(code.length === 5){
                  code = ".";
              } else {
                  code += ".";
              }
          }
          $(self).parents('tr').find('.info > div').text(data.msg);
          if(data.data.part){
              $.get(self.href,
                  {"part" : data.data.part, "start" : data.data.start},
                  success,
                  "json"
              );
          }  else {
              window.onbeforeunload = function(){ return null; }
          }
      } else {
          $(self).parents('tr').find('.info > div').text(data.msg);
      }
  }
});
</script>
{/block}