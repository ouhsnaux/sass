# @use

- [引用](#引用)
- [别名](#别名)
- [不转发](#不转发)
- [私有成员](#私有成员)
- [配置变量](#配置变量)

## 引用

通过 `@use` 引用其它文件，可以使用其中的成员，并合并编译生成的 `CSS` 文件。
使用成员需要指明来源。

```scss
// src/_corner.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}
```

```scss
// style1.scss 普通引用，使用文件名作为分组
@use "src/corners";

.button {
  @include corners.rounded;
  padding: 5px + corners.$radius;
}
```

```css
/* style.css */
.button {
  border-radius: 3px;
  padding: 8px;
}
```

## 别名

成员自动根据文件名分组。可以给分组添加别名。
如果别名是 `*`，则不用指明（尽量不要使用）。
编译结果同上。

```scss
// style2.scss 使用别名 c
@use "src/corners" as c;

.button {
  @include c.rounded;
  padding: 5px + c.$radius;
}
```

```scss
// style3.scss 别名使用 *
@use "src/corners" as *;

.button {
  @include rounded;
  padding: 5px + $radius;
}
```

## 不转发

通过 `@use` 引用的成员，不能在被引用时使用。

`B @use C`，`A @use B`。`A` 无法使用 `C` 的成员。

## 私有成员

名字以 `_` 开头的成员表示私有，通过 `@use` 无法使用。

## 配置变量

变量声明后添加 `!default` 表示支持配置，
通过 `@use` 引用文件时，使用 `with $map` 配置被引用文件中支持配置变量的值。

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
// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```

```css
/* style.css */
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
```
