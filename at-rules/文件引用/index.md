# 文件引用

* Partials
* 引用方式
* 共同点
  * 三种方式共同点
  * `@use & @forward`
* 适用场景

## Partials

文件名以 `_` 开头，作为模块，只在被引用后才被编译。
引用时可以不写 `_`。

## 方式

* `@use`
* `@forward`
* `@import`

## 共同点

1. 引用文件，合并编译后的 `css`。
2. 智能导航。引用文件不用指明文件类型，省略文件后缀。如果引用文件夹下的 `index`，可以只写到文件夹。

### `@use` 与 `@forward` 共同点

1. 可以定义私有 `Members`。以连字符开头，比如 `$-radius`。
   `Members` 是指 `variables, mixins, functions`
2. 支持配置。引用文件时使用 `with` 配置变量。

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
      $border-radius: 0.1rem,
    )
    ```

    ```css
    code {
      border-radius: 0.1rem;
      box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
    }
    ```

## @use 与 @forward 合并使用

如果一个模块需要同时转发和使用另一个模块，则需要通过 `@forward` 和 `@use` 各引用一次，不会多次编译。

应让 `@forward` 在前。否则可能出错。

举个例子：

`A @use B`，`B @use & @forward C`。`C` 中含有可配变量。

在 `A` 中使用 `with` 配置变量。如果 `B` 中 `@use` 在前则会报错。

## TODO 适用场景