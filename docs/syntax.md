# 语法

## `.scss` vs `.sass`

`Sass` 有两种语法类型，对应的文件后缀分别是 `sass` 和 `scss`。
`.sass` 文件使用的是 `Sass` 最初的语法，使用缩进表示代码层级。
`.scss` 文件使用的是 `SCSS` 语法，与 `CSS` 相同，使用 `{}` 和 `;` 表明代码结构。

```scss
// index.scss
@mixin button-base() {
  @include typography(button);
  @include ripple-surface;
  @include ripple-radius-bounded;

  display: inline-flex;
  position: relative;
  height: $button-height;
  border: none;
  vertical-align: middle;

  &:hover { cursor: pointer; }

  &:disabled {
    color: $mdc-button-disabled-ink-color;
    cursor: default;
    pointer-events: none;
  }
}
```

```Sass
// index.sass
@mixin button-base()
  @include typography(button)
  @include ripple-surface
  @include ripple-radius-bounded

  display: inline-flex
  position: relative
  height: $button-height
  border: none
  vertical-align: middle

  &:hover
    cursor: pointer

  &:disabled
    color: $mdc-button-disabled-ink-color
    cursor: default
    pointer-events: none
```

## `CSS` 超集

`SCSS` 是 `CSS` 的超集，完全兼容 `CSS` 的所有语法。
因此门槛低，更受欢迎。

## 不容错

编译遇到错误，将会终止编译过程，并提示用户。

## 注释

- `//` 注释不会被编译进 `css` 文件。
- `/* */` 注释会被编译进 `css` 文件。

## `-` 和 `_`

`Sass` 命名不区分 `_` 和 `-`，比如变量名，`mixin` 等。
`$font-size` 与 `$font_size` 指向同一个变量。
