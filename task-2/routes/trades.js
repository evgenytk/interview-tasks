const express = require('express');
const router = express.Router();
const Trades = require('../models/trades');
const {
  getValidationError,
  validate,
  isLowerCase,
  isEnum,
  parseInteger,
  isInteger,
  minNumber,
  isRequired,
  minString,
  maxString,
  maxNumber, isUpperCase,
} = require("../utils/validation");
const {isString} = require("mocha/lib/utils");


router.get('/', async function(req, res, next) {
  const errors = getValidationError(req.query, {
    type: validate(
      isLowerCase,
      // isEnum(['buy', 'sell'])
      isString,
    ),
    user_id: validate(
      parseInteger,
      isInteger,
      minNumber(1),
    ),
  });

  if(Object.values(errors).length) {
    return res.status(400).json({errors});
  }

  try {
    const { type, user_id } = req.query;
    const trades = await Trades.findAll({
      where: {
        ...(type ? { type } : {}),
        ...(user_id ? { user_id: parseInteger(user_id) } : {})
      },
    });
    res.status(200).json(trades);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:trade_id', async function(req, res, next) {
  const errors = getValidationError(req.params, {
    trade_id: validate(
      parseInteger,
      isInteger,
      minNumber(1),
    )
  });

  if(Object.values(errors).length) {
    return res.status(400).json({errors});
  }

  try {
    const trade = await Trades.findOne({
      where: {
        id: parseInteger(req.params.trade_id),
      }
    });

    if(!trade) {
      return res.status(404).send('ID not found');
    }

    return res.status(200).json(trade);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async function(req, res, next) {
  const errors = getValidationError(req.body, {
    type: validate(
      isRequired,
      isLowerCase,
      isEnum(['buy', 'sell'])
    ),
    user_id: validate(
      isRequired,
      isInteger,
      minNumber(1),
    ),
    symbol: validate(
      isRequired,
      isUpperCase,
      minString(2),
      maxString(3),
    ),
    shares: validate(
      isRequired,
      isInteger,
      minNumber(1),
      maxNumber(100),
    ),
    price: validate(
      isRequired,
      isInteger,
      minNumber(0),
    ),
    timestamp: validate(
      isRequired,
      isInteger,
      minNumber(0),
    ),
  });

  if(Object.values(errors).length) {
    return res.status(400).json({errors});
  }

  try {
    const trade = await Trades.create(req.body);

    res.status(201).json(trade);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:trade_id', function(req, res, next) {
  return res.sendStatus(405);
});

router.patch('/:trade_id', function(req, res, next) {
  return res.sendStatus(405);
});

router.delete('/:trade_id', function(req, res, next) {
  return res.sendStatus(405);
});

module.exports = router;
