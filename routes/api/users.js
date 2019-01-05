const express = require('express');
const router = express.Router();


/*  @route      GET api/users/
    @desc       gets user data
    @access     Public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: "Users api route works"
    });
});

module.exports = router;
