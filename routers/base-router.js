let baseService = require('../services/base-service');
let userService = require('../services/user-service');

let router = require('express').Router();

//not protected API
router.route('/api/login').post(userService.loginUser);
router.route('/api/users').post(userService.addUser);



router.route('/api/*')
    .all(userService.verifyAuthToken);

router.route('/api/appointments/')
    .post(baseService.addAppointment)
    .put(baseService.updateAppointment)
    .get(baseService.getAppointments);

router.route('/api/sellers/')
    .get(baseService.getSellers);

router.route('/api/timeSlots/')
    .post(baseService.addTimeSlot)
    .delete(baseService.removeTimeSlot)
    .get(baseService.getTimeSlots);
module.exports = router;
