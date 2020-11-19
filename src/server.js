import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
//router
const router=express.Router()

app.disable('x-powered-by')

//middlewares
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

//router
router.get('/me', (req, res) => {
    res.send({me:'hello'});
})
app.route('/me2')
  .get(function (req, res) {
    res.send('Get a random book')
  }) 
  .post(function (req, res) {
    res.send('Add a book')
  })
  //works like update
  .put(function (req, res) {
    res.send('Update the book')
  })

//router middlware
app.use('/me',router)

const log = (req, res, next) => {
  console.log('logging')
  next()
}


//CRUD: create,read,update,delete
//log will be executed for first
app.get('/data',log, (req, res,next) => {
  res.send({ data: [1] })
  next()
})


app.get('/data', (req, res,next) => {
    res.send({ data: [2] })
    next()
});
app.put('data', (req, res) => {
    
});
app.delete('path', (req, res) => {
    
});
app.post('/data', (req, res) => {
  /* console.log(req.body) */
  res.send({ok:true})
})

const port = 3000
export const start = () => {
  app.listen(port, () => {
    console.log(`server is on port ${port}`)
  })
}
