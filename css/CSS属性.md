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

### caption-side

```css
caption-side: top;
caption-side: bottom;

/* 非标准值，具体按浏览器支持度为准 */
caption-side: left;
caption-side: right;
caption-side: top-outside;
caption-side: bottom-outside;
```

属性会将表格的标题`<caption>`放到规定的位置，但是具体显示的位置与表格的`writing-mode`属性有关。

```html
<style>
  body {
    display: flex;
  }
  table {
    margin: 20px;
  }
  td {
    padding: 5px;
  }
  tr {
    background: #eee;
  }
  caption {
    background: #fc3;
  }
  table:nth-of-type(2) caption {
    caption-side: bottom;
  }
</style>
<body>
  <table>
    <caption>最后一卷胶片</caption>
    <tr>
      <td>这卷胶片再珍贵</td>
      <td>也值得为你浪费</td>
    </tr>
  </table>
  <table>
    <caption>最后一卷胶片</caption>
    <tr>
      <td>这卷胶片再珍贵</td>
      <td>也值得为你浪费</td>
    </tr>
  </table>
</body>
```

![image-20230322231846494](./image-css属性/uTools_1679564566432.png)

### caret-color

`caret-color = auto | <color>`

属性用来定义插入光标的颜色，这里说的插入光标，指的是在网页的可编辑器区域内，用来指示用户的输入具体会插入到哪里的那个一闪一闪的形似竖杠`|`的东西。
>这里说的“插入光标(insertion caret)”只是光标(caret)的一种。比如有些浏览器中有一种光标叫做“导航光标(navigation caret)”，它可以在不可编辑区域内来回移动。此外，当鼠标指针移动到一段`cursor`属性是`auto`的文本上方时，或移动到`cursor`属性是`text`、`vertical-text`的内容上方时，虽然看起来有点像插入光标，但它不是插入光标(caret)，而是鼠标指针光标(cursor)。

```html
<style>
  input {
    caret-color: red;
  }
</style>
<body>
  <input type="text">
</body>
```

![image-20230322231846494](./image-css属性/uTools_1679567058505.png)

### clear

`clear = inline-start | inline-end | block-start | block-end | left | right | top | bottom | none`

属性指定一个元素是否必须移动（清除浮动后）到在它之前的浮动元素下面，适用于浮动和非浮动元素。

当应用于非浮动块时，它将非浮动块的边框边界移动到所有相关浮动元素外边界的下方。这个非浮动块的顶部外边距会折叠。

另一方面，两个浮动元素的垂直外边距不会折叠。当应用于浮动元素时，它将底部元素的外边界边缘移动到所有相关浮动元素外边界边缘的下方。这会影响后面浮动元素的布局，因为后面的浮动元素的位置无法高于它之前的元素。

```html
<style>
  body {
    display: flex;
  }
  .container {
    border: 1px solid #c5c5c5;
    padding: 0.75em;
    text-align: left;
    line-height: normal;
    margin: 10px;
  }
  .floated-left {
    border: solid 10px #ffc129;
    background-color: rgba(255, 244, 219, 0.6);
    padding: 1em;
    float: left;
  }
  .floated-right {
    border: solid 10px #ffc129;
    background-color: rgba(255, 244, 219, 0.6);
    padding: 1em;
    float: right;
    height: 150px;
  }
  .words1 {
    clear: none;
  }
  .words2 {
    clear: left;
  }
  .words3 {
    clear: right;
  }
  .words4 {
    clear: both;
  }
</style>
<div class="container">
  <div class="floated-left">Left</div>
  <div class="floated-right">Right</div>
  <div class="words1">
    “春天里的事物太浅薄，我不要春天，不要玫瑰。不要你眼里的泪光。我只要你。我只要你一个完整的朝夕” ——余秀华《你说抱着我如抱着一朵白云》
  </div>
</div>
<div class="container">
  <div class="floated-left">Left</div>
  <div class="floated-right">Right</div>
  <div class="words2">
    “春天里的事物太浅薄，我不要春天，不要玫瑰。不要你眼里的泪光。我只要你。我只要你一个完整的朝夕” ——余秀华《你说抱着我如抱着一朵白云》
  </div>
</div>
<div class="container">
  <div class="floated-left">Left</div>
  <div class="floated-right">Right</div>
  <div class="words3">
    “春天里的事物太浅薄，我不要春天，不要玫瑰。不要你眼里的泪光。我只要你。我只要你一个完整的朝夕” ——余秀华《你说抱着我如抱着一朵白云》
  </div>
</div>
<div class="container">
  <div class="floated-left">Left</div>
  <div class="floated-right">Right</div>
  <div class="words4">
    “春天里的事物太浅薄，我不要春天，不要玫瑰。不要你眼里的泪光。我只要你。我只要你一个完整的朝夕” ——余秀华《你说抱着我如抱着一朵白云》
  </div>
</div>
```

![image-20230326230454935](./image-css属性/image-20230326230454935.png)

### clip-path

```css
clip-path = <clip-source> | [<basic-shape> || <geometry-box>] | none

<clip-source> = <url>

<geometry-box> = <shape-box> | fill-box | stroke-box | view-box

<url> = url(<string> <url-modifier>*) |  src(<string><url-modifier>*)

<shape-box> = <box> | margin-box

<box> = border-box | padding-box | content-box
```

属性使用裁剪方式创建元素的可显示区域，区域内的部分显示，区域外的隐藏。

