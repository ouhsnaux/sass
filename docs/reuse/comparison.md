# 对比

## `@function` vs `@mixin`

### 相同点

参数处理方式相同。

### 不同点

`@mixin` 生成样式。
`@function` 生成 `Sass` 值。

## extend vs mixin

都是用来复用样式。只有Mixin可以接受参数。
语义上具有继承关系使用 extend,否则使用mixin。
比如 `.error--serious` 继承 `.error`。

大部分 `web` 服务器对处理重复的 `CSS` 代码做了优化，重复 `CSS` 代码数量不应该作为决策的原因。

## TODO 适用场景

修改变量的副作用，用 mixin , function只用来修改值。只用来做纯函数
