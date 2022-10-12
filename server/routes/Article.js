const express = require('express');
const router = express.Router();
const Article = require('../models/ArticlesModel');
const { adminProtected } = require('../middleware/adminProtected');

router.get('/', adminProtected, async (req, res) => {
  let query = Article.find();
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'));
  }
  try {
    const articles = await query.exec();
    res.status(200).json(articles);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

router.post('/new', async (req, res) => {
  const { title, markdown, tags } = req.body;

  if (!title || !markdown || !tags) {
    res.status(400).json({
      message: 'Please fill all the fields',
    });
  }

  try {
    const article = new Article({
      title: title,
      markdown: markdown,
      tags: tags,
    });
    await article.save();
    res.status(200).json(article);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const articleId = req.params.id;

  if (!articleId) {
    res.status(400).json({
      message: 'No Id was handled',
    });
  }

  const article = await Article.findById(articleId);
  try {
    if (article) {
      await article.remove();
      res.status(200).json({
        article,
        message: `Succesfully deleted article ${articleId}`,
      });
    } else {
      res.status(400).json({
        message: `Article ${articleId} was not found`,
      });
    }
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

router.put('/edit/:id', async (req, res) => {
  const { title, markdown, tags } = req.body;
  const articleId = req.params.id;

  if (!title || !markdown || !tags || !articleId) {
    res.status(400).json({
      message: 'Please fill all the fields',
    });
  }

  try {
    const article = await Article.findById(articleId);
    if (article) {
      article.title = title;
      article.markdown = markdown;
      article.tags = tags;
      await article.save();
      res.status(200).json(article);
    } else {
      res.status(400).json({
        message: `Article ${articleId} was not found`,
      });
    }
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

module.exports = router;
