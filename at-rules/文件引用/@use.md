# @use

* 分组使用
  * 别名
* 不转发

## 引用 `Members` 自动分组

引用其它文件的 `Members` 自动根据引用来源分组。
可以给分组起别名。
如果将别名定义为 `*`，可以直接使用（不推荐）。

示例：下面三个 `scss` 文件将被编译为相同的结果。

```scss
// src/_corner.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}
```

1. 根据文件名分组

    ```scss
    // style1.scss
    @use "src/corners";

    .button {
      @include corners.rounded;
      padding: 5px + corners.$radius;
    }
    ```

2. 对分组起别名

    ```scss
    // style2.scss
    @use "src/corners" as c;

    .button {
      @include c.rounded;
      padding: 5px + c.$radius;
    }
    ```

3. 撤销分组

    ```scss
    // style3.scss
    @use "src/corners" as *;

    .button {
      @include rounded;
      padding: 5px + $radius;
    }
    ```

编译结果

```css
/* style.css */
.button {
  border-radius: 3px;
  padding: 8px;
}
```

## `Members` 不转发

`A @use B`，`B @use C`。`A` 无法使用 `C` 的 `Members`。
