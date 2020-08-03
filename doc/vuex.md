# vuex文档

状态管理;

按业务逻辑拆分子模块;

全局模块文件命名以大写字母开头;

拥有模块命名空间的模块文件名以小写字母开头;

# 目录结构

vuex
|——ThemeColor (主题色模块)
   |——index.js (组装主题色模块并导出)
   |——mutations.js (主题色模块的 mutations)
   |——store.js (主题色模块的数据仓库)
   |——...
|——...(模块2)
|——Actions.js (根级别的 action)
|——Getters.js (根级别的 Getter)
|——index.js (组装模块并导出 store)
|——Mutations.js (根级别 mutation)
|——Store.js (根级别数据仓库)

# store

数据仓库

# mutation

拥有写入state的权限;

不允许除actions之外的代码调用;

使用set开头以下划线分割 (set_userName)
 
# actions

异步层，接口调用层;

拥有mutations调用权限;

不允许写入state;

使用set开头驼峰写法 (setCount)

# getters

state的计算属性


