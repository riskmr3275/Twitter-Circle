const { makeRequest } = require('../utils/Request');
const { validationResult } = require('express-validator');

// Middleware to validate input
const validateRequest = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errors.array();
    }
    return null;
};

// Fetch user data by username
exports.getDetailByUsername = async (req, res) => {
    const errors = validateRequest(req);
    if (errors) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    const { username } = req.body;
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid or missing username.'
        });
    }

    const url = `/users/by/username/${username}`;
    try {
        const data = await makeRequest(url);
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Fetch user tweets
exports.getUserTweets = async (req, res) => {
    const errors = validateRequest(req);
    if (errors) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    const { userId } = req.body;
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid or missing userId.'
        });
    }

    const url = `/users/${userId}/tweets`;
    try {
        const data = await makeRequest(url, { max_results: 10 });
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Fetch liked tweets
exports.getLikedTweets = async (req, res) => {
    const errors = validateRequest(req);
    if (errors) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    const { userId } = req.body;
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid or missing userId.'
        });
    }

    const url = `/users/${userId}/liked_tweets`;
    try {
        const data = await makeRequest(url, { max_results: 10 });
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Fetch mentions of the user
exports.getUserMentions = async (req, res) => {
    const errors = validateRequest(req);
    if (errors) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    const { userId } = req.body;
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid or missing userId.'
        });
    }

    const url = `/users/${userId}/mentions`;
    try {
        const data = await makeRequest(url, { max_results: 10 });
        res.status(200).json({
            success: true,
            data: data.data
        });
    } catch (error) {

        res.status(error?.message.status||403).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Fetch users who retweeted a specific tweet
exports.getRetweetedBy = async (req, res) => {
    const errors = validateRequest(req);
    if (errors) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    const { tweetId } = req.body;
    if (!tweetId || typeof tweetId !== 'string' || tweetId.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid or missing tweetId.'
        });
    }

    const url = `/tweets/${tweetId}/retweeted_by`;
    try {
        const data = await makeRequest(url);
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};



// Fetch list of followers
exports.getFollowers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
      });
  }

  const { userId } = req.body;
console.log(userId);

  // Validate userId
  if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
      return res.status(400).json({
          success: false,
          message: 'Invalid or missing userId.',
      });
  }

  const url = `/users/${userId}/followers`;

  try {
      // Make API request to fetch followers
      const data = await makeRequest(url, { max_results: 50 }); // Adjust `max_results` as per API limits
      res.status(200).json({
          success: true,
          data: data,
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          error: error.message,
      });
  }
};