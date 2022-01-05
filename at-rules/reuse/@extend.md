# @extend

## 作用

样式设计经常有这样一种情况：
一个 `class` 拥有另一个 `class` 的所有样式，自身还包含一些特殊样式。
在 `BEM` 的思想中，会在老的 `class` 后添加修饰符来创建一个新的 `class`，并全部添加到 `HTML` 元素中。
这将创建多余的 `HTML`，并将部分 `CSS` 逻辑带入 `HTML`。

```html
<div class="error error--serious">
  Oh no! You've been hacked!
</div>
```

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.error--serious {
  border-width: 3px;
}
```

`@extend` 就是用来解决这类问题的。
继承包括3个专有名词：

- `$extender` 继承者，比如 `.error--serious`
- `$extendee` 被继承者，比如 `.error`
- `$selector` 匹配被继承者的选择器，包括嵌套，组合选择器，伪元素等等。比如 `.error` 和 `.error:hover`

语法如下：

```scss
$selector { ... }

#{$extender} {
  @extend #{$extendee}
}
```

`@extend` 将所有应用到 `$extendee` 的规则应用到 `$extender` 来解决上述问题。

`@extend` 通过将所有 `$selector` 的样式规则应用到 `$selector` 和 `$extender` 合并得到的选择器来实现的。

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

## 智能合并

`Sass` 合并 `$selector` 与 `$extender` 的过程非常智能。

### 删除无用选择器

不会生成无法选中元素的选择器，比如 `#main#footer`

```scss
.content nav.sidebar {
  @extend .info;
}

// 不会被继承，没有既是p又是nav的元素
p.info {
  background-color: #dee9fc;
}
```

### 交叉

当 `$selector` 与 `$extender` 都包含后代选择器时，为了匹配不同嵌套顺序的 `HTML` 元素，父级选择器会交叉，生成2个规则。

```scss
// index.scss
.guide .info {
  border: 1px solid rgba(#000, 0.8);
  border-radius: 2px;
}

.content nav.sidebar {
  @extend .info;
}
```

```css
/* index.css .content 与 .guide 交叉 */
.guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar {
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 2px;
}
```

### 合并

当一个选择器匹配内容包含另一个时，只保留选择范围更小的选择器

```scss
// index.scss
.content nav.sidebar {
  @extend .info;
}

main.content .info {
  font-size: 0.8em;
}
```

```css
/* index.css */
/* main.content 与 content 合并，只保留main.content */
main.content .info, main.content nav.sidebar {
  font-size: 0.8em;
}
```

### 优先级

精简选择器的同时确保特异性大于等于 `$extender` 的特异性。

### 其它

智能地处理组合选择器，全局选择器和伪类。

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
/* index.css 处理 hover 伪类*/
.error:hover, .error--serious:hover {
  background-color: #fee;
}

.error--serious {
  border-width: 3px;
}
```

## 占位选择器（placeholder selector）

以 `%` 开头命名的选择器，专门用于继承，不会生成 `CSS` 代码。支持私有。

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

## 继承范围

通过 `@use` 和 `@forward`引用文件，可以继承被引用文件和被递归引用文件中的选择器。
，非引用文件中的选择器不可继承。

`A @use B1, C, B1 @use B2, B2 @use B3`。
`B1` 可以继承 `B2` 和 `B3` 中的选择器。
尽管最终 `B1` 和 `C` 的样式会合并到 `A`，但是 `B1` 与 `C` 无引用关系，不能继承。

通过 `@import` 引用，则可以继承所有参与编译的选择器。

## 可选

如果找不到对应 `$extendee` 的 `$selector`，编译时将报错。
这能避免拼写错误导致的问题。
如果不想使用这个特性，在继承后添加 `!optional`

## 局限

1. 只能继承简单独立的选择器，比如 `.info` 或 `a`。不能继承 `.message.info`
2. 合并交叉时，只生成两个，不会遍历所有父类交叉的可能
3. 在 `CSS @rules` 内部不能继承外部的样式。

## 相关内置函数

### selector.unify

计算两个选择器合并的结果。

```scss
@debug selector.unify("a", ".disabled"); // a.disabled
@debug selector.unify("a.disabled", "a.outgoing"); // a.disabled.outgoing
@debug selector.unify("a", "h1"); // null
@debug selector.unify(".warning a", "main a"); // .warning main a, main .warning a
```

### selector.extend

计算继承后生成的选择器。

`selector.extend($selector, $extendee, $extender)`

```scss
@debug selector.extend("a.disabled", "a", ".link"); // a.disabled, .link.disabled
@debug selector.extend("a.disabled", "h1", "h2"); // a.disabled
@debug selector.extend(".guide .info", ".info", ".content nav.sidebar");
// .guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar
```
