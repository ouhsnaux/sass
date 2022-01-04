# 变量

- [语法](#语法)
- [作用域](#作用域)
- [模块化](#模块化)
  - [私有变量](#私有变量)
  - [支持配置](#支持配置)
- [与 `CSS` 变量区别](#与-css-变量区别)

## 语法

* 变量以 `$` 开头。
* 变量声明时，变量名不允许通过表达式生成。
* 变量名不区分 `_` 与 `-`，`$font-size` 与 `$font_size` 是同一个变量。

```scss
// index.scss
$base-color: #c6538c;
$border-dark: rgba($base-color, 0.88);

.alert {
  border: 1px solid $border-dark;
}
```

```css
/* index.css */
.alert {
  border: 1px solid rgba(198, 83, 140, 0.88);
}
```

## 作用域

`Sass` 的作用域是使用 `{}` 划分的。
一般声明与修改变量不会影响父级作用域。
不过可以使用 `!global` 修改父级作用域的变量。

控制流（`if` 等）的 `{}` 不会创建作用域，会直接修改外部变量，控制流内部不允许声明新变量。

## 模块化

详见 `@rules` 中的模块化

### 私有变量

变量名前添加 `_`，表明是私有变量，其他模块不能使用该变量。

### 支持配置

变量声明时，在结尾添加 `!default` 表示该变量可以配置。
引用文件时，使用 `with` 配置这些变量。

```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem,
)
```

```css
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
```

## 与 `CSS` 变量区别

* `Sass` 变量可以参与运算，拼接，`CSS` 不行。
* 作用域层级不同，`CSS` 作用域层级与 `HTML` 结构一致，而 `Sass` 与嵌套层级相同
* `Sass` 变量会被编译成具体的值，而 `CSS` 保持不变。
* 修改 `Sass` 变量，不会影响之前被编译的内容，而修改 `CSS` 变量会影响所有调用处。