```html
<style>
  html,
  body {
    height: 100%;
    box-sizing: border-box;
    background: #eee;
  }
  .grid {
    width: 100%;
    height: 100%;
    display: flex;
    font: 1em monospace;
  }
  .row {
    display: flex;
    flex: 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .col {
    flex: 1 auto;
  }
  .cell {
    margin: 0.5em;
    padding: 0.5em;
    background-color: #fff;
    overflow: hidden;
    text-align: center;
    flex: 1;
  }
  .note {
    background: #fff3d4;
    padding: 1em;
    margin: 0.5em 0.5em 0;
    font: 0.8em sans-serif;
    text-align: left;
    white-space: nowrap;
  }
  .note + .row .cell {
    margin-top: 0;
  }
  .container {
    display: inline-block;
    border: 1px dotted grey;
    position: relative;
  }
  .container::before {
    content: "margin";
    position: absolute;
    top: 2px;
    left: 2px;
    font: italic 0.6em sans-serif;
  }
  .view-box {
    box-shadow: 1rem 1rem 0 #efefef inset, -1rem -1rem 0 #efefef inset;
  }
  .container.view-box::after {
    content: "view-box";
    position: absolute;
    left: 1.1rem;
    top: 1.1rem;
    font: italic 0.6em sans-serif;
  }
  .cell span {
    display: block;
    margin-bottom: 0.5em;
  }
  p {
    font-family: sans-serif;
    background: #bbffcc;
    color: pink;
    margin: 2em;
    padding: 3em 1em;
    border: 1em solid pink;
    width: 6em;
  }
  .none {
    clip-path: none;
  }
  .svg {
    clip-path: url(#myPath);
  }
  .svg2 {
    clip-path: path(
      "M15,45 A30,30,0,0,1,75,45 A30,30,0,0,1,135,45 Q135,90,75,130 Q15,90,15,45 Z"
    );
  }
  .shape1 {
    clip-path: circle(25%);
  }
  .shape2 {
    clip-path: circle(25% at 25% 25%);
  }
  pre {
    margin-bottom: 0;
  }
  svg {
    margin: 1em;
    font-family: sans-serif;
    width: 192px;
    height: 192px;
  }
  svg rect {
    stroke: pink;
    stroke-width: 16px;
    fill: #bbffcc;
  }
  svg text {
    fill: pink;
    text-anchor: middle;
  }
</style>
<body>
  <div class="grid">
    <div class="col">
      <div class="note">clip-path: none</div>
      <div class="row">
        <div class="cell">
          <span>HTML</span>
          <div class="container">
            <p class="none">山有扶苏<br />隰有荷华</p>
          </div>
        </div>
        <div class="cell">
          <span>SVG</span>
          <div class="container view-box">
            <svg viewBox="0 0 192 192">
              <g class="none">
                <rect x="24" y="24" width="144" height="144"></rect>
                <text x="96" y="91">山有扶苏</text>
                <text x="96" y="109">隰有荷华</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div class="note">
        clip-path: url(#myPath)<br /><br />
        Assuming the following clipPath definition:
        <pre>
&lt;svg&gt;
&lt;clipPath id="myPath" clipPathUnits="objectBoundingBox"&gt;
  &lt;path d="M0.5,1
    C 0.5,1,0,0.7,0,0.3
    A 0.25,0.25,1,1,1,0.5,0.3
    A 0.25,0.25,1,1,1,1,0.3
    C 1,0.7,0.5,1,0.5,1 Z" /&gt;
&lt;/clipPath&gt;
&lt;/svg&gt;</pre
        >
      </div>
      <div class="row">
        <div class="cell">
          <span>HTML</span>
          <div class="container">
            <p class="svg">山有扶苏<br />隰有荷华</p>
          </div>
        </div>
        <div class="cell">
          <span>SVG</span>
          <div class="container view-box">
            <svg viewBox="0 0 192 192">
              <g class="svg">
                <rect x="24" y="24" width="144" height="144"></rect>
                <text x="96" y="91">山有扶苏</text>
                <text x="96" y="109">隰有荷华</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div class="note">
        clip-path: path('M15,45 A30,30,0,0,1,75,45 A30,30,0,0,1,135,45
        Q135,90,75,130 Q15,90,15,45 Z')
      </div>
      <div class="row">
        <div class="cell">
          <span>HTML</span>
          <div class="container">
            <p class="svg2">山有扶苏<br />隰有荷华</p>
          </div>
        </div>
        <div class="cell">
          <span>SVG</span>
          <div class="container view-box">
            <svg viewBox="0 0 192 192">
              <g class="svg2">
                <rect x="24" y="24" width="144" height="144"></rect>
                <text x="96" y="91">山有扶苏</text>
                <text x="96" y="109">隰有荷华</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div class="note">clip-path: circle(25%)</div>
      <div class="row">
        <div class="cell">
          <span>HTML</span>
          <div class="container">
            <p class="shape1">山有扶苏<br />隰有荷华</p>
          </div>
        </div>
        <div class="cell">
          <span>SVG</span>
          <div class="container view-box">
            <svg viewBox="0 0 192 192">
              <g class="shape1">
                <rect x="24" y="24" width="144" height="144"></rect>
                <text x="96" y="91">山有扶苏</text>
                <text x="96" y="109">隰有荷华</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  <svg>
    <clipPath id="myPath" clipPathUnits="objectBoundingBox">
      <path
        d="M0.5,1
    C 0.5,1,0,0.7,0,0.3
    A 0.25,0.25,1,1,1,0.5,0.3
    A 0.25,0.25,1,1,1,1,0.3
    C 1,0.7,0.5,1,0.5,1 Z"
      />
    </clipPath>
  </svg>
</body>
```

![image-20230327220421866](./image-css属性/image-20230327220421866.png)

![image-20230327220445142](./image-css属性/image-20230327220445142.png)

### color-scheme

`color-scheme = normal | light | dark | light dark`

操作系统配色方案的常见选择是“亮”和“暗”，或者是“白天模式”和“夜间模式”。当用户选择其中一种配色方案时，操作系统会对用户界面进行调整。这包括表单控件、滚动条和CSS系统颜色的使用值。

```html
<style>
    body {
        display: flex;
    }
    .container p {
        text-align: center;
    }
    .light {
        color-scheme: light;
    }
    .dark {
        color-scheme: dark;
    }
    .outer {
        width: 300px;
        height: 100px;
        overflow: auto;
        background-color: bisque;
    }
    .inner {
        height: 500px;
    }
    li {
        display: flex;
        margin: 10px;
    }
</style>
<body>
    <div class="container light">
        <p>color-scheme: light</p>
        <ul>
            <li>输入框：<input type="text"></li>
            <li>复选框：<input type="checkbox"></li>
            <li>单选框：<input type="radio"></li>
            <li>范围框：<input type="range"></li>
            <li>进度条：<progress id="file" max="100" value="70"> 70% </progress></li>
            <li>文本框：<textarea name="" id="" cols="30" rows="10"></textarea></li>
            <li>滚动条：<div class="outer"><div class="inner"></div></div></li>
        </ul>
    </div>
    <div class="container dark">
        <p>color-scheme: dark</p>
        <ul>
            <li>输入框：<input type="text"></li>
            <li>复选框：<input type="checkbox"></li>
            <li>单选框：<input type="radio"></li>
            <li>范围框：<input type="range"></li>
            <li>进度条：<progress id="file" max="100" value="70"> 70% </progress></li>
            <li>文本框：<textarea name="" id="" cols="30" rows="10"></textarea></li>
            <li>滚动条：<div class="outer"><div class="inner"></div></div></li>
        </ul>
    </div>
</body>
```



![image-20230328224838864](./image-css属性/image-20230328224838864.png)

### columns

`columns = <'column-width'> || <'column-count'>`

属性用来设置元素的列宽和列数。

这是一个简写属性，可单独使用`column-width`和`column-count`来实现其功能。

> column-width：指定最佳列宽。实际列宽可能与指定值不同：当需要填充可用空间时，列宽可能会更宽，而当可用空间太小时，列宽会更窄。该值必须严格为正，否则声明无效。百分比值也是无效的。

```html
<style>
    .content {
        width: 300px;
        background-color: blanchedalmond;
    }
</style>
<body style="display: flex; gap: 50px;">
    <p class="content" style="columns: 2;">
        If you shed tears when you miss the sun, you also miss the stars. </br> 如果你因失去了太阳而流泪，那么你也将失去群星了。
    </p>
    <p class="content" style="columns: 50px 4;"> <!-- 这里50px并不是真实列宽 -->
        If you shed tears when you miss the sun, you also miss the stars. </br> 如果你因失去了太阳而流泪，那么你也将失去群星了。</br> You smiled and talked to me of nothing and I felt that for this I had been waiting long. </br> 你微微地笑着，不同我说什么话。而我觉得，为了这个，我已等待得久了。
    </p>
    <p class="content" style="columns: 100px 4;"> <!-- 这里期望列宽为100px，但如果列宽为100px，300px等分3列才能分得下，但还得留出列间距，因此只能分为两列。 -->
        If you shed tears when you miss the sun, you also miss the stars. </br> 如果你因失去了太阳而流泪，那么你也将失去群星了。</br> You smiled and talked to me of nothing and I felt that for this I had been waiting long. </br> 你微微地笑着，不同我说什么话。而我觉得，为了这个，我已等待得久了。
    </p>
</body>
```

![image-20230329225411821](./image-css属性/image-20230329225411821.png)

### direction

`direction = ltr | rtl`

属性用于设置文本、表格列和水平溢出的方向。对于从右到左书写的语言（如阿拉伯语），应该将属性设置为`rtl`，对于从左到右书写的语言，则应该将属性设置为`ltr`。

请注意，文本方向通常在文档中定义（如使用HTML的`dir`属性），而不是通过直接使用`direction`属性来定义。

> `dir`是一个指示元素中文本方向的枚举属性，取值如下：
>
> - ltr：从左到右，用于从左到右书写的语言。
> - rtl：从右到左，用于从右到左书写的语言。
> - auto：由用户代理决定方向，它在解析元素中字符时会运用一个基本算法，直到发现一个具有强方向性的字符，然后将这一方向应用于整个元素。

> **全局属性**
>
> 是指所有HTML元素共有的属性，它们可以用于所有元素，即使属性可能对某些元素不起作用。

该属性设置可以设置块级元素文本的基本方向，也可以设置由通过`unicode-bidi`属性创建的嵌入元素的方向。与此同时，它还可以设置文本、块级元素的默认对齐方式，以及表行中的单元格的流动方向。

与HTML的`dir`属性不同，`direction`属性不会从列表继承到表单元格，因为CSS继承遵从文档流，而表单元格位于行内部，但不在列内部。

`direction`和`unicode-bidi`属性是唯二不受`all`简写属性影响的属性。

要使`direction`属性在行级元素上生效，`unicode-bidi`属性的值必须是`embed`或者`override`。

```html
<style>
  body {
    display: flex;
  }
  .container {
    border: 1px solid #c5c5c5;
    width: 300px;
    max-height: 200px;
    margin: 20px;
  }
  .container > div > div {
    background-color: rgba(0, 0, 255, 0.2);
    border: 3px solid #00f;
    margin: 10px;
    flex: 1;
  }
</style>
<body>
  <div class="container" style="direction: ltr">
    <p>direction: ltr</p>
    <div style="display: flex">
      <div>12</div>
      <div>23</div>
      <div>34</div>
      <div>45</div>
    </div>
  </div>
  <div class="container" style="direction: rtl">
    <p>direction: rtl</p>
    <div style="display: flex">
      <div>12</div>
      <div>23</div>
      <div>34</div>
      <div>45</div>
    </div>
  </div>
</body>
```

![image-20230330224047601](./image-css属性/image-20230330224047601.png)

### unicode-bidi

`unicode-bidi = normal | embed | isolate | bidi-override | isolate-override | plaintext`

`unicode-bidi`属性和`direction`属性，决定如何处理文档中的双书写方向文本（bidirectional text）。比如，如果一块内容同时包含有从左到右和从右到左书写的文本，那么用户代理（the user-agent）会使用复杂的Unicode算法来决定如何显示文本。`unicode-bidi`属性会覆盖此算法，允许开发人员控制文本嵌入。

`unicode-bidi`和`direction`属性是仅有的两个不受`all`简写影响的属性。

> 此属性是文档类型定义（Document Type Definition，DTD）的设计者专用的。Web设计者与其他类似的人员不应覆盖此属性。

- normal：对双向算法，此元素不提供额外的嵌入级别。对于内联元素，隐式的重新排序在元素的边界上起作用。
- embed：对于内联元素，该值会为双向算法打开一个额外的嵌入级别。嵌入级别的方向是由`direction`属性给出的。
- bidi-override：对于内联元素，该值会创建一个覆盖；对于块容器元素，该值将为不在另一个块容器元素内的内联级别的后代创建一个覆盖。这意味着在元素内部，根据`direction`属性，重新排序是严格按照顺序排列的；双向算法的隐式部分被忽略。
- isolate：这个关键字表示计算元素容器的方向时，不考虑这个元素的内容。因此，这个元素就从它的兄弟姐妹中分离出来了。当应用它的双向分辨算法的时候，它的容器元素将其视为一个或多个 `U+FFFC Object Replacement Character`，即像 image 一样。
- isolate-override：这个关键字将`override`关键字的隔离行为应用于周围的内容，并将`bidi-override`关键字的覆盖行为应用于内部内容。
- plaintext：这个关键字在计算元素方向的时候，不考虑父元素的双向状态，也不考虑`direction`属性的值。它是使用Unicode双向算法的P2和P3规则计算的。这个值允许按照Unicode双向算法显示已格式化的数据。

