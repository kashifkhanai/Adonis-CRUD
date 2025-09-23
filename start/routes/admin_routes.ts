import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#controllers/users_controller')
const AdminController = () => import('#controllers/adminstrations_controller')

router
  .group(() => {
    router.post('/new_admin', [AdminController, 'create'])
    router.get('/', [UsersController, 'allUser'])
    router.post('/', [UsersController, 'create'])
    router.get('/:id', [UsersController, 'show'])
    router.patch('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'delete'])
  })
  .prefix('admin')
  .middleware([middleware.auth(), middleware.admin()])
