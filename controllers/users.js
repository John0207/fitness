const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to fitness');
            res.redirect('/classes');
        })    
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }    
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectURL = req.session.returnTo || '/classes';
    delete req.session.returnTo;
    res.redirect(redirectURL);
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', "Succesfully logged out");
    res.redirect('/classes');
}

