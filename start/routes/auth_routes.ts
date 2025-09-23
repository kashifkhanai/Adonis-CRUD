import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
import { middleware } from '#start/kernel'

// Public routes (No authentication)
router.post('/register', [AuthController, 'register']).prefix('/auth')
router.post('/login', [AuthController, 'login']).prefix('/auth')

router
  .group(() => {
    router.post('/logout', [AuthController, 'logout'])
  })
  .prefix('/auth')
  .middleware([middleware.auth()])
