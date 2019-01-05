const express = require('express');
const router = express.Router();


/*  @route      GET api/profile/
    @desc       gets profile data
    @access     Public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: "Profile api route works"
    });
});

module.exports = router;
