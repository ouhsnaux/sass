# 运算

- [运算](#运算)
  - [相等关系](#相等关系)
  - [数学运算](#数学运算)
    - [加减](#加减)
    - [乘除，取余](#乘除取余)
  - [关系运算](#关系运算)
  - [字符串运算](#字符串运算)
    - [运算符](#运算符)
    - [插值](#插值)
  - [布尔运算](#布尔运算)

## 相等关系

- `Number` 单位与值都相同，或单位转换后值相同。
- `String` 内容相同即相同，不区分引号。
- `Color` 转换后相同即相等。
- `true, false, null` 只等于自己。
- `List` 完全相同即相等。括号与分割符也必须相同。
- `Map` 其中的 `key`,`value` 都相同
- `Function` 属于引用类型，只等于自身，即使内容相同也不相等。

```scss
@debug 1px == 1; // false
@debug 96px == 1in; //true

@debug "abc" == abc; // true

@debug hsl(34, 35%, 92.1%) == #f2ece4; // true

@debug (5px 7px 10px) == (5px 7px 10px); // true
@debug (5px 7px 10px) == (5px,7px,10px); // false
@debug (5px 7px 10px) == [5px 7px 10px]; // false 

$theme: ("venus": #998099, "nebula": #d2e1dd);
@debug $theme == ("nebula": #d2e1dd, "venus": #998099); // true
@debug $theme != ("venus": #998099, "iron": #dadbdf); // true
```

## 数学运算

单位也参与运算，与现实生活类似，可以使用复合单位。
应保证最终的单位可用。

### 加减

* 如果至少有一方没有单位时，按相同单位处理。
* 否则先做单位换算，再运算
* 如果无法换算，则报错

```scss
@debug 10px + 6px; // 16px
@debug 10px + 6; // 16px
@debug 1in + 6px; // 102px or 1.0625in
@debug 1in + 1s;
//     ^^^^^^^^
// Error: Incompatible units s and in.
```

### 乘除，取余

与现实世界相同，单位也可以乘除，生成复合单位。
最终的结果要保证在 `CSS` 中有效。

`/` 在 `CSS` 中一般作为分隔符使用，为避免混淆，除法使用 `math.div()`。
除法不会自动取整。

取余运算结果单位与除数相同。

```scss
@debug 5px * 1px; // 5px*px
@debug math.div(30deg, 2s); // 15deg/s

@debug math.div(5, 2); // 2.5

@debug 5px % 2; // 1px
```

## 关系运算

`>, >=, <, <=`，只用于操作数字。
单位处理同加减数学运算的加减操作。

## 字符串运算

### 运算符

* `+` 连接两个字符串
* `-` 使用 `-` 连接字符串
* `/` 作为一元运算符，在字符串前添加 `/`

`+, -` 含义比较多，容易引起歧义，写法最好遵照以下规则：

* 作为二元运算符，总是在符号前后都加空格。
* 作为一元运算符，在符号前加空格。
* 作为 `list` 中的元素且含有 `+` 或 `-`，应该加括号。
* 如果字符串中包括 `+` 或 `-`，最好使用有引号字符串，与带单位数字运算区分。

### 插值

字符串拼接最好使用插值（`Interpolation`），将表达式包裹在 `#{}`内部

```scss
$roboto-variant: "Mono";
@debug "Roboto #{$roboto-variant}"; // "Roboto Mono"
```

## 布尔运算

`not, and, or`，注意短路运算。

`if` 函数作用同三元运算

<!-- TODO [calculation](https://sass-lang.com/documentation/values/calculations) -->