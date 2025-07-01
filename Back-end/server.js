const express = require('express')
const App = express()
const expressLayouts = require('express-ejs-layouts')
const index = require('./router/index') 
const cors = require('cors');
const { default: mongoose } = require('mongoose');
App.use(express.json({ limit: '10mb' }));
App.use(express.urlencoded({ extended: true, limit: '10mb' }));
App.use(cors());
App.set('view engine','ejs')
App.set('views',__dirname+'/views')
App.set('layout','layouts/layout')
App.use(expressLayouts)
App.use(express.static('public'))

const mongoose_url = 'mongodb+srv://jmcportal123:jmcportal123@cluster0.rui8jjk.mongodb.net/'
mongoose.connect(mongoose_url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log("connected sucessfully..."))
.catch((err)=>console.log("Failed to connect:",err))

const db = mongoose.connection;
db.on('error',(error) =>console.log("Database Connection error :",error))

App.use('/',index)
App.listen(process.env.PORT || 3001)
