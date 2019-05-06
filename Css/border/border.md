 - 当没有制定border-color的时候，会使用color作为边框色
 - 增加复选框区域大小
 ![](https://www.imooc.com/note/755?sort=last&page=1) 

 - 三角形

 ```css
  .triangle {
      width: 0; height : 0;
      border: 100px solid;
      border-color: red transpant transpant orange;
  }

 ````

- 梯形

```css
.tixing{
    width:100px;height:100px;
    border:100px solid:
    border-color:red green blue orange;
}
```

- backgroun 定位的局限 ： background定位的局限只能相对于左上角数值定位，不能相对右下

- border-style： border-style : solid(实线) | dashed(虚线) | dotted(点线) | double(双实线) | inset(内凹) | outset(外凸) | groove(沟槽) | ridge(山脊)