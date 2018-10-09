// 在真正返回response之前使用
let book = {
  name: "JAVASCRIPT高级程序设计",
  number: 2,
  id:1
}
axios.interceptors.response.use(function(response){
  let {config:{method,url,data}} = response
  if(url === '/books/1' && method === 'get'){
    response.data = book
  }else if(url === '/books/1' && method === 'put'){
    Object.assign(book,data)
    response.data = book
  }
  return response
})
// 上面是假的后台
axios.get('/books/1')
  .then(({data})=>{
    let originalHtml = $('#app').html()
    let newHtml = originalHtml.replace('__name__',data.name)
      .replace('__number__',data.number)
    $('#app').html(newHtml)
  }
)

$('#app').on('click','#addOne',function(){
  var oldNumber = $('#number').text() //string
  var newNumber = oldNumber - 0 + 1
  axios.put('/books/1',{
    number:newNumber
  }).then(()=>{
    $('#number').text(newNumber)
  })
})

$('#app').on('click','#minusOne',function(){
  var oldNumber = $('#number').text() //string
  var newNumber = oldNumber - 0 - 1
  axios.put('/books/1',{
    number:newNumber
  }).then(()=>{
    $('#number').text(newNumber)
  })
})

$('#app').on('click','#reset',function(){
  axios.put('/books/1',{
    number:0
  }).then(()=>{
    $('#number').text(0)
  })
})