# @forward

- [转发](#转发)
- [添加前缀](#添加前缀)
- [可控](#可控)
- [私有成员](#私有成员)
- [配置变量](#配置变量)
- [@use 与 @forward 合并使用](#use-与-forward-合并使用)

## 转发

`@forward` 转发被引用文件内部的成员，自身不能使用。编译后的 `CSS` 会与被引用文件编译结果合并。

## 添加前缀

当转发多个文件时，为了区分来源，避免混乱和命名冲突，通过 `as` 给成员添加前缀。

`A @use B`，`B @forward C1, C2`。
`A` 中可以通过 `B.member` 使用 `C1, C2` 中定义的成员。
但是无法区分 `B.member` 来自 `C1` 还是 `C2`。
为了避免混乱和命名冲突，使用 `as` 给引用文件中的成员添加前缀。

```scss
// src/_list.scss
@mixin reset {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

```scss
// bootstrap.scss
@forward "src/list" as list-*;
```

```scss
// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}
```

```css
/* styles.css */
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

## 可控

通过 `show` 和 `hide` 手动控制转发的成员。

```scss
// src/_list.scss
$horizontal-list-gap: 2em;

@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin list-horizontal {
  @include reset;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: $horizontal-list-gap;
    }
  }
}
```

```scss
// bootstrap.scss
@forward "src/list" hide list-reset, $horizontal-list-gap;
```

## 私有成员

支持私有成员，私有成员不会转发。

## 配置变量

同 `@use`。转发后的可配变量依然可以再次配置。

```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
```

```scss
// _opinionated.scss
@forward 'library' with (
  $black: #222 !default,
  $border-radius: 0.1rem !default
);
```

```scss
// style.scss
@use 'opinionated' with ($black: #333);
```

## @use 与 @forward 合并使用

如果一个模块既需要使用，又需要转发另一个模块，应该通过 `@forward` 和 `@use` 各引用一次，不会多次编译，最终生成的 `CSS` 不会重复。

`@forward` 应先于 `@use`，否则特殊情况下会出错。比如：
`C` 中含有可配变量，`B @use & @forward C`，`A @use B`。
如果 `B` 中 `@use` 先于 `@forward`，在 `A` 中使用 `with` 配置变量会报错。
