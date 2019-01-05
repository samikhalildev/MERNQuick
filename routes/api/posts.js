const express = require('express');
const router = express.Router();

/*  @route      GET api/posts/
    @desc       gets post data
    @access     Public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: "Posts api route works"
    });
});

module.exports = router;