```html
<style>
  body {
    display: flex;
  }
  .container {
    border: 1px solid #c5c5c5;
    width: 500px;
    max-height: 200px;
    margin: 20px;
  }
  .container > div > div {
    background-color: rgba(0, 0, 255, 0.2);
    border: 3px solid #00f;
    margin: 10px;
    flex: 1;
  }
  .bidi-override * {
    unicode-bidi: bidi-override;
  }
  .embed {
    unicode-bidi: embed;
  }
</style>
<body>
  <div class="container" style="direction: ltr">
    <p>direction: ltr</p>
    <div style="display: flex">
      <div>12</div>
      <div>23</div>
      <div>34</div>
      <div>45</div>
      <span>内联元素：123</span>
    </div>
  </div>
  <div class="container" style="direction: rtl">
    <p>direction: rtl</p>
    <div style="display: flex">
      <div>12</div>
      <div>23</div>
      <div>34</div>
      <div>45</div>
      <span>内联元素：123</span>
    </div>
  </div>
  <div class="container bidi-override" style="direction: ltr">
    <p>direction: ltr</p>
    <p>unicode-bidi: bidi-override</p>
    <div style="display: flex">
      <div>12</div>
      <div>23</div>
      <div>34</div>
      <div>45</div>
      <span>内联元素：123</span>
    </div>
  </div>
  <div class="container bidi-override" style="direction: rtl">
    <p>direction: rtl</p>
    <p>unicode-bidi: bidi-override</p>
    <div style="display: flex">
      <div>12</div>
      <div>23</div>
      <div>34</div>
      <div>45</div>
      <span>内联元素：123</span>
    </div>
  </div>
  <div class="container embed" style="direction: ltr">
    <p>direction: ltr</p>
    <p>unicode-bidi: embed</p>
    <div style="display: flex">
      <div>12</div>
      <div>23</div>
      <div>34</div>
      <div>45</div>
      <span>内联元素：123</span>
    </div>
  </div>
  <div class="container embed" style="direction: rtl">
    <p>direction: rtl</p>
    <p>unicode-bidi: embed</p>
    <div style="display: flex">
      <div>12</div>
      <div>23</div>
      <div>34</div>
      <div>45</div>
      <span>内联元素：123</span>
    </div>
  </div>
</body>
```

![image-20230330232815291](./image-css属性/image-20230330232815291.png)

### empty-cells

`empty-cells = show | hide`

属性定义了用户端（user agent）应该怎么来渲染表格`<table>`中没有可见内容的单元格的边框和背景。

只有当`border-collapse`属性值是`separate`时，才会生效。

```html
<style>
  body {
    display: flex;
    gap: 20px;
  }
  .table_1 {
    empty-cells: show;
  }
  .table_2 {
    empty-cells: hide;
  }
  .table_3 {
    border-collapse: collapse;
    empty-cells: hide;
  }
  td,
  th {
    border: 1px solid gray;
    padding: 0.5rem;
  }
</style>
<body>
  <table class="table_1">
    <tr>
      <td>Moe</td>
      <td>Larry</td>
    </tr>
    <tr>
      <td>Curly</td>
      <td></td>
    </tr>
  </table>
  <br />
  <table class="table_2">
    <tr>
      <td>Moe</td>
      <td>Larry</td>
    </tr>
    <tr>
      <td>Curly</td>
      <td></td>
    </tr>
  </table>
  <br />
  <table class="table_3">
    <tr>
      <td>Moe</td>
      <td>Larry</td>
    </tr>
    <tr>
      <td>Curly</td>
      <td></td>
    </tr>
  </table>
</body>
```

![image-20230331222339350](./image-css属性/image-20230331222339350.png)

### hanging-punctuation

`hanging-punctuation = none | [ first || [ force-end | allow-end ] || last ]`

属性指定了标点符号应该挂在文本句子的开头还是结尾。悬挂标点符号可能被放在线框外。

- none：无悬挂字符。
- first：元素的第一个格式化行开头的括号或引号挂起。
- last：元素的最后一个格式化行结尾的括号或引号挂起。
- force-end：行结尾处的句号或者逗号挂起。
- allow-end：如果行尾的停止符或逗号在对齐之前不合适，则挂起。

> 支持的浏览器不多，目前只在Safari浏览器支持，且force-end、allow-end似乎没有生效。

```html
<style>
  body {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  p {
    margin: 5px;
  }
  div p:nth-of-type(1) {
    text-align: center;
  }
  div p:nth-of-type(2) {
    width: 15em;
    border: 1px solid #cccccc;
    font-size: 2rem;
    font-style: italic;
  }
  p.right {
    text-align: right;
  }
  p.first {
    hanging-punctuation: first;
  }
  p.last {
    hanging-punctuation: last;
  }
  p.force-end {
    hanging-punctuation: force-end;
  }
  p.allow-end {
    hanging-punctuation: allow-end;
  }
  p.hanging {
    hanging-punctuation: first last;
  }
</style>
<body>
  <div>
    <p>hanging-punctuation: none</p>
    <p>
      «Since the moment we met, you have been my star that never sets day and night.»
    </p>
  </div>
  <div>
    <p>hanging-punctuation: none; text-align: right</p>
    <p class="right">
      «Since the moment we met, you have been my star that never sets day and night.»
    </p>
  </div>
  <div>
    <p>hanging-punctuation: first</p>
    <p class="first">
      «Since the moment we met, you have been my star that never sets day and night.»
    </p>
  </div>
  <div>
    <p>hanging-punctuation: last; text-align: right</p>
    <p class="last right">
      «Since the moment we met, you have been my star that never sets day and night.»
    </p>
  </div>
  <div>
    <p>hanging-punctuation: force-end; text-align: right</p>
    <p class="force-end right">
      «Since the moment we met, you have been my star that never sets day and night.
    </p>
  </div>
  <div>
    <p>hanging-punctuation: allow-end; text-align: right</p>
    <p class="allow-end right">
      «Since the moment we met, you have been my star that never sets day and night.
    </p>
  </div>
  <div>
    <p>hanging-punctuation: first last</p>
    <p class="hanging">
      «Since the moment we met, you have been my star that never sets day and night.»
    </p>
  </div>
  <div>
    <p>hanging-punctuation: first last text-align: right</p>
    <p class="hanging right">
      «Since the moment we met, you have been my star that never sets day and night.»
    </p>
  </div>
</body>
```

![image-20230401231857097](./image-css属性/image-20230401231857097.png)

### hyphenate-character

`hyphenate-character = auto | <string>`

属性设置在断字符中断之前的行末尾使用的连字字符。

根据指定的连字符值显示自动连字符和软连字符。

- auto：用户代理根据内容语言的排版约定选择适当的字符串。这是默认的属性值，只有在覆盖不同的继承值时才需要显式设置。

```html
<style>
  dd {
    width: 90px;
    border: 1px solid black;
    hyphens: auto;
  }
  dd#string {
    -webkit-hyphenate-character: "=";
    hyphenate-character: "=";
  }
</style>

<body>
  <dl>
    <dt><code>hyphenate-character: "="</code></dt>
    <dd id="string" lang="en">Superc&shy;alifragilisticexpialidocious</dd>
    <dt><code>hyphenate-character is not set</code></dt>
    <dd lang="en">Superc&shy;alifragilisticexpialidocious</dd>
  </dl>
</body>
```

![image-20230402160400730](./image-css属性/image-20230402160400730.png)

### hyphenate-limit-chars

