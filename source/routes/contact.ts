import experss from 'express'

import controllers from '../controllers/contact'
import extractJWT from '../middleware/extractJWT';

const router = experss.Router();

router.post('/post/contacts', extractJWT, controllers.createContacts)
router.get('/get/contacts', controllers.getAllContacts);


export = router;