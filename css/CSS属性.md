# CSS属性

### accent-color

`accent-color = auto | <color>`

为一些控件设置强调色。

支持标签：

- `<input type="checkbox">`
- `<input type="radio">`
- `<input type="range">`
- `<progress>`

```html
<input type="checkbox" style="accent-color: auto;" checked>
<input type="checkbox" style="accent-color: red;" checked>

<input type="radio" style="accent-color: auto;" checked>
<input type="radio" style="accent-color: red;" checked>

<input type="range" style="accent-color: auto;">
<input type="range" style="accent-color: red;">

<progress style="accent-color: auto;"></progress>
<progress style="accent-color: red;"></progress>
```

![image-20230317221522636](./image-css属性/uTools_1679062575216.png)

参考：https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color

### all

`all = initial | inherit | unset | revert | revert-layer `

- initial：属性初始值。
- inherit：继承父元素属性的值。
- unset：如果属性是可继承的，则值为父元素的属性值，否则值为初始值。
- revert：将属性的级联值从其当前值恢复为如果当前样式原点未对当前元素进行更改，则该属性将具有的值。因此，如果属性从其父级继承，它会将属性重置为继承的值，或者重置为由用户代理的样式表（即浏览器默认样式），或者如果浏览器默认值都没有，则为初始值。

all属性为一个简写属性，功能是将`unicode-bidi`与`direction`属性之外的所有属性重新设置为初始值或者默认值。

```html
<style>
    div {
        background-color: #f0f0f0;
        font-size: small;
        color: blue;
        margin: 20px;
    }
    blockquote {
        background-color: skyblue;
        color: red;
    }
    .initial blockquote {
        all: initial;
        /* 
          属性值为inital的情况下，blockquote变成了display: inline，且background-color、font-size、color均恢复成了初始值：
          background-color: transparent;
          font-size: medium;
          color: black;
        */
    }
    .inherit blockquote {
        all: inherit;
        /* 
          属性值为inherit的情况下，font-size、color属于继承属性，继承了其父元素的属性值：
          font-size: small;
          color: blue;
        */
    }
    .unset blockquote {
        all: unset;
        /* 
          属性值为unset的情况下，由于display为非继承元素，因此display为初始值inline，且font-size、color继承了其父元素的属性值：
          font-size: small;
          color: blue;
        */
    }
    .revert blockquote {
        all: revert;
        /* 
          属性值为revert的情况下，display采用浏览器为blockquote定义的display值，为block。而font-size、color继承了其父元素的属性值：
          font-size: small;
          color: blue;
        */
    }
</style>

<div>
    <blockquote>这是一个块级引用元素，引用了一句诗：日出有影，日落有盼。心有可期，忙而不茫。</blockquote>
    然后这是一句紧接着的苍白的文字。
</div>
<div class="initial">
    <blockquote>这是一个块级引用元素，引用了一句诗：日出有影，日落有盼。心有可期，忙而不茫。</blockquote>
    然后这是一句紧接着的苍白的文字。
</div>
<div class="inherit">
    <blockquote>这是一个块级引用元素，引用了一句诗：日出有影，日落有盼。心有可期，忙而不茫。</blockquote>
    然后这是一句紧接着的苍白的文字。
</div>
<div class="unset">
    <blockquote>这是一个块级引用元素，引用了一句诗：日出有影，日落有盼。心有可期，忙而不茫。</blockquote>
    然后这是一句紧接着的苍白的文字。
</div>
<div class="revert">
    <blockquote>这是一个块级引用元素，引用了一句诗：日出有影，日落有盼。心有可期，忙而不茫。</blockquote>
    然后这是一句紧接着的苍白的文字。
</div>
```

![image-20230318233654995](./image-css属性/image-20230318233654995.png)

### aspect-ratio

```
aspect-ratio = auto || <ratio>
<ratio> = <number [0,∞]> [ / <number [0,∞]> ]? 
```

为容器规定了一个**期待的纵横比**，这个纵横比可以用来计算自动尺寸以及为其他布局函数服务。

```html
<style>
    body {
        display: flex;
    }
    div {
        width: 100px;
        height: 100px;
        background-color: bisque;
        margin: 20px;
    }
    div:nth-of-type(1) img {
        width: 100%;
    }
    div:nth-of-type(2) img {
        width: 50%;
        aspect-ratio: 0.5;
    }
    div:nth-of-type(3) img {
        width: 100%;
        aspect-ratio: 1;
    }
    div:nth-of-type(4) img {
        width: 100%;
        aspect-ratio: 2;
    }
    div:nth-of-type(5) img {
        width: 100%;
        aspect-ratio: 0.5;
    }
    div div {
        width: 100%;
        height: auto;
        aspect-ratio: 2;
        background-color: blue;
        margin: 0;
    }
</style>

<div><img src="http://www.eternitywith.xyz/image/1.jpg" ></div>
<div><img src="http://www.eternitywith.xyz/image/1.jpg" ></div>
<div><img src="http://www.eternitywith.xyz/image/1.jpg" ></div>
<div><img src="http://www.eternitywith.xyz/image/1.jpg" ></div>
<div><img src="http://www.eternitywith.xyz/image/1.jpg" ></div>
<div><div></div></div>
```

![image-20230319214306802](./image-css属性/image-20230319214306802.png)