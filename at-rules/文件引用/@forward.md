# @forward

* 无法使用
* 转发
  * 合并转发
  * 添加前缀
  * 可控

## 无法使用

通过 `@forward` 引用文件，无法使用内部的 `Members`。

## 转发

通过 `@forward` 可以将 `Members` 转发。

### 合并转发

`A @use B`，`B @forward C1, C2`。
`A` 中可以通过 `B.member` 使用 `C1, C2` 中定义的 `Members`。

### 添加前缀

在 `A` 中无法区分 `B.member` 来自 `C1` 还是 `C2`。
为了避免混乱和命名冲突，使用 `as` 给引用文件中的 `Members` 添加前缀。

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
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

### 可控

可以通过 `show` 和 `hide` 控制转发的 `Members`。

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

<!-- TODO @extend后继续看看什么意思 -->
💡 Fun fact:
The @forward rule acts just like @use when it comes to a module’s CSS. Styles from a forwarded module will be included in the compiled CSS output, and the module with the @forward can extend it, even if it isn’t also @used.
