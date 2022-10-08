# 笔记
yarn install: 把workspace下的所有包生成软链接放到node_modules里面。

### 编译过程
- 先将模板进行分析，生成对应的ast树
- 做转化流程，转化成transform，用来对动态节点做一些标记：指令、插槽、事件、属性...  (patchFlag)
- 代码生成 codegen(生成最终代码)

#### Block的概念
- diff算法的特点是递归遍历，全量对比的话效率比较低。
- block的作用就是为了收集动态节点，生成一个数组，将全量diff虚拟节点树变为只diff动态节点。
- 在createVNode的时候，会判断这个节点是否是动态的，如果是，就会让外层的block收集起来，父节点也会收集子节点的block，因而也会形成block树，因此最终diff只需diff block-tree。
- 会影响dom结构的都会被标记成block节点，如：v-if、v-else、v-for
- 即使被标记成block的节点，也有不同的处理逻辑(使用patchFlag标识)，比如v-if和v-for：
    - v-if标记的block会被标识key，前后对比时如果key不同可以被直接替换
    - 而v-for标记的block由于v-for中内容的不确定，更新时需要走全量diff，因此无需使用key标识，也无需收集子节点的动态节点。

#### patchFlag
对不同的动态节点进行描述，表示要对比哪些类型。

#### 性能优化
- 对静态节点进行提取，如果有大量的相同静态节点，还会进行createVNode的合并操作。
- 事件缓存，减少重新创建事件的消耗。

### Vue2 和 Vue3对比
- 响应式原理 definedProperty -> proxy
- diff算法  Vue2几乎是全量diff -> Vue3 可以根据patchFlag做diff
- option Api -> composition Api
- 单一根节点 -> Fragment支持多根节点
- flow -> ts
- 支持自定义渲染器，createRender()传入自己的渲染方法，可以根据runtime-core来实现不同平台的代码
- 支持monorepo
- 模板编译优化
