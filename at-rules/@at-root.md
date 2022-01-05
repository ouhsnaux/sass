# @at-root

使用 `@at-root <selector> { ... }`，样式规则会脱离嵌套。

如果多个样式规则需要使用 `@at-root`，可以用 `{}` 包裹合并

```scss
@at-root {
  <selector1> { ... }
  ...
  <selectorN> { ... }
}
```

使用 `@at-root` 默认不能突破 `CSS @rules` 的嵌套。
可以使用 `with` 和 `without` 修改嵌套规则。

- `with: <rules>` 表示只被 `rules` 嵌套，
- `without: <rules>` 表示不被 `rules` 嵌套。

`rules` 取值：

1. `CSS @rules` 去掉 `@` 比如 `media`。
2. 特殊值 `rule` 表示所有的样式规则
3. 特殊值 `all` 表示 `CSS @rules + rule`

```scss
// index.scss
@media print {
  .page {
    width: 8in;

    @at-root (without: media) {
      color: #111;
    }

    @at-root (with: rule) {
      font-size: 1.2em;
    }
  }
}
```

```css
/* index.scss */
@media print {
  .page {
    width: 8in;
  }
}
.page {
  color: #111;
}
.page {
  font-size: 1.2em;
}
```
