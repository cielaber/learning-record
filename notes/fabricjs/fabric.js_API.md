# fabric.js-API

## Classes

### Polyon-多边形

#### [cornerStyle :String](http://fabricjs.com/docs/fabric.Polygon.html#cornerStyle)

指定控件样式，“rect”或“circle”

##### Type:

- String



#### [cornerColor :String](http://fabricjs.com/docs/fabric.Polygon.html#cornerColor)

对象的控制角的颜色（当它处于活动状态时）

##### Type:

- String



#### [strokeUniform :Boolean](http://fabricjs.com/docs/fabric.Polygon.html#strokeUniform)

如果为“ false”，则stroke宽度将与对象成比例。设为true时，stroke将始终与为stroke宽度输入的确切像素大小匹配。默认为假

##### Type:

- Boolean



#### [getCenterPoint() → {](http://fabricjs.com/docs/fabric.Polygon.html#getCenterPoint)[fabric.Point](http://fabricjs.com/docs/fabric.Point.html)}

返回对象的实际中心坐标

##### Returns:

- Type

  [fabric.Point](http://fabricjs.com/docs/fabric.Point.html)



#### [getBoundingRect(absoluteopt, calculateopt) → {Object}](http://fabricjs.com/docs/fabric.Polygon.html#getBoundingRect)

返回对象的边界矩形（左、上、宽、高）的坐标。框与画布的轴对齐。

| Name        | Type    | Attributes | Description                                                  |
| :---------- | :------ | :--------- | :----------------------------------------------------------- |
| `absolute`  | Boolean | <optional> | use coordinates without viewportTransform（使用不带viewportTransform的坐标） |
| `calculate` | Boolean | <optional> | use coordinates of current position instead of .oCoords / .aCoords（使用当前位置的坐标，而不是.oCoords.aCoords） |

##### Returns:

Object with left, top, width, height properties

- Type

  Object





### Canvas

#### [getActiveObjects() → {](http://fabricjs.com/docs/fabric.Canvas.html#getActiveObjects)[fabric.Object](http://fabricjs.com/docs/fabric.Object.html)}

返回当前所选对象的数组



#### [getActiveObject() → {](http://fabricjs.com/docs/fabric.Canvas.html#getActiveObject)[fabric.Object](http://fabricjs.com/docs/fabric.Object.html)}

返回当前活动对象



#### [getObjects(typeopt) → {Array}](http://fabricjs.com/docs/fabric.Canvas.html#getObjects)

返回此实例类型参数的子对象数组，该对象在1.3.10中引入，因为2.3.5以来，此方法始终返回该数组的COPY；否则，返回该数组的COPY值。



#### [setActiveObject(object, eopt) → {](http://fabricjs.com/docs/fabric.Canvas.html#setActiveObject)[fabric.Canvas](http://fabricjs.com/docs/fabric.Canvas.html)}

将给定对象设置为画布上唯一的活动对象

| Name     | Type                                                         | Attributes | Description                                        |
| :------- | :----------------------------------------------------------- | :--------- | :------------------------------------------------- |
| `object` | [fabric.Object](http://fabricjs.com/docs/fabric.Object.html) |            | Object to set as an active one                     |
| `e`      | Event                                                        | <optional> | Event (passed along when firing "object:selected") |



#### [getZoom() → {Number}](http://fabricjs.com/docs/fabric.Canvas.html#getZoom)

返回画布缩放级别

##### Returns:

- Type

  Number



#### [zoomToPoint(point, value) → {](http://fabricjs.com/docs/fabric.Canvas.html#zoomToPoint)[fabric.Canvas](http://fabricjs.com/docs/fabric.Canvas.html)}

设置此画布实例的缩放级别，缩放以点为中心，这意味着跟随缩放到具有相同点的点将具有从该点开始的缩放的视觉效果。要点不会动。它与视口的画布中心或视觉中心无关。

##### Parameters:

| Name    | Type                                                       | Description                           |
| :------ | :--------------------------------------------------------- | :------------------------------------ |
| `point` | [fabric.Point](http://fabricjs.com/docs/fabric.Point.html) | to zoom with respect to               |
| `value` | Number                                                     | to set zoom to, less than 1 zooms out |

##### Returns:

instance

- Type

  [fabric.Canvas](http://fabricjs.com/docs/fabric.Canvas.html)





### Object

#### [calcTransformMatrix(skipGroupopt) → {Array}](http://fabricjs.com/docs/fabric.Object.html#calcTransformMatrix)

根据对象的属性计算表示当前变换的变换矩阵。

| Name        | Type    | Attributes | Description                                                  |
| :---------- | :------ | :--------- | :----------------------------------------------------------- |
| `skipGroup` | Boolean | <optional> | return transform matrix for object not counting parent transformations There are some situation in which this is useful to avoid the fake rotation. |

##### Returns:

对象的变换矩阵

- Type

  Array



#### [hasBorders :Boolean](http://fabricjs.com/docs/fabric.Object.html#hasBorders)

设置为“ false”时，不呈现对象的控制边界

##### Type:

- Boolean



#### [hasControls :Boolean](http://fabricjs.com/docs/fabric.Object.html#hasControls)

设置为false时，不显示对象的控件，并且不能用于操作对象

##### Type:

- Boolean









## Namespaces

### utils

#### [(static) multiplyTransformMatrices(a, b, is2x2) → {Array}](http://fabricjs.com/docs/fabric.util.html#.multiplyTransformMatrices)

用矩阵A乘矩阵B来嵌套变换

| Name    | Type    | Description                               |
| :------ | :------ | :---------------------------------------- |
| `a`     | Array   | First transformMatrix                     |
| `b`     | Array   | Second transformMatrix                    |
| `is2x2` | Boolean | flag to multiply matrices as 2x2 matrices |

##### Returns:

两个变换矩阵的乘积

- Type

  Array



#### [(static) transformPoint(p, t, ignoreOffsetopt) → {](http://fabricjs.com/docs/fabric.util.html#.transformPoint)[fabric.Point](http://fabricjs.com/docs/fabric.Point.html)}

将变换t应用于点p

| Name           | Type                                                       | Attributes | Description                                     |
| :------------- | :--------------------------------------------------------- | :--------- | :---------------------------------------------- |
| `p`            | [fabric.Point](http://fabricjs.com/docs/fabric.Point.html) |            | The point to transform                          |
| `t`            | Array                                                      |            | The transform                                   |
| `ignoreOffset` | Boolean                                                    | <optional> | Indicates that the offset should not be applied |

##### Returns:

变换点

- Type

  [fabric.Point](http://fabricjs.com/docs/fabric.Point.html)