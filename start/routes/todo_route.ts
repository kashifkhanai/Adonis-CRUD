// start/routes/todo_route.ts
import router from '@adonisjs/core/services/router'
const TodoController = () => import('#controllers/todos_controller')

// Todos CRUD routes
router
  .group(() => {
    router.get('/', [TodoController, 'index']) // GET /todos?page=1&limit=10
    router.post('/', [TodoController, 'store']) // POST /todos
    router.get('/:id', [TodoController, 'show']) // GET /todos/:id
    router.put('/:id', [TodoController, 'update']) // PUT /todos/:id
    router.delete('/:id', [TodoController, 'destroy']) // DELETE /todos/:id
    router.get('/:id/user', [TodoController, 'showUser']) // GET /todos/:id/user
    router.get('/user/:id', [TodoController, 'showUserWithTodos']) // GET /users/:id/todos
  })
  .prefix('/api/todos')
