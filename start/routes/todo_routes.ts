import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const TodoController = () => import('#controllers/todos_controller')

// Protected routes (require authentication)
router
  .group(() => {
    // Todo routes
    router.get('/', [TodoController, 'index'])
    router.post('/', [TodoController, 'store'])
    router.get('/:id', [TodoController, 'show'])
    router.put('/:id', [TodoController, 'update'])
    router.delete('/:id', [TodoController, 'destroy'])
    router.get('/:id/user', [TodoController, 'showUser'])
    router.get('/users-todos/:id', [TodoController, 'showUserWithTodos'])
  })
  .prefix('todos')
  .middleware([middleware.auth()])
