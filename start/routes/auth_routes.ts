import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
import { middleware } from '#start/kernel'

// Public routes (No authentication)
router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

router
  .group(() => {
    router.post('/logout', [AuthController, 'logout'])
  })
  .middleware([middleware.auth()])
