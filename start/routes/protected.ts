import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AuthController = () => import('#controllers/auth_controller')
const TodoController = () => import('#controllers/todos_controller')

// Protected routes (require authentication)
router
  .group(() => {
    // Auth routes
    router.post('/logout', [AuthController, 'logout'])
    // Todo routes
    router.get('/todos', [TodoController, 'index'])
    router.post('/todos', [TodoController, 'store'])
    router.get('/todos/:id', [TodoController, 'show'])
    router.put('/todos/:id', [TodoController, 'update'])
    router.delete('/todos/:id', [TodoController, 'destroy'])
    router.get('/todos/:id/user', [TodoController, 'showUser'])
    router.get('/users/:id/todos', [TodoController, 'showUserWithTodos'])
  })
  .middleware([middleware.auth()])