`hyphenate-limit-chars = [ auto | <integer> ]{1,3}`

属性指定允许连字符的最小单词长度，以及连字符前后的最小字符数。

此属性提供了对文本中连字符的细粒度控制。这个控制能够避免尴尬的连字符，并为不同的语言设置适当的连字符，这反过来又允许更好的排版。

- x y z：第一个值是单词需要连字符之前的最小单词长度。第二个值是连字符前的最小字符数。第三个值是连字符后的最小字符数。
- x y：第一个值是单词需要连字符之前的最小单词长度。第二个值是连字符前和连字符后的最小字符数。
- x：该值是单词需要连字符之前的最小单词长度。连字符前后的最小字符数将被设置为自动。
- auto：如果设置为`auto`用户代理将为当前布局选择适当的值。除非用户代理可以计算出更好的值，否则将使用以下默认值：
  - 需要连字符的最小单词长度：5
  - 连字符前的最小字符数：2
  - 连字符后的最小字符数：2

```html
<style>
  dd {
    width: 90px;
    border: 1px solid black;
    hyphens: auto;
    hyphenate-limit-chars: 18 11 1;
  }
  dd#string {
    -webkit-hyphenate-character: "=";
    hyphenate-character: "=";
    hyphenate-limit-chars: 18 12 1;
  }
</style>
<body>
  <dl>
    <!-- 当设置连字符前最小字符数为11时，第二行可以刚好显示11个字符 -->
    <dt><code>hyphenate-limit-chars: 18 11 1</code></dt>
    <dd lang="en">Superc&shy;alifragilisticexpialidocious</dd>
    <!-- 当设置连字符前最小字符数为12时，第二行就显示超过了11个字符 -->
    <dt><code>hyphenate-limit-chars: 18 12 1</code></dt>
    <dd id="string" lang="en">Superc&shy;alifragilisticexpialidocious</dd>
  </dl>
</body>
```

![image-20230402164040492](./image-css属性/image-20230402164040492.png)

### hyphens

`hyphens = none | manual | auto`

属性告知浏览器在换行时如何使用连字符连接单词。可以完全阻止使用连字符，也可以控制浏览器什么时候使用，或者让浏览器决定什么时候使用。

连字规则具有语言特性，在HTML中，由语言lang属性决定，浏览器只会在当前属性存在且有合适的连字字典可用的情况下使用连字进行连接。在XML中，必须使用`xml:lang`属性。

> 在规范中，没有明确定义连字符的现实规则，所以具体连字符在不同浏览器中可能有所区别。

- none：即便单词内有建议换行点也不会在那里换行。只会在空白符处换行。
- manual：只有当单词内存在建议换行点时，才会在该位置断开单词并使用连字符换行。
- auto：浏览器可以按照它选择的任何规则，在适当的连字符处自动打断单词。可以参照如下的建议换行点所述，应优先尽可能自动选择断行点。

> **建议换行点**
>
> 有两个Unicode字符可以用于在文本中手动指定可能的换行点：
>
> - U+2010（HYPHEN）：“硬”连字符，表示一个可见的换行点。即使在指定的位置没有真正换行，连字符仍然会显示出来。
> - U+00AD（SHY）：一个不可见的“软”连字符。此连字符不会在屏幕上显示出来，而是表示在必要时浏览器可能会在该位置断开单词并出现连字符。在HTML中，可以使用`&shy;来插入软连字符。

```html
<style>
  dd {
    width: 55px;
    border: 1px solid black;
  }
  dd.none {
    hyphens: none;
  }
  dd.manual {
    hyphens: manual;
  }
  dd.auto {
    hyphens: auto;
  }
</style>
<body>
  <dl>
    <dt><code>none</code>: no hyphen; overflow if needed</dt>
    <dd lang="en" class="none">An extreme&shy;ly long English word</dd>
    <dt>
      <code>manual</code>: hyphen only at &amp;hyphen; or &amp;shy; (if
      needed)
    </dt>
    <dd lang="en" class="manual">An extreme&shy;ly long English word</dd>
    <dt>
      <code>auto</code>: hyphens where the algorithm decides (if needed)
    </dt>
    <dd lang="en" class="auto">An extreme&shy;ly long English word</dd>
  </dl>
</body>
```

![image-20230402170821914](./image-css属性/image-20230402170821914.png)

### initial-letter

`initial-letter = normal | <number [1,∞]> <integer [1,∞]>  | <number [1,∞]> && [ drop | raise ]?`

属性设置首字母下沉、凸起和凹陷的样式。

- normal：没有首字母下沉，文本表现正常。
- `<number>`：定义首字母的大小，这决定首字母所占的行数，不允许使用负值。
- `<integer>`：定义当给出了首字母的大小时，首字母应该下沉的行数。值必须大于零，如果省略，则复制`<number>`的值，向下取最近的正整数。

该属性适用于`::first-letter`和块容器的第一个内联子元素。

> `::first-letter`会选中某个块级元素第一行的第一个字母，并且文字所处的行之前没有其他内容。

```html
<style>
  .normal::first-letter {
    -webkit-initial-letter: normal;
    initial-letter: normal;
  }
  .onefive::first-letter {
    -webkit-initial-letter: 1.5;
    initial-letter: 1.5;
  }
  .three::first-letter {
    -webkit-initial-letter: 3;
    initial-letter: 3;
  }
  .threeone::first-letter {
    -webkit-initial-letter: 3 1;
    initial-letter: 3 1;
  }
  .threetwo::first-letter {
    -webkit-initial-letter: 3 2;
    initial-letter: 3 2;
  }
  .threethree::first-letter {
    -webkit-initial-letter: 3 3;
    initial-letter: 3 3;
  }
  .threefour::first-letter {
    -webkit-initial-letter: 3 4;
    initial-letter: 3 4;
  }
</style>
<body>
  <p class="normal">Initial letter is normal</p>
  <p class="onefive">Initial letter occupies 1.5 lines</p>
  <p class="three">Initial letter occupies 3 lines</p>
  <p class="threeone">Initial letter occupies 3 lines and sinks 1 lines</p>
  <p class="threetwo">Initial letter occupies 3 lines and sinks 2 lines</p>
  <p class="threethree">Initial letter occupies 3 lines and sinks 3 lines</p>
  <p class="threefour">Initial letter occupies 3 lines and sinks 4 lines</p>
