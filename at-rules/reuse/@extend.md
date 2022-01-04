# @extend

## 作用

将被继承的选择器的样式，应用到继承的选择器。
可以减少冗余 `CSS`，或减少 `HTML` 中多余的类。
使用 `@extend <selector>` 表明继承关系。

应用到被继承选择器的任何样式规则，都将应用到继承的选择器。包括父元素嵌套，组合选择器，伪元素等等。

继承发生在父选择器被编译成具体的选择器之后。

```scss
// index.scss
.error {
  border: 1px #f00;
  background-color: #fdd;

  &--serious {
    @extend .error;
    border-width: 3px;
  }
}
```

```css
/* index.css */
.error, .error--serious {
  border: 1px #f00;
  background-color: #fdd;
}
.error--serious {
  border-width: 3px;
}
```

## 智能联合

继承时选择器的合并非常智能。

- 不会生成无法选中元素的选择器，比如 `#main#footer`
- 复杂选择器会生成交错的规则，以匹配不同顺序的 `HTML` 元素
- 当一个选择器选中内容包含另一个时，会合并使用选择范围更小的选择器
- 精简选择器的同时确保特异性大于等于扩展器的特异性。
- 智能地处理组合选择器，全局选择器和伪类。

```scss
// index.scss
.error:hover {
  background-color: #fee;
}

.error--serious {
  @extend .error;
  border-width: 3px;
}
```

```css
/* index.css */
.error:hover, .error--serious:hover {
  background-color: #fee;
}

.error--serious {
  border-width: 3px;
}
```

```scss
.content nav.sidebar {
  @extend .info;
}

// 不会被继承，没有既是p又是nav的元素
p.info {
  background-color: #dee9fc;
}

// 不确定.guide 和 .content 的顺序，sass会生成两种顺序的样式规则
.guide .info {
  border: 1px solid rgba(#000, 0.8);
  border-radius: 2px;
}

// main.content 与 .content 会合并
main.content .info {
  font-size: 0.8em;
}
```

```css
p.info {
  background-color: #dee9fc;
}

.guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar {
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 2px;
}

main.content .info, main.content nav.sidebar {
  font-size: 0.8em;
}
```

`Sass` 提供了两个内置函数，
`selector.unify()` 计算连个选择器合并的结果。

```scss
@debug selector.unify("a", ".disabled"); // a.disabled
@debug selector.unify("a.disabled", "a.outgoing"); // a.disabled.outgoing
@debug selector.unify("a", "h1"); // null
@debug selector.unify(".warning a", "main a"); // .warning main a, main .warning a
```

`selector.extend()` 计算继承后的选择器。第一个参数是被继承选择器出现的选择器，第二个参数是被继承选择器，第三个参数是继承选择器。

```scss
// a.disabled { ... }
// .link {
//   @extend a
// }

@debug selector.extend("a.disabled", "a", ".link"); // a.disabled, .link.disabled
@debug selector.extend("a.disabled", "h1", "h2"); // a.disabled

// .guide .info { ... }
// .content nav.sidebar {
//   @extend .info
// }
@debug selector.extend(".guide .info", ".info", ".content nav.sidebar");
// .guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar
```

## 占位选择器（placeholder selector）

以 `%` 开头明明的选择器，专门用于继承，不会生成 `CSS` 代码。支持私有。

```scss
// index.scss
.alert:hover, %strong-alert {
  font-weight: bold;
}

%strong-alert:hover {
  color: red;
}
```

```css
/* index.css */
.alert:hover {
  font-weight: bold;
}
```

TODO 可以继承引用文件中的片段
