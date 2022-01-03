# @mixin & @include

- [@mixin & @include](#mixin--include)
  - [作用](#作用)
  - [参数](#参数)
    - [可选参数](#可选参数)
    - [指定参数名](#指定参数名)
    - [不定参数数量](#不定参数数量)
  - [内容块](#内容块)
    - [代码块参数](#代码块参数)

## 作用

通过 `@mixin` 定义样式模板。通过 `@include` 调用。

内部封装样式规则，放置于样式规则内，也可以修改变量。

用于复用样式。减少无语义化 `class` 的定义。

## 参数

类似函数，支持传递参数。传递参数需与定义参数数量相同，除非定义参数可选。

### 可选参数

定义时通过使用 `:` 给参数添加默认值，使其可选。

提供的默认值可以使用任何 `SassScript` 表达式，甚至可以使用之前的参数。

### 指定参数名

传递参数时，除了可以根据位置，还可以通过指定参数名。

当 `@mixin` 重构时，如果需要修改参数名，需要兼容老的参数名。可以将老参数名放到最后，并通过 `@warn` 警告用户迁移。

### 不定参数数量

支持传递任意数量的参数，定义时需在最后一个参数名后添加 `...` 来接受剩余参数。最后一个参数的数据类型为 `list`。

如果通过指定参数名的方式传递不定数量的参数，
`@mixin` 内部使用 `meta.keywords` 将参数解析为 `map`。
`key` 为参数名。
如果 `@mixin` 内部没有调用 `meta.keywords`，不允许调用其它指定参数名参数。

传递不定参数时也可以在 `list` 类型数据后添加 `...`。

一个比较方便的用途就是属性透传和给 `@mixin` 起别名。

## 内容块

类似 `Vue` 的插槽。

在 `@include` 后添加 `{}` 注入内容块。
在 `@mixin` 内部通过 `@content` 使用内容块。

```scss
// index.scss
@mixin color($color) {
  .a {
    color: $color;
    @content;
  }
}

@include color($color: red) {
  &:hover {
    color: green;
  }
};
```

```css
/* index.css */
.a {
  color: red;
}
.a:hover {
  color: green;
}
```

### 代码块参数

代码块也支持传入参数。内容块使用参数方法与 `@mixin` 相同。

在 `@include <name> using (<arguments...>)` 调用参数

```scss
// index.scss
@mixin media($types...) {
  @each $type in $types {
    @media #{$type} {
      @content ($type);
    }
  }
}

@include media(screen, print) using ($type) {
  h1 {
    font-size: 40px;
    @if $type == print {
      font-family: Calluna;
    }
  }
}
```

```css
@media screen {
  h1 {
    font-size: 40px;
  }
}
@media print {
  h1 {
    font-size: 40px;
    font-family: Calluna;
  }
}
```
