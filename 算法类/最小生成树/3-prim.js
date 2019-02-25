// 最小索引堆 
// 好处：可以提供最小值，又有更新操作
// data和indexes数组都是从1开始的
// 真正拿来shiftUp,shiftDown的是indexes数组

function IndexMinHeap(){
  this.data = [];
  this.indexes = [];// 索引数组里的元素为‘节点’在this.data里的位置
  this.count = 0;
}

IndexMinHeap.prototype.swap = function(arr, i, j){
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

IndexMinHeap.prototype.size = function(){
  return this.count;
};

IndexMinHeap.prototype.isEmpty = function(){
  return this.count === 0;
};

IndexMinHeap.prototype.shiftUp = function(k){
  if(this.count > 0){
      while(k > 1 && this.data[this.indexes[k]] < this.data[this.indexes[Math.floor(k / 2)]]){
          this.swap(this.indexes, k, Math.floor(k / 2));
          k = Math.floor(k / 2);
      }
  }
};

IndexMinHeap.prototype.shiftDown = function(k){
  if(this.count > 0){
      while(2 * k <= this.count){
          var j = 2 * k
          if(j + 1 <= this.count && this.data[this.indexes[j + 1]] < this.data[this.indexes[j]]){
              j += 1;
          }
          if(this.data[this.indexes[k]] <= this.data[this.indexes[j]]){
              break;
          }
          this.swap(this.indexes, k, j);
          k = j;
      }
  }
};

//i+1 为item在data里面的索引
IndexMinHeap.prototype.insert = function(i, item){
  i += 1;
  this.data[i] = item;
  this.indexes[this.count + 1] = i;
  this.count++;
  this.shiftUp(this.count);
};

IndexMinHeap.prototype.extractMin = function(){
  if(this.count > 0){
      var res = this.data[this.indexes[1]];
      this.swap(this.indexes, 1, this.count);
      this.count--;
      this.shiftDown(1);
      return res;
  }
};

IndexMinHeap.prototype.extractMinIndex = function(){
  if(this.count > 0){
      var res = this.indexes[1] - 1;
      this.swap(this.indexes, 1, this.count);
      this.count--;
      this.shiftDown(1);
      return res;
  }
};

IndexMinHeap.prototype.getItem = function(i){
  return this.data[i + 1];
};

IndexMinHeap.prototype.change = function(i, item){
  i += 1;
  this.data[i] = item;
  for(var j = 0; j < this.count; j++){
      if(this.indexes[j] === i){
          this.shiftDown(j);
          this.shiftUp(j);
          return;
      }
  }
};

// 改善后的Prim算法 O(Elogv)
// 改变的是visit和mst这两个方法 


//引入最小索引堆
var H = new IndexMinHeap()

// 有权的稀疏图-邻接表
//边类
function Edge(a, b, w){
    this.a = a;
    this.b = b;
    this.weight = w;
}

Edge.prototype.other = function(a){
    if(a === this.a || a === this.b){
        return a === this.a ? this.b : this.a;
    }
};

Edge.prototype.v = function(){
    return this.a;
}

Edge.prototype.w = function(){
    return this.b;
};

function SparseGraph(n, directed){
    this.vertices = n;
    this.directed = directed;
    this.edges = 0;
    this.h = new H(); // 最小索引堆, 算法辅助数据结构。存的是相邻横切边最小的权值
    this.edgeTo = []; // 访问的点所对应的边, 算法辅助数据结构。改数组索引对应某个结点，存的是和结点相邻的最小横切边
    this.marked = []; // 标记数组, 在算法运行过程中标记节点i是否被访问 
    this.adj = [];
    for(var i = 0; i < this.vertices; i++){
        this.adj[i] = [];
        this.marked[i] = false;
    }
}

SparseGraph.prototype.getVertices = function(){
    return this.vertices;
};
SparseGraph.prototype.getEdges = function(){
    return this.edges;
};
SparseGraph.prototype.addEdge = function(v, m, w){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        this.adj[v].push(new Edge(v, m, w));
        if(v !== m && !this.directed){ //防止自环边再push一次
            this.adj[m].push(new Edge(m, v, w));
        }
        this.edges++;
    }
};
SparseGraph.prototype.hasEdge = function(v, m){
    if(v >= 0 && v < this.vertices && m >= 0 && m < this.vertices){
        for(var i = 0; i < this.adj[v].length; i++){
            if(this.adj[v][i].other(v) === m){
                return true;
            }
        }
        return false;
    }
};
SparseGraph.prototype.iterator = function(v){
    if(v >= 0 && v < this.vertices){
        return this.adj[v];
    }
};

SparseGraph.prototype.visit = function(v){
    if(v >= 0 && v < this.vertices){
        this.marked[v] = true;  //标记为"红色"节点
        var arr = this.iterator(v); //拿到v的所有邻边
        for(var i = 0, len = arr.length; i < len; i++){
            var e = arr[i];
            var w = e.other(v);
            // 如果边的另一端点未被访问，说明是横切边
            if(!this.marked[w]){
                // 如果从没有考虑过这个端点, 直接将这个端点和与之相连接的边加入索引堆
                if(!this.edgeTo[w]){
                    this.edgeTo[w] = e;
                    this.h.insert(w, e.weight);
                // 如果曾经考虑这个端点, 但现在的边比之前考虑的边更短, 则进行替换
                }else if(e.weight < this.edgeTo[w].weight){
                    this.edgeTo[w] = e;
                    this.h.change(w, e.weight);
                }
            }
        }
    }
};


SparseGraph.prototype.mst = function(){
    if(this.vertices >= 0){
        var res = [];
        this.visit(0); //执行后，会将与0相关的所有横切边都insert进最小堆中
        while(!this.h.isEmpty()){
            var v = this.h.extractMinIndex();    //得到最小权值的横切边的索引，索引=节点
            res.push(this.edgeTo[v]);
            this.visit(v);
        }
        return res;
    }
};


SparseGraph.prototype.show = function(){
    for(var i = 0; i < this.vertices; i++){
        console.log(this.adj[i]);
    }
};

var str = `
4 5 0.35
4 7 0.37
5 7 0.28
0 7 0.16
1 5 0.32
0 4 0.38
2 3 0.17
1 7 0.19
0 2 0.26
1 2 0.36
1 3 0.29
2 7 0.34
6 2 0.40
3 6 0.52
6 0 0.58
6 4 0.93
`;

var arr = str.split('\n');

var g = new SparseGraph(8, false);

for(var i = 1; i < arr.length; i++){
    var v = arr[i].split(' ');
    g.addEdge(parseInt(v[0]), parseInt(v[1]), parseFloat(v[2]));
}
console.log(g.mst());