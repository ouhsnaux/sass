# @mixin & @include

- [作用](#作用)
- [参数](#参数)
  - [可选参数](#可选参数)
  - [指定参数名](#指定参数名)
  - [任意数量参数](#任意数量参数)
- [代码块](#代码块)
  - [代码块参数](#代码块参数)

## 作用

用于复用样式逻辑，生成套路相同的样式。

使用 `@mixin` 定义样式模板。使用 `@include` 调用。

```scss
// index.scss
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin horizontal-list {
  @include reset-list;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: 2em;
    }
  }
}

nav ul {
  @include horizontal-list;
}
```

```css
/* index.css */
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
  margin-left: -2px;
  margin-right: 2em;
}
```

## 参数

支持传递参数。形参要与实参长度相同。

```scss
// index.scss
@mixin rtl($property, $ltr-value, $rtl-value) {
  #{$property}: $ltr-value;

  [dir=rtl] & {
    #{$property}: $rtl-value;
  }
}

.sidebar {
  @include rtl(float, left, right);
}
```

```css
/* index.css */
.sidebar {
  float: left;
}
[dir=rtl] .sidebar {
  float: right;
}
```

### 可选参数

定义时使用 `:` 给参数添加默认值，使其可选。

默认值可以使用任何 `SassScript` 表达式，甚至可以使用之前的参数。

```scss
// index.scss
@mixin replace-text($image, $x: 50%, $y: 50%) {
  text-indent: -99999em;
  overflow: hidden;
  text-align: left;

  background: {
    image: $image;
    repeat: no-repeat;
    position: $x $y;
  }
}

.mail-icon {
  @include replace-text(url("/images/mail.svg"), 0);
}
```

```css
/* index.css */
.mail-icon {
  text-indent: -99999em;
  overflow: hidden;
  text-align: left;
  background-image: url("/images/mail.svg");
  background-repeat: no-repeat;
  background-position: 0 50%;
}
```

### 指定参数名

传递参数时，除了可以根据位置，还可以通过指定参数名。

```scss
// index.scss
@mixin square($size, $radius: 0) {
  width: $size;
  height: $size;

  @if $radius != 0 {
    border-radius: $radius;
  }
}

.avatar {
  @include square(100px, $radius: 4px);
}
```

```css
/* index.css */
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 4px;
}
```

如果重构时需要修改参数名，为了兼容通过参数名传递的调用，可以将老参数名放到最后，并通过 `@warn` 警告用户迁移。

### 任意数量参数

为了接受任意数量的参数，在最后一个形参后需添加 `...`。
传递实参时也可以在 `list` 类型数据后添加 `...`。

如果实参是根据位置传递的，则形参数据类型为 `list`。

如果实参是通过指定参数名传递的，
通过 `meta.keywords` 将参数解析为 `map`。`key` 为参数名，`value` 为值。
如果内部没有调用 `meta.keywords`，不允许使用其它指定参数名参数。

## 代码块

类似 `Vue` 的插槽。
在 `@mixin` 内部通过 `@content` 使用代码块。
在 `@include` 后添加 `{}` 注入代码块。

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

代码块也支持传入参数。参数使用同 `@mixin`。

在 `@include <name> using (<arguments...>) {}` 调用参数

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
