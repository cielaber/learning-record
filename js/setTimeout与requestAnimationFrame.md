#### setTimeout

- 依赖js事件循环机制，时间不准确。
- 调用频率与系统帧率和帧数无关，会导致不同设备的屏幕刷新率可能会卡顿掉帧。
- 当页面被隐藏，setTimeout可能仍在后台执行任务。

#### requestAnimationFrame

- 按帧调用，调用频率与帧率有关。
- 当页面处于未激活的状态下，该页面的屏幕刷新任务会被系统暂停，requestAnimationFrame不会调用。