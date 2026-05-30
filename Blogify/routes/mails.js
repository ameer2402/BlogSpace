const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Route for submitting feedback (now saves to MongoDB instead of emailing)
router.post('/submit-feedback', async (req, res) => {
  const { rating, feedback } = req.body;

  if (!rating || !feedback) {
    return res.status(400).send("Rating and feedback are required.");
  }

  try {
    // Save feedback directly to database
    await Feedback.create({
      rating: Number(rating),
      message: feedback,
      createdBy: req.user ? req.user._id : null
    });
    
    // Redirect to the success/thanks page
    res.status(200).redirect("/mail/submit-feedback");
  } catch (error) {
    console.error('Error saving feedback to database:', error);
    res.status(500).send("Failed to save feedback.");
  }
});

// GET route for the Thanks page
router.get("/submit-feedback", (req, res) => {
   res.render("thanks");
});

module.exports = router;
