# 流程控制

- [逻辑值](#逻辑值)
- [条件判断](#条件判断)
- [循环](#循环)
  - [@for](#for)
  - [@while](#while)
  - [@each](#each)

## 逻辑值

只有 `false` 和 `null` 为逻辑假，不能通过判断，其他值都是真。

## 条件判断

`@if, @else, @else if`

## 循环

### @for

从一个数字遍历到另一个数，

`@for A to B`，从 `A` 到 `B` 不包括 `B`。
`@for A through B`，从 `A` 到 `B` 包括 `B`。

```scss
$base-color: #036;

@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

### @while

只在不适用 `@each` 和 `@for` 的情况下使用。

```scss
@use "sass:math";

/// Divides `$value` by `$ratio` until it's below `$base`.
@function scale-below($value, $base, $ratio: 1.618) {
  @while $value > $base {
    $value: math.div($value, $ratio);
  }
  @return $value;
}

$normal-font-size: 16px;
sup {
  font-size: scale-below(20px, 16px);
}
```

### @each

用于遍历 `list` 和 `map` 及其他结构化数据

```scss
// list
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```

```scss
// map
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
```

```scss
// 其它结构话数据
// 根据位置关系解析，如果找不到数据会填充 `null`
$icons:
  "eye" "\f112" 12px,
  "start" "\f12e" 16px,
  "stop" "\f12f" 10px;

@each $name, $glyph, $size in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
    font-size: $size;
  }
}
```