</body>
```



![image-20230403225530000](./image-css属性/image-20230403225530000.png)

### inline-size

`inline-size = <'width'>`

属性根据元素的书写模式定义了元素块的水平或者竖直尺寸。根据`writing-mode`的值，此属性对应于`width`或`height`属性。

若书写模式为竖直朝向，则`inline-size`的值对应于元素的高度，否则对应于元素的宽度。与此相关的属性为`block-size`，此属性定义了元素另一方向的尺度。

```html
<style>
  body {
    display: flex;
  }
  p {
    background-color: aqua;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text1 {
    inline-size: 200px;
    writing-mode: horizontal-tb;
  }
  .text2 {
    inline-size: 200px;
    writing-mode: vertical-lr;
  }
  .text3 {
    inline-size: auto;
    writing-mode: horizontal-tb;
  }
  .text4 {
    inline-size: auto;
    writing-mode: vertical-lr;
  }
</style>
<body>
  <!-- 水平方向，宽度200px -->
  <p class="text1">玫瑰到了花期</p>
  <!-- 竖直方向，高度200px -->
  <p class="text2">玫瑰到了花期</p>
  <!-- 水平方向，宽度自适应 -->
  <p class="text3">玫瑰到了花期</p>
  <!-- 竖直方向，高度自适应 -->
  <p class="text4">玫瑰到了花期</p>
</body>
```

![image-20230404214310200](./image-css属性/image-20230404214310200.png)

### letter-spacing

`letter-spacing = normal | <length>`

属性用于设置文本字符的间距表现。在渲染文本时添加到字符之间的自然间距中。`letter-spacing`的正值会导致字符分布得更远，而`letter-sapcing`的负值会使字符更接近。

- normal：此间距是按照当前字体的正常间距确定的。和0不同的是，`normal`会让用户代理调整文字之间空间来对对齐文字。
- `<length>`：指定文字间的间距以代替默认间距。可以是负值，但有可能会出现执行限制。用户代理不会在此基础上进一步增加或缩减来对齐文字。

一个很大的正或负的`letter-spacing`值会将应用这个样式的单词变为不可读的。给文本`letter-spacing`属性应用了一个很大的正值，字母之间的距离会很远，以至于文本中的单词将显示为一系列的单独的、无任何关联的字母。给`letter-sapcing`属性应用了一个很大的负值，字母将会相互重叠到一个点，在这个点上单词可能无法识别了。

最佳的易辨认的字母间距必须根据具体情况来确定，因为不同的字体系列具有不同的字符宽度。没有任何一个值可以确保所有字体系列自动保持它们的可读性。

```	html
<style>
  body {
    display: flex;
    flex-direction: column;
  }
  p {
    background-color: rgb(229, 229, 199);
    padding: 5px;
    align-self: flex-start;
    margin: 5px;
  }
  .normal {
    letter-spacing: normal;
  }
  .em-wide {
    letter-spacing: 0.4em;
  }
  .em-wider {
    letter-spacing: 1em;
  }
  .em-tight {
    letter-spacing: -0.05em;
  }
  .px-wide {
    letter-spacing: 6px;
  }
</style>
<body>
  <p class="normal">这世间，青山灼灼，星光杳杳；秋雨渐渐，晚风慢慢</p>
  <p class="em-wide">这世间，青山灼灼，星光杳杳；秋雨渐渐，晚风慢慢</p>
  <p class="em-wider">这世间，青山灼灼，星光杳杳；秋雨渐渐，晚风慢慢</p>
  <p class="em-tight">这世间，青山灼灼，星光杳杳；秋雨渐渐，晚风慢慢</p>
  <p class="px-wide">这世间，青山灼灼，星光杳杳；秋雨渐渐，晚风慢慢</p>
</body>
```

![image-20230405222658332](./image-css属性/image-20230405222658332.png)

### isolation

```css
isolation = <isolation-mode>

<isolation-mode> = auto | isolate
```

属性定义该元素是否必须创建一个新的层叠上下文。

该属性的主要作用是当和`background-blend-mode`属性一起使用时，可以只混合一个指定元素栈的背景：它允许使一组元素从它们后面的背景中独立出来，只混合这组元素的背景。

- auto：该关键字定义只有在该元素的属性需要的时候才会创建一个新的元素栈环境。
- isolate：该关键字定义一个新的元素栈环境会被创建。

```html
<style>
  .a {
    background-color: rgb(0, 255, 0);
  }
  #b {
    width: 200px;
    height: 210px;
  }
  .c {
    width: 100px;
    height: 100px;
    border: 1px solid black;
    padding: 2px;
    mix-blend-mode: difference;
  }
  #d {
    isolation: auto;
  }
  #e {
    isolation: isolate;
  }
</style>
<body>
  <div id="b" class="a">
    <div id="d">
      <div class="a c">auto</div>
    </div>
    <div id="e">
      <div class="a c">isolate</div>
    </div>
  </div>
</body>
<!-- 
	个人理解如下：
	mix-blend-mode属性描述了元素的内容应该与元素的直系父元素的内容和元素的背景如何混合。
	默认情况下，mix-blend-mode的值为normal：以堆叠元素最顶层的元素为主，即上层覆盖下层，也就是正常元素组合表现出的结果。
	mix-blend-mode为difference的效果是：最终的颜色是两种颜色中较深的颜色减去较浅的颜色的结果。黑色图层没有效果，而白色图层会反转另一层的颜色。
	在这个例子中的表现是，正常情况下，mix-blend-mode为difference时，子元素的背景色会受父元素背景色的影响，最终的颜色并不是子元素设置的颜色，也就是第一行div的表现。
	第二行由于设置了div的isolation为isolate，div拥有了新的元素栈环境，因此不受父元素的背景色影响。
-->
```

![image-20230406214922256](./image-css属性/image-20230406214922256.png)

### mix-blend-mode

```css
mix-blend-mode = <blend-mode> | plus-darker | plus-lighter

<blend-mode> = normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity
```

属性描述了元素的内容应该与元素的直系父元素的内容和元素的背景如何混合。

- normal：最终颜色永远是顶层色，无论底层颜色是什么。其效果类似于两张不透明的纸重叠在一起。
- multiply：最终颜色为顶层颜色与底层颜色相乘的结果。如果叠加黑色层，则最终必定为黑色层，叠加白色层不会造成变化。其效果类似于在透明薄膜上重叠印刷的两个图像。
- screen：最终的颜色是反转顶层颜色和底层颜色，将反转后的两个颜色相乘，再反转相加得到的和的结果。黑色层不会造成变化，白色层导致白色最终层。其效果类似于（被投影仪）投射到投影屏幕上的两个图像。
- overlay：如果底层颜色比顶层颜色深，则最终颜色是`multiply`的结果，如果底层颜色比顶层颜色浅，则最终颜色是`screen`的结果。此混合模式相当于顶层于底层互换后的`hard-light`。
- darken：最终颜色是由每个颜色通道下，顶底两层颜色中最暗值所组成的颜色。
- lighten：最终颜色是每个颜色通道下，顶底两层颜色中的最亮值所阻层的颜色。
- color-dodge：最终颜色是将底部颜色除以顶部颜色的反色的结果。黑色前景不会造成变化。前景如果是背景的反色，会得到白色。此混合模式类似于`screen`，但是，前景只需要和背景的反色一样亮，最终图像就会变为全白。
- color-burn：最终颜色是反转底部颜色，将反转后的值除以顶部颜色，再反转除以后的值得到的结果。白色的前景不会导致变化，前景如果是背景的反色，会得到黑色。此混合模式类似于`multiply`，但是，前景只需要和背景的反色一样暗，最终图像就会变为全黑。
- hard-light：如果顶层颜色比底层颜色深，则最终颜色是`multiply`的结果，如果顶层颜色比底层颜色浅，则最终颜色是`screen`的结果。此混合模式相当于顶层于底层互换后的`overlay`。其效果类似于在背景层上（用前景层）打出一片刺眼的聚光灯。
- soft-light：最终颜色类似于`hard-light`的结果，但更加柔和一些。此混合模式的表现类似于`hard-light`。其效果类似于在背景层上（用前景层）打出一片发散的聚光灯。
- difference：最终的颜色是两种颜色中较深的颜色减去较浅的颜色的结果。黑色图层没有效果，而白色图层会反转另一层的颜色。
- exclusion：最终颜色类似于`difference`，但对比度更低一些。和`difference`相同，黑色层不会造成变化，而白色层会反转另一层的颜色。
- hue：最终颜色由顶部颜色的色调和底部颜色的饱和度与亮度组成。
- saturation：最终颜色由顶部颜色的色调和底部颜色的饱和度与发光度组成。饱和度为零的纯灰色背景层不会造成变化。
- color：最终颜色由顶部颜色的色调与饱和度和底部颜色的亮度组成。此效果保留了灰度级别，可用于为前景着色。
- luminosity：最终颜色由顶部颜色的亮度和底部颜色的色调和饱和度组成。此混合模式相当于顶层与底层互换后的`color`。

```html
<style>
    html,body {
    height: 100%;
    box-sizing: border-box;
    background: #EEE;
    }
    .grid {
    width: 100%;
    display: flex;
    font: 1em monospace;
    }
    .row {
    display: flex;
    flex: 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
    }
    .col {
    display: flex;
    flex: 1 auto;
    flex-direction: column;
    height: auto;
    }
    .cell {
    margin: .5em;
    padding: .5em;
    background-color: #FFF;
    overflow: hidden;
    text-align: center;
    }
    .note {
    background: #fff3d4;
    padding: 1em;
    margin: .5em .5em 0;
    font: .8em sans-serif;
    text-align: left;
    white-space: nowrap;
    }
    .note + .row .cell {
    margin-top: 0;
    }
    .container {
    position: relative;
    background: linear-gradient(to right, #000 0%, transparent 50%, #FFF 100%),
                linear-gradient(to bottom, #FF0 0%, #F0F 50%, #0FF 100%);
    width: 150px;
    height: 150px;
    margin: 0 auto;
    }
    .R {
    transform-origin: center;
    transform: rotate(-30deg);
    fill: url(#red);
    }
    .G {
    transform-origin: center;
    transform: rotate(90deg);
    fill: url(#green);
    }
    .B {
    transform-origin: center;
    transform: rotate(210deg);
    fill: url(#blue);
    }
    .isolate .group { isolation: isolate; }
    .normal .item      { mix-blend-mode: normal; }
    .multiply .item    { mix-blend-mode: multiply; }
    .screen .item      { mix-blend-mode: screen; }
    .overlay .item     { mix-blend-mode: overlay; }
    .darken .item      { mix-blend-mode: darken; }
    .lighten .item     { mix-blend-mode: lighten; }
    .color-dodge .item { mix-blend-mode: color-dodge; }
    .color-burn .item  { mix-blend-mode: color-burn; }
    .hard-light .item  { mix-blend-mode: hard-light; }
    .soft-light .item  { mix-blend-mode: soft-light; }
    .difference .item  { mix-blend-mode: difference; }
    .exclusion .item   { mix-blend-mode: exclusion; }
    .hue .item         { mix-blend-mode: hue; }
    .saturation .item  { mix-blend-mode: saturation; }
    .color .item       { mix-blend-mode: color; }
    .luminosity .item  { mix-blend-mode: luminosity; }
</style>
<body>
    <div class="grid">
        <div class="col">
            <div class="note">Blending in isolation (no blending with the background)</div>
            <div class="row isolate">
            <div class="cell"> normal
                <div class="container normal">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <defs>
                        <linearGradient id="red">
                        <stop offset="0" stop-color="hsl(0,100%,50%)"></stop>
                        <stop offset="100%" stop-color="hsl(0,0%,100%)"></stop>
                        </linearGradient>
                        <linearGradient id="green">
                        <stop offset="0" stop-color="hsl(120,100%,50%)"></stop>
                        <stop offset="100%" stop-color="hsl(120,0%,100%)"></stop>
                        </linearGradient>
                        <linearGradient id="blue">
                        <stop offset="0" stop-color="hsl(240,100%,50%)"></stop>
                        <stop offset="100%" stop-color="hsl(240,0%,100%)"></stop>
                        </linearGradient>
                    </defs>
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> multiply
                <div class="container multiply">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> darken
                <div class="container darken">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> screen
                <div class="container screen">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> lighten
                <div class="container lighten">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> overlay
                <div class="container overlay">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> color-dodge
                <div class="container color-dodge">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> color-burn
                <div class="container color-burn">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> hard-light
                <div class="container hard-light">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> soft-light
                <div class="container soft-light">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> difference
                <div class="container difference">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> exclusion
                <div class="container exclusion">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> hue
                <div class="container hue">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> saturation
                <div class="container saturation">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> color
                <div class="container color">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> luminosity
                <div class="container luminosity">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            </div>

            <div class="note">Blending globally (blend with the background)</div>
            <div class="row">
            <div class="cell"> normal
                <div class="container normal">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> multiply
                <div class="container multiply">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> darken
                <div class="container darken">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> screen
                <div class="container screen">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> lighten
                <div class="container lighten">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> overlay
                <div class="container overlay">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> color-dodge
                <div class="container color-dodge">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> color-burn
                <div class="container color-burn">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> hard-light
                <div class="container hard-light">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> soft-light
                <div class="container soft-light">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> difference
                <div class="container difference">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> exclusion
                <div class="container exclusion">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> hue
                <div class="container hue">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> saturation
                <div class="container saturation">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> color
                <div class="container color">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            <div class="cell"> luminosity
                <div class="container luminosity">
                <div class="group">
                    <div class="item firefox"></div>
                    <svg viewBox="0 0 150 150">
                    <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                    </svg>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</body>
```

![image-20230407231926908](./image-css属性/image-20230407231926908.png)

### object-fit

`object = fill | contain | cover | none | scale-down`

属性指定可替换元素(如：`<img>`或`<video>`)的内容应该如何适应到其使用高度和宽度确定的框。

> 在CSS中，可替换元素的展现效果不是由CSS来控制的。这些元素是一种外部对象，它们外观的渲染，是独立于CSS的。
>
> 简单来说，它们的内容不受当前文档的样式的影响，CSS可以影响可替换元素的位置，但不会影响到可替换元素自身的内容。某些可替换元素，例如`<iframe>`元素，可能具有自己的样式表，但它们不会继承父文档的样式。
>
> CSS能对可替换元素产生的唯一影响在于：部分属性支持控制元素内容在其框中的位置或者定位方式。
>
> 典型的可替换元素有：`<iframe>`、`video`、`embed`、`img`。

- fill：被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。
- contain：被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加黑边。
- cover：被替换的内容在保持宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被裁减以适应内容框。
- none：被替换的内容将保持其原有的尺寸。
- scale-down：内容高的尺寸与`none`或`contain`中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。

```html
<style>
  body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  h2 {
    font-family: Courier New, monospace;
    font-size: 1em;
    margin: 1em 0 0.3em;
  }
  img {
    width: 150px;
    height: 100px;
    border: 1px solid #000;
    margin: 10px 0;
  }
  .narrow {
    width: 100px;
    height: 150px;
  }
  .fill {
    object-fit: fill;
  }
  .contain {
    object-fit: contain;
  }
  .cover {
    object-fit: cover;
  }
  .none {
    object-fit: none;
  }
  .scale-down {
    object-fit: scale-down;
  }
</style>
<body>
  <div>
    <h2>object-fit: fill</h2>
    <img class="fill" src="http://www.eternitywith.xyz/image/38.jpg" />

    <img class="fill narrow" src="http://www.eternitywith.xyz/image/38.jpg" />
  </div>
  <div>
    <h2>object-fit: contain</h2>
    <img class="contain" src="http://www.eternitywith.xyz/image/38.jpg" />

    <img
      class="contain narrow"
      src="http://www.eternitywith.xyz/image/38.jpg"
    />
  </div>

  <div>
    <h2>object-fit: cover</h2>
    <img class="cover" src="http://www.eternitywith.xyz/image/38.jpg" />

    <img
      class="cover narrow"
      src="http://www.eternitywith.xyz/image/38.jpg"
    />
  </div>

  <div>
    <h2>object-fit: none</h2>
    <img class="none" src="http://www.eternitywith.xyz/image/38.jpg" />

    <img class="none narrow" src="http://www.eternitywith.xyz/image/38.jpg" />
  </div>

  <div>
    <h2>object-fit: scale-down</h2>
    <img class="scale-down" src="http://www.eternitywith.xyz/image/38.jpg" />

    <img
      class="scale-down narrow"
      src="http://www.eternitywith.xyz/image/38.jpg"
    />
  </div>
</body>
```



![image-20230408220201258](./image-css属性/image-20230408220201258.png)

### object-position

```css
object-position = <position>  

<position> = [ left | center | right ] || [ top | center | bottom ]  | [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]?  | [ [ left | right ] <length-percentage> ] && [ [ top | bottom ] <length-percentage> ]  

<length-percentage> = <length> | <percentage>  
```

属性规定了可替换元素的内容在其内容框中的位置。可替换元素的内容框未被对象所覆盖的部分，则会显示该元素的背景。

使用 1 到 4 个值来定义该元素在它所处的二维平面中的定位。可以使用相对或绝对偏移。这些定位方式允许被替换元素的对象被定位到内容框外部。

```html
<style>
  body {
    display: flex;
  }
  .output {
    background-color: var(--background-primary);
    height: 300px;
    overflow: hidden;
    padding: 1em;
    position: relative;
  }
  .output section {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
    text-align: center;
  }
  img {
    height: 250px;
    width: 250px;
    object-fit: none;
    border: 1px solid red;
    flex-grow: 0;
  }
</style>
<body>
  <div>
    <div class="output">
      <section>
        <img
          src="https://interactive-examples.mdn.mozilla.net/media/examples/moon.jpg"
          class="transition-all"
          style="object-position: right top"
        />
      </section>
    </div>
  </div>
  <div>
    <div class="output">
      <section>
        <img
          src="https://interactive-examples.mdn.mozilla.net/media/examples/moon.jpg"
          class="transition-all"
          style="object-position: 50% 50%"
        />
      </section>
    </div>
  </div>
  <div>
    <div class="output">
      <section>
        <img
          src="https://interactive-examples.mdn.mozilla.net/media/examples/moon.jpg"
          class="transition-all"
          style="object-position: left bottom"
        />
      </section>
    </div>
  </div>
  <div>
    <div class="output">
      <section>
        <img
          src="https://interactive-examples.mdn.mozilla.net/media/examples/moon.jpg"
          class="transition-all"
          style="object-position: 100px 100px"
        />
      </section>
    </div>
  </div>
</body>
```

![image-20230409232442527](./image-css属性/image-20230409232442527.png)

### orphans

`orphans = <integer [0,∞]>`

属性设置块容器中必须显示在页、区域或者列底部的最小行数。

当一个块级元素的文本被分割成多个页面时，`orphans`属性可以指定在最后一页中应该保留行。使用`orphans`属性可以确保最后一页不包含太少的文本，从而提高页面布局的美观性和可读性。

需要注意的是，这个属性只在分页时起作用，如果段落不会被分页显示，那么设置orphans也没有任何效果。

```html
<style>
  div {
    width: 630px;
    background-color: #8cffa0;
    height: 150px;
    columns: 3;
  }
  p {
    background-color: #8ca0ff;
  }
  p:first-child {
    margin-top: 0;
  }
</style>
<body>
  <div style="orphans: 2;">
    <p>This is the first paragraph containing some text.</p>
    <p>
      This is the second paragraph containing some more text than the first
      one. It is used to demonstrate how orphans work.
    </p>
    <p>
      This is the third paragraph. It has a little bit more text than the
      first one.
    </p>
  </div>
  <div style="orphans: 3;">
    <p>This is the first paragraph containing some text.</p>
    <p>
      This is the second paragraph containing some more text than the first
      one. It is used to demonstrate how orphans work.
    </p>
    <p>
      This is the third paragraph. It has a little bit more text than the
      first one.
    </p>
  </div>
</body>
```

![image-20230410230753909](./image-css属性/image-20230410230753909.png)
