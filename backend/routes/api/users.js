const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

//Sign up
    //Validate Signup
const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required')
        .isLength({ min: 2, max: 30 })
        .withMessage('First Name must have between 2 and 30 characters'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required')
        .isLength({ min: 2, max: 30 })
        .withMessage('Last Name must have between 2 and 30 characters'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Username is required')
        .isLength({ min: 2, max: 15 })
        .withMessage('Username must have between 2 and 15 characters')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .isLength({ min: 4, max: 30 })
        .withMessage('Email must have between 4 and 30 characters'),
    check('companyName')
        .exists({ checkFalsy: true })
        .withMessage('Company Name is required')
        .isLength({ min: 2, max: 30 })
        .withMessage('Company Name must have between 2 and 30 characters'),
    check('industrySector')
        .exists({ checkFalsy: true })
        .withMessage('Industry Sector is required')
        .isLength({ min: 2, max: 30 })
        .withMessage('Industry Sector must have between 2 and 30 characters'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required')
        .isLength({ min: 7, max: 80 })
        .withMessage('Password must have between 7 and 80 characters'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async(req, res) => {
    const { firstName, lastName, username, companyName, industrySector, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, username, companyName, industrySector, email, hashedPassword });

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        companyName: user.companyName,
        industrySector: user.industrySector,
        email: user.email
    };

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser });
});


module.exports = router;


// Current User -SEE SESSION.JS-
// router.get('/current', requireAuth, async (req, res) => {
//     const userId = req.user.id;
//     const user = await User.findByPk(userId);
  
//     if (!user) return res.status(404).json({ message: 'User not found' });
  
//     return res.json(user);
//   });
