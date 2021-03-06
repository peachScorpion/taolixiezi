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
      <li>数据备份功能根据你的选择备份全部数据或指定数据，导出的数据文件可用“数据恢复”功能或 phpMyAdmin 导入</li>
      <li>建议定期备份数据库</li>
      <li>数据库配置修改请编辑apps/common/conf/admin/config.php</li>
    </ul>
  </div>
    <table class="flex-table">
      <thead>
        <tr>
          <th width="24"  align="center"><i class="ico-check"></i></th>
          <th width="120" align="center">表名</th>
          <th width="120" align="center">数据量</th>
          <th width="120" align="center">数据大小</th>
          <th width="150" align="center">创建时间</th>
          <th width="150" align="center">说明</th>
          <th width="150" align="center">备份状态</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {volist name="_list" id="table"}
        <tr class="hover erow" data-table="{$table.name}">
          <td><i class="ico-check"></i></td>
          <td>{$table.name}</td>
          <td>{$table.rows}</td>
          <td>{$table.data_length|format_bytes}</td>
          <td>{$table.create_time}</td>
          <td>{$table.comment}</td>
          <td class="info">未备份</td>
          <td></td>
        </tr>
      {/volist}
      </tbody>
    </table>
</div>
<script>
$(function(){
$('.flex-table').flexigrid({
    height:'auto',// 高度自动
    usepager: false,// 不翻页
    striped: true,// 使用斑马线
    resizable: false,// 不调节大小
    reload: false,// 不使用刷新
    columnControl: false,// 不使用列控制
    title: '数据库列表',
    buttons : [
                 {display: '<i class="fa fa-floppy-o"></i>立即备份', name : 'add', bclass : 'add', title : '新增数据', onpress : fg_operation }
             ]
    });

    var $export = $(".add");
    function fg_operation(name, grid) {
      if($('.trSelected',grid).length>0){
          $export.html('<i class="fa fa-spinner fa-spin"></i>正在发送备份请求...');
          var itemlist = new Array();
          $('.trSelected',grid).each(function(){
            itemlist.push($(this).attr('data-table'));
          });
          fg_export(itemlist);
      } else {
          alert('请选择需要导出的数据库！');
          return false;
      }
    }

    function fg_export(table) {
      if (typeof table == 'number') {
          var table = new Array(table.toString());
      };
      if(confirm('确认备份这 ' + table.length + ' 项吗？')){
        table = table.join(',');
      } else {
            return false;
      }
      $.ajax({
            type: "POST",
            dataType: "json",
            url: "{:url('database/export')}",
            data: "tables="+table,
            success: function(data){
                if (data.code){
                    tables = data.data.tables;
                    $export.html(data.msg + "开始备份，请不要关闭本页面！");
                    backup(data.data.tab);
                    window.onbeforeunload = function(){ return "正在备份数据库，请不要关闭！" }
                } else {
                    $export.html("立即备份");
                }
            }
        });
    }

    function backup(tab, code){
        code && showmsg(tab.id, "开始备份...(0%)");
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "{:url('database/export')}",
            data: tab,
            success: function(data){
                if (data.code){
                    showmsg(tab.id, data.msg);
                    if(!$.isPlainObject(data.data.tab)){
                        //$export.parent().children().removeClass("disabled");
                        $export.html('<i class="fa fa-check"></i>备份完成，点击重新备份');
                        window.onbeforeunload = function(){ return null }
                        return;
                    }
                    backup(data.data.tab, tab.id != data.data.tab.id);
                } else {
                	alert(data.msg);
                    $export.html("立即备份");
                    /*updateAlert(data.msg,'alert-error');
                    $export.parent().children().removeClass("disabled");
                    $export.html("立即备份");
                    setTimeout(function(){
                    $('#top-alert').find('button').click();
                    $(that).removeClass('disabled').prop('disabled',false);
                    },1500);*/
                }
            }
        });
    }

    function showmsg(id, msg){
        $("table tr[data-table="+ tables[id] +"]").children("td.info").children("div").html(msg);
    }
});
</script>
</div>
{/block}