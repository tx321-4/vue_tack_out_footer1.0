var express =  require('express');

const app = express() //请求server
var appData = require('./data.json')//加载本地数据文件
var seller = appData.seller //获取对应的本地数据
var goods = appData.goods
var ratings = appData.ratings
var apiRoutes = express.Router()

var port = 9527;

app.get('/api/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  }) //接口返回json数据， 上面配置的数据seller就赋值给data请求后调用
}),
app.get('/api/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  }) //接口返回json数据， 上面配置的数据goods就赋值给data请求后调用
}),
app.get('/api/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  }) //接口返回json数据， 上面配置的数据ratings就赋值给data请求后调用
})

app.use('/api', apiRoutes);

module.exports = app.listen(port, function (err) {
  if(err) {
    console.log(err);
    return ;
  }
  console.log('Listening at http://localhost:' + port + '\n');
})