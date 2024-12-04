const express = require("express")
const router = express.Router()

const {getDetailByUsername, getUserTweets, getLikedTweets, getUserMentions,getRetweetedBy,getFollowers} = require("../controllers/Sample")  

  
 

router.get("/getDetailByUsername",getDetailByUsername)
router.get("/getUserTweets",getUserTweets)
router.get("/getLikedTweets",getLikedTweets)
router.get("/getUserMentions",getUserMentions)
router.get("/getRetweetedBy",getRetweetedBy)
router.get("/getFollowers",getFollowers)


module.exports = router