<?php
// +----------------------------------------------------------------------
// | Yzncms [ 御宅男工作室 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2007 http://yzncms.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 御宅男 <530765310@qq.com>
// +----------------------------------------------------------------------

// [ 应用入口文件 ]

// 检测PHP环境
if(version_compare(PHP_VERSION,'5.4.0','<'))  die('require PHP > 5.4.0 !');

// 定义应用目录
define('APP_PATH', __DIR__ . '/apps/');
define('CONF_PATH', __DIR__.'/apps/common/conf/');//重新定义配置路径

// 加载框架引导文件
require __DIR__ . '/thinkphp/start.php';
