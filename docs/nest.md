# 嵌套

- [选择器嵌套](#选择器嵌套)
- [属性前缀嵌套](#属性前缀嵌套)
- [父选择器](#父选择器)

## 选择器嵌套

`CSS` 使用空格表明选择器层级关系，比如 `.parent .child`。
而 `SCSS` 除此之外，还可以使用 `{}`，比如 `.parent { .child }`

## 属性前缀嵌套

前缀相同的属性，可以通过嵌套复用前缀。

```scss
// index.scss
transition {
  property: font-size;
  duration: 4s;
  delay: 2s;
}

margin: auto {
  bottom: 10px;
  top: 2px;
}
```

```css
/* index.css */
transition-property: font-size;
transition-duration: 4s;
transition-delay: 2s;

margin: auto;
margin-bottom: 10px;
margin-top: 2px;
```

## 父选择器

`&` 表示所有外层选择器组成的复合选择器。

```scss
// index.scss
.a {
  .b .c {
    &::before {
      content: '';
    }
  }
}
```

```css
/* index.css */
.a .b .c::before {
  content: '';
}
```
