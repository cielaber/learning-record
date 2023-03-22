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

### backdrop-filter

```css
backdrop-filter = none | <filter-value-list>  

<filter-value-list> = [ <filter-function> | <url> ]+  

<filter-function> = <blur()> | <brightness()> | <contrast()> | <drop-shadow()>  | <grayscale()> | <hue-rotate()> | <invert()> | <opacity()> | <sepia()> | <saturate()>     

/* 获取指向 SVG 滤镜的 URI。 */
<url> = url( <string> <url-modifier>* ) | src( <string> <url-modifier>* )  

/* 将高斯模糊应用于输出图片。*/
<blur()> = blur( <length>? )  

/* 将线性乘数应用于输入图像，使其看起来更亮或更暗。 */
<brightness()> = brightness( [ <number> | <percentage> ]? )  

/* 调整输入图像的对比度。 */
<contrast()> = contrast( [ <number> | <percentage> ]? )  

/* 将投影应用于图像，这个函数有点类似于 box-shadow 属性。box-shadow 属性在元素的整个框后面创建一个矩形阴影，而 drop-shadow() 过滤器则是创建一个符合图像本身形状 (alpha 通道) 的阴影。 */
<drop-shadow()> = drop-shadow( [ <color>? && <length>{2,3} ] )  

/* 对图片进行灰度转换。 */
<grayscale()> = grayscale( [ <number> | <percentage> ]? )  

/* 在图像上对非黑白色应用色相旋转。 */
<hue-rotate()> = hue-rotate( [ <angle> | <zero> ]? )  

/* 在图像上应用颜色反转。 */
<invert()> = invert( [ <number> | <percentage> ]? )  

/* 为元素指定不透明度。 */
<opacity()> = opacity( [ <number> | <percentage> ]? )  

/* 将图像转换为深褐色。 */
<sepia()> = sepia( [ <number> | <percentage> ]? )  

/* 转换图像饱和度。 */
<saturate()> = saturate( [ <number> | <percentage> ]? ) 
```

属性可以为一个元素后面区域添加图形效果，它适用于元素*背后*的所有元素，为了看到效果，必须使元素或其背景至少部分透明。

```html
<style>
    body {
        display: flex;
        justify-content: center;
    }
    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .wrap {
        width: 500px;
        height: 280px;
        background: url('http://www.eternitywith.xyz/image/2.jpg');
        background-size: contain;
        margin: 20px;
    }
    .content1 {
        width: 200px;
        height: 100px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
    }
    .content2 {
        width: 200px;
        height: 100px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.3);
        backdrop-filter: hue-rotate(120deg);
    }
</style>

<body>
    <div class="wrap">
        <div class="content1">只有月亮经过。</div>
    </div>
    <div class="wrap">
        <div class="content2">只有月亮经过。</div>
    </div>
</body>
```

![image-20230320230019851](./image-css属性/image-20230320230019851.png)

### backface-visibility

`backface-visibility = visibile | hidden`

属性指定当元素背面朝向观察者时是否可见，此属性对2D变换没有影响，2D没有透视，但是当变换导致元素在3D空间中旋转时，背面变得可见。

```html
<style>
  .showbf div {
    backface-visibility: visible;
  }
  .hidebf div {
    backface-visibility: hidden;
  }
  .container {
    width: 150px;
    height: 150px;
    margin: 75px 0 0 75px;
    border: none;
  }
  .cube {
    width: 100%;
    height: 100%;
    /* perspective指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果 */
    perspective: 550px;
    /* perspective-origin 指定了观察者的位置，用作 perspective 属性的消失点。 */
    perspective-origin: 150% 150%;
    /* transform-style 设置元素的子元素是位于 3D 空间中(preserve-3d)还是平面中(flat) */
    transform-style: preserve-3d;
  }
  .face {
    display: block;
    position: absolute;
    width: 100px;
    height: 100px;
    border: none;
    line-height: 100px;
    font-size: 60px;
    color: white;
    text-align: center;
  }
  .front {
    background: rgba(0, 0, 0, 0.3);
    transform: translateZ(50px);
  }
  .back {
    background: rgba(0, 255, 0, 1);
    color: black;
    transform: rotateY(180deg) translateZ(50px);
  }
  .right {
    background: rgba(196, 0, 0, 0.7);
    transform: rotateY(90deg) translateZ(50px);
  }
  .left {
    background: rgba(0, 0, 196, 0.7);
    transform: rotateY(-90deg) translateZ(50px);
  }
  .top {
    background: rgba(196, 196, 0, 0.7);
    transform: rotateX(90deg) translateZ(50px);
  }
  .bottom {
    background: rgba(196, 0, 196, 0.7);
    transform: rotateX(-90deg) translateZ(50px);
  }
  th, p, td {
    background-color: #eeeeee;
    margin: 0px;
    padding: 6px;
    text-align: left;
  }
</style>
<body>
  <table>
    <tr>
      <th><code>backface-visibility: visible;</code></th>
      <th><code>backface-visibility: hidden;</code></th>
    </tr>
    <tr>
      <td>
        <div class="container">
          <div class="cube showbf">
            <div class="face front">1</div>
            <div class="face back">2</div>
            <div class="face right">3</div>
            <div class="face left">4</div>
            <div class="face top">5</div>
            <div class="face bottom">6</div>
          </div>
        </div>
        <p>由于所有的面都是部分透明的，所以背面（2、4、5）可以透过前面（1、3、6）看到。</p>
      </td>
      <td>
        <div class="container">
          <div class="cube hidebf">
            <div class="face front">1</div>
            <div class="face back">2</div>
            <div class="face right">3</div>
            <div class="face left">4</div>
            <div class="face top">5</div>
            <div class="face bottom">6</div>
          </div>
        </div>
        <p>后面的三个面（2、4、5）被隐藏了。</p>
      </td>
    </tr>
  </table>
</body>
```

![image-20230321222201005](./image-css属性/image-20230321222201005.png)

### block-size

`block-size = <'width'>`

属性会根据元素的书写模式来定义元素的水平宽度或者垂直高度。

它会根据`writing-mode`的值来映射width属性或者height属性。如果书写模式是垂直方向，则`block-size`的值就会和元素的宽有关，否则就会和元素的高有关。

一个与`block-size`相关的属性是`inline-size`，`block-size`用于定义某元素在某方向上的长度，而`inline-size`则用于定义元素在另一个方向上的长度。

```html
<style>
    body {
        display: flex;
    }
    p {
        margin: 20px;
        background-color: aqua;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
    }
    .text1 {
        block-size: 100px;
        writing-mode: horizontal-tb;
    }
    .text2 {
        block-size: 100px;
        writing-mode: vertical-lr;
    }
    .text3 {
        block-size: auto;
        writing-mode: horizontal-tb;
    }
    .text4 {
        block-size: auto;
        writing-mode: vertical-lr;
    }
</style>
<body>
    <p class="text1">春天里的事物都太浅薄，我不要春天，我不要玫瑰。</p>
    <p class="text2">春天里的事物都太浅薄，我不要春天，我不要玫瑰。</p>
    <p class="text3">春天里的事物都太浅薄，我不要春天，我不要玫瑰。</p>
    <p class="text4">春天里的事物都太浅薄，我不要春天，我不要玫瑰。</p>
</body>
```

![image-20230322231846494](./image-css属性/image-20230322231846494.png)

