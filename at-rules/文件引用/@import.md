# @import

* 与 `css @import` 区分
* 功能
  * 使用
  * 转发
  * 嵌套
    * plain css
    * members
    * 父选择器
* 缺陷
* `Import-Only Files`

## 与 `css @import` 区分

`Sass @import` 可一次引用多个模块，模块间以逗号分割。

下面4种情况，当作 `css` 处理，不会被编译合并。

1. `url` 以 `.css` 结尾。
2. `url` 以 `http(s)://` 开头。
3. `url` 被 `url()` 包裹。
4. 媒体查询

## 功能

引用文件时就像被引用内容写在 `@import` 位置。

### 使用

可以直接使用其中的 `Members`。甚至之后被引用的文件也可以使用。

举个例子：

`A @import B, C`，除了 `A`，在 `C` 中也可使用 `B` 中的 `Members`。

### 转发

`A @import B, B @import C`，`A`可直接使用 `C` 中的 `Members`。

### 嵌套

`@import` 不用写在顶部，甚至可以写在选择器内部。
这样被引用文件编译生成的 `css` 都在选择器内部。
但是被引用文件内部的 `Members` 仍然是全局的。

如果引用第三方样式库，可能有用。如果是自己写的代码，应使用 `@mixin`。

被引用文件内部使用父选择器，则父选择器包括 `@import` 的父选择器。

## 缺陷

`Sass` 准备淘汰 `@import`，尽量使用 `@use` 替代。

1. 使用 `Members` 无法区分来源，来自自己定义还是某个引用文件。
2. `Members` 都是全局的，容易发生命名冲突。
3. `@extend` 无法预测继承的内容来自何处。
4. 每次引用都会编译，导致延长编译时间和产生冗余重复的 `css`。
5. 无法定义私有 `Members` 和 `placeholder selectors`。<!-- TODO 会引起什么问题 -->
