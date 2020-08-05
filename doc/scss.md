# scss 文档

脚手架采用scss编写，scss资源置于src/assets目录下；
scss 引入 sass-resources-loader 插件，导出全局变量函数和混合；
配置文件：vue.config.js line 31;

# 目录结构
scss
|——_el-dropdown.scss (el-dropdown样式)
|——_inherit-flex.scss (flex布局样式)
|——_reboot.scss (重置样式)
|——_themes.scss (主题色函数)
|——_variable.scss (变量)
|——index.scss (公共样式入口)

# 文件命名
以 _ + 功能方式命名
引用直接使用 @import "文件应用路径" (文件名不带_)

# el-dropdown.scss

element-ui的dropdown样式重置

# inherit-flex.scss

flex布局基础样式

# reboot.scss

重置浏览器默认样式

# themes.scss

主题色函数，遍历map型变量

# variable.scss 

定义变量