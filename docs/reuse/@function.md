# @function

- [作用](#作用)
- [参数](#参数)
- [其它函数](#其它函数)

## 作用

封装数据的复杂运算，生成值。最好只用作纯函数。
使用 `@function` 定义，内部使用 `@return` 返回值。

```scss
// index.scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px;
}
```

```css
/* index.css */
.sidebar {
  float: left;
  margin-left: 64px;
}
```

## 参数

语法同 `@mixin`

## 其它函数

- `Sass` 内部提供了许多内置函数，用于处理各种类型的数据。
- `CSS` 函数，不会被编译，但是参数可以被编译。
