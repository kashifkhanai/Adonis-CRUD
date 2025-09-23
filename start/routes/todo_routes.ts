import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const TodoController = () => import('#controllers/todos_controller')

// Protected routes (require authentication)
router
  .group(() => {
    // Todo routes
    router.get('/', [TodoController, 'index'])
    router.post('/', [TodoController, 'store'])
    router.get('/user', [TodoController, 'showUser'])
    router.get('/users-todos', [TodoController, 'showUserWithTodos'])
    router.get('/:id', [TodoController, 'show'])
    router.put('/:id', [TodoController, 'update'])
    router.delete('/:id', [TodoController, 'destroy'])
  })
  .prefix('todos')
  .middleware([middleware.auth()])
