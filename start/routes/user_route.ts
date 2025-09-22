import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#controllers/users_controller')
const AdminController = () => import('#controllers/adminstrations_controller')

router
  .group(() => {
    router.post('/newAdmin', [AdminController, 'create'])
    router.get('/listing', [UsersController, 'allUser'])
    router.get('/:id', [UsersController, 'show'])
    router.post('/', [UsersController, 'create'])
    router.patch('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'delete'])
  })
  .prefix('admin')
  .middleware([middleware.auth(), middleware.admin()])
