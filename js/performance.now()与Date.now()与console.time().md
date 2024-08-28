#### performance.now():

- 这个函数返回一个时间戳，表示自页面加载以来的毫秒数，精度可以达到微秒级别。
- 它不受系统时间变化的影响，即使系统时间被修改，performance.now() 的值也不会改变。
- 主要用于测量性能，因为它可以提供非常精确的时间间隔。
- 是浏览器(Web API)提供的方法，不同浏览器获取到的精度不同。Date.now是Javascript内置方法，差异主要在于浏览器遵循的ECMAScript规范。
- 返回的值，跟打开网页的时间有关。
- Date.now() ≈ performance.timing.navigationStart + performance.now() 

#### Date.now():

- 这个函数返回自1970年1月1日（UTC时间）以来的毫秒数，也就是常说的Unix时间戳。
- 精度太低，小于1ms的测试不出来结果，它的精度通常为毫秒级别。
- 它受系统时间的影响，如果系统时间被修改，Date.now() 的值也会相应改变。

#### console.time

- 精度比较高（单位小于毫秒）。
- 连续两行 `console.time('耗时')` 和 console.timeEnd('耗时')，它也能计算时间差。
- 在控制台显示结果，本身没有返回值。