const express=require('express')
const { createUser,updateUser,deleteUser,getallusers,getOneusers } = require('./controller/controller')
const routes=express.Router()

routes.get('/allusers',getallusers)
routes.post('/oneusers/:id',getOneusers)
routes.post('/',createUser)
routes.put('/:id',updateUser)
routes.delete('/:id',deleteUser)

module.exports={routes}