# css @rules

1. `Sass` 兼容所有的 `css @rules`。
2. 如果 `css @rules` 被嵌套，编译时会自动交换位置，最终 `@rules` 依然在最外层。
3. `css @rules` 中支持使用插值
4. 多层 `@media` 嵌套，会导致 `@media` 规则合并。