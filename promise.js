setTimeout( () =>{
  console.log('A')
}, 4)

new Promise((resolve,reject) =>{
  console.log('B')
 
    console.log('C')
 
   reject()
}).then(
    console.log('success')
)
new Promise((resolve, reject) => {
  reject(7);
  console.log(2);
}).then(r => {
  console.log(r);
}).catch(r => {
  console.log(r,22)
});
 // 底部状态更新
 Promise.all([getConcernCount(), getNoteCount()]).then(rs => {
  let dataCount = rs[0].result
  let dataNote = rs[1].result
  const compiledFooter = require('./components/footer/footer.pug')
  const htmlFooter = compiledFooter({
    dataCount,
    dataNote
  })
  document.getElementById('footer').innerHTML = htmlFooter
  if (param.from) {
    addClass($('.icon-user').nextSibling, 'now')
    addClass($('.icon-user'), 'now')
    addClass($('.icon-user'), 'icon-user-fill')
  } else {
    addClass($('.icon-home'), 'now')
    addClass($('.icon-home').nextSibling, 'now')
    addClass($('.icon-home'), 'icon-home-fill')
  }
})


(async () => {
  const param = getUrlParam()
  const data = await getNoteDetail({id: param.id})
  questionInfo(data)
  wechatShare()

  // 渲染回答列表
  getNoteAnswer({id: param.id}).then(rs => {
    comments(rs.result)
  })})()