const express=require('express')
const { createUser,updateUser,deleteUser,getallusers } = require('./controller/controller')
const routes=express.Router()

routes.post('/',createUser)
routes.post('/allusers',getallusers)
routes.post('/:id',updateUser)
routes.post('/:id',deleteUser)

module.exports={routes}