import express from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import PostController from './app/controllers/PostController'
import authMiddleware from './app/middlewares/authentication'

const routes = express.Router()

routes.post('/users', UserController.store)
routes.post('/auth', SessionController.store)

routes.use(authMiddleware)

routes.put('/users', UserController.update)
routes.delete('/users', UserController.delete)
routes.post('/posts', PostController.store)
routes.get('/posts', PostController.index)
routes.get('/:user_id/posts', PostController.indexAll)
routes.get('/posts/:post_id', PostController.show)
routes.delete('/posts/:post_id', PostController.delete)
routes.put('/posts/:post_id', PostController.update)

export default routes
