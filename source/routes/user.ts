import experss from 'express'

// import controllers from '../controllers/contact'

import userController from '../controllers/user'
import extractJWT from '../middleware/extractJWT';

const router = experss.Router();

// router.post('/post/contacts', controllers.createContacts)
router.get('/validate', extractJWT, userController.validateToken);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/get/all', extractJWT, userController.getAllUser);


export = router;