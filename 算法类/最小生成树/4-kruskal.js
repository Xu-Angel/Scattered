// 实现一个针对Edge对象的优先队列

function Queue(){
  this.data = [];
  this.count = 0;
}

//出队
Queue.prototype.dequeue = function(){
  if(this.count > 0){
      var entry = 0;
      for(var i = 0, len = this.data.length; i < len; i++){
          if(this.data[i].weight < this.data[entry].weight){
              entry = i;
          }
      }
      this.count--;
      // this.splice返回的是被数组元素组成的数组，所以这里要加[0]
      return this.data.splice(entry, 1)[0];
  }
};

//入队
Queue.prototype.enqueue = function(edgeObj){
  this.data.push(edgeObj);
  this.count++;
};

Queue.prototype.isEmpty = function(){
  return this.count === 0;
};

// Quick Union + rank + path compression

function UF(n){
  this.parent = [];
  this.rank = [];
  this.count = n;
  for(var i = 0; i < n; i++){
      this.parent[i] = i;
      this.rank[i] = 1;
  }
}

UF.prototype.find = function(v){
  if(v >= 0 && v < this.count){
      while(v !== this.parent[v]){
          this.parent[v] = this.parent[this.parent[v]];
          v = this.parent[v];
      }
      return v;
  }
};

UF.prototype.union = function(v, m){
  var vRoot = this.find(v),
      mRoot = this.find(m);
  if(vRoot === mRoot){
      return;
  }
  if(this.rank[vRoot] < this.rank[mRoot]){
      this.parent[vRoot] = mRoot;
  }else if(this.rank[vRoot] > this.rank[mRoot]){
      this.parent[mRoot] = vRoot;
  }else{
      this.parent[vRoot] = mRoot;
      this.rank[vRoot] += 1;
  }
};

UF.prototype.isConnected = function(v, m){
  return this.find(v) === this.find(m);
};

// var  n = 10000,
//     uf = new UF(n),
//     start = Date.now();
// for(var i = 0; i < n; i++){
//     var a = Math.floor(Math.random() * n);
//     var b = Math.floor(Math.random() * n);
//     uf.union(a, b);
// }

// for(var i = 0; i < n; i++){
//     var a = Math.floor(Math.random() * n);
//     var b = Math.floor(Math.random() * n);
//     uf.isConnected(a, b);
// }
// var end = Date.now();

// console.log(end - start);



// Kruskal算法(思路超级简单的算法)  ---- O（ElogE）
// 将所有边按权值大小进行排序
// 每次都取出未标记的最小边，并标记。
// 看该最小边在图中与其他已标记的边是否形成环
// 如果形成环，则不是最小生成树的一条边。

// 图可能存在多个最小生成树

// 判断环：每次将某边A加入最小生成树时将该边的两端点进行union操作
// 下次要加入最小生成树的边B，只需在相应的并查集中查找该B边的两个端点的根节点
// 是否相同。如果相同，说明已经会形成环

//引入最小索引堆(优先队列)
var Q =  new Queue()
//引入并查集
var UF = new UF()

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

//图类
function SparseGraph(n, directed){
    this.vertices = n;
    this.directed = directed;
    this.edges = 0;
    this.q = new Q();
    this.uf = new UF(n); //传入n个节点个数对并查集进行初始化
    this.adj = [];
    for(var i = 0; i < this.vertices; i++){
        this.adj[i] = [];
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

SparseGraph.prototype.mst = function(){
    if(this.edges > 0){
        var res = [];
        for(var i = 0, len = this.adj.length; i < len; i++){
            for(var j = 0; j < this.adj[i].length; j++){
                var e = this.adj[i][j];
                if(e.v() < e.w()){ //排除重复的边
                    this.q.enqueue(e);
                }
            }
        }
        while(!this.q.isEmpty()){
            var e = this.q.dequeue(); //拿到最小权值的边
            if(this.uf.isConnected(e.v(), e.w())){ //如果边的两端点的根节点是相同的，说明形成环
                continue;
            } 
            res.push(e);
            this.uf.union(e.v(), e.w());
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