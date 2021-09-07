import experss from 'express'

import controllers from '../controllers/contact'
import extractJWT from '../middleware/extractJWT';

const router = experss.Router();

router.post('/post/contacts', extractJWT, controllers.createContacts)
router.get('/get/contacts', controllers.getAllContacts);
router.get('/get/contacts/name', controllers.sortedDataByName);
router.get('/get/contacts/address', controllers.sortedDataByAddress);
router.get('/get/contacts/:id', controllers.getContactById);
router.delete('/get/contacts/:id', controllers.deleteContact);
router.patch('/get/contacts/:id', controllers.updateContactData);

export = router;