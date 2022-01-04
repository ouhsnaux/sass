# 值类型

- [Number](#number)
  - [单位](#单位)
  - [精度](#精度)
- [String](#string)
  - [分类](#分类)
  - [对比](#对比)
- [Color](#color)
- [Boolean](#boolean)
- [null](#null)
- [Function](#function)
- [list](#list)
  - [语法](#语法)
  - [常见操作](#常见操作)
- [map](#map)
  - [语法](#语法-1)
  - [常见操作](#常见操作-1)

## Number

支持科学计数法 `5e3 = 5000`;

### 单位

`Number` 分为有单位和无单位两种。对，`16px` 也属于 `Number` 类型。
单位也参与运算，并且与现实生活相同（详见[运算章节](./operator.md)）。

```scss
@debug 5px * 1px; // 5px*px
@debug math.div(30deg, 2s); // 15deg/s

@debug 1in + 6px; // 102px or 1.0625in

@debug 1in + 1s;
//     ^^^^^^^^
// Error: Incompatible units s and in.
```

`%` 也是单位，`50%` 不等于 `0.5`。

```scss
@use "sass:math";

@debug 100% == 1; // false
@debug 10% * 10%; // 100%*%

// 百分比与数字转化
@debug math.div(50%, 100%); // 0.5 百分比转化为小数
@debug 0.5 * 100%; // 50% 小数转化为百分比
@debug math.percentage(0.5); // 50% 小数转化为百分比
```

可以通过运算添加和删除单位

```scss
@debug 16 + 0px; // 16px
@debug 16 * 1px; // 16px

@debug math.div(16px, 1px); // 16
```

### 精度

`Sass` 运算的结果精确到小数点后 `10` 位，之后的一位进行4舍5入。
可以对小数进行相等比较，比如经典的 `0.1 + 0.2 = 0.3`，是成立的。
`Sass` 中间运算过程的保留的小数位数远大于 `10`，可以忽略精度丢失的问题。

```scss
@use "sass:math";

@debug 0.01234567891; // 0.0123456789
@debug 0.01234567895; // 0.012345679

@debug 0.1 + 0.2 == 0.3; // true

@debug (0.1 + 0.2) * 1e6; // 300000.0000000001
```

## String

### 分类

`String` 分为**有引号**和**无引号**两种。

有引号 `String` 写在 `'` 或 `"` 内部。
内容包括 `'`、`"`、换行（`\a`）及 `Unicode` 编码时需要转义。

无引号 `String` 直接写内容。

可以通过 `string.quote()` 和 `string.unquote()` 相互转换。

### 对比

最好使用有引号 `String`。

1. 无引号 `String` 容易与其它数据类型（比如 `Color`）甚至是操作符混淆。
2. [无引号转义规则](https://sass-lang.com/documentation/values/strings#escapes-in-unquoted-strings)非常奇怪

## Color

所有 `CSS` 合法的颜色都可以使用

- `#` 开头，6位和8位16进制
- 颜色保留字，`red` 等
- `rgb, rgba, hsl, hsla`

## Boolean

包含 `true, false` 两个值。

在条件判断中，只有 `false` 和 `null` 这两个假值。

## null

一般由函数运算得出，
比如找不到字符串的下标，返回 `null`，
`map` 中找不到对应的 `key`，返回 `null`。

值为 `null` 的样式规则不会生成 `CSS`。

`null` 不能通过逻辑判断。

## Function

[@function](./at-rules/@function.md)声明的函数也是一种数据类型。

通过 `meta.get-function` 将函数转化为值参与运算。
通过 `meta.call` 调用作为值的函数

## list

### 语法

- 使用 `()` 或 `[]` 包裹，也可以不包裹。单个元素可以视为只有一个元素的 `list`。
- 分隔符：`,` 或空格。
- 下标从 `1` 开始。最后一个是 `-1`。
- 值不可更改，更改操作（包括增加，删除和修改）会生成一个新的 `list`。

### 常见操作

- 查询长度，`list.length($list)`
- 查询第 `n` 个元素，`list.nth($list, $n)`
- 查询下标，`list.index($list, $value)`，查不到返回 `null`
- 新增元素，`append($list, $item)`，返回一个新的 `list`
- 修改制定下标的元素，`list.set-nth($list, $n, $value)`，返回一个新的 `list`
- 遍历，使用 `@each` 遍历
- 删除，通过遍历完成。
- 其他操作，参考[Sass内置List](https://sass-lang.com/documentation/modules/list)

## map

### 语法

- 分隔符：各项 `,` 分隔，值与属性 `:` 分隔
- 小括号包裹，空 `map` 与空 `list` 都是 `()`。
- `key`，任何合法值都可以作为`key`。
- 值不可更改，更改操作（包括增加，删除和修改）会生成一个新的 `map`。

### 常见操作

- 新增和修改，`map.set($map, $key, $value)`，返回一个新 `map`
- 合并，`map.merge($map1, $map2)`，有同名 `key` 时，`map2` 的值会覆盖 `map1` 的值
- 查，`map.get($map, $key)`，找不到返回 `null`
- 删除，`map.remove($map, $keys...)` 生成一个新的 `map`
- 使用 `@each` 遍历
- 其他操作，参考[Sass内置Map](https://sass-lang.com/documentation/modules/map)
