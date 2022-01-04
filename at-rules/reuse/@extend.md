# @extend

## 作用

将被继承的选择器的样式，完全应用到继承的选择器。
可以减少冗余 `CSS`，或减少 `HTML` 中多余的类。
使用 `@extend <selector>` 表明继承关系。

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

## 全量继承

被继承选择器出现的任何样式规则，都将应用到被继承的选择器。包括嵌套，伪元素等等。

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

继承发生在父选择器被编译后，

TODO placeholder selector
TODO 可以继承引用文件中的片段
