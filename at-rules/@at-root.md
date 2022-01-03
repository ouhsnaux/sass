# @at-root

样式规则将写在全局，不被 `Sass` 样式规则嵌套。
但会被 `css` 中的 `@rules` 嵌套。

- [@at-root](#at-root)
  - [语法](#语法)
  - [用处](#用处)
  - [高级写法](#高级写法)
    - [合并](#合并)
    - [with / without](#with--without)

## 语法

`@at-root <selector> { ... }`

## 用处

- 在选择器中已经使用 `&`，为了避免二次嵌套，可以使用 `@at-root`
- 在 `@mixin` 中如果希望输出内容作用于全局，
  不受限于 `@include` 被嵌套在何处，需要使用 `@at-root`。

## 高级写法

### 合并

如果多个样式规则需要使用 `@at-root`，可以用 `{}` 包裹合并

```scss
@at-root {
  <selector1> { ... }
  ...
  <selectorN> { ... }
}
```

### with / without

默认情况下，样式规则仍会被 `css` 中的 `@rules` 嵌套。
可以使用 `with / without` 决定是否被嵌套，
使用 `with: <rules>`，结果只被 `rules` 嵌套。
使用 `without: <rules>`，结果不被 `rules` 嵌套。

rules 取值：

1. `css @rules` 去掉 `@` 比如 `media`。
2. 特殊值 `rule` 表示所有的样式规则
3. 特殊值 `all` 表示 `css @rules` + `rule`

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
/* index.scss
 */
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
