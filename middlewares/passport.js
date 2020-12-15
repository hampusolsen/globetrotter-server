const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const config = require("../config");
const User = require("../models/User.model");
const { GOOGLE, FACEBOOK } = require("../config/constants");
const { DatabaseErrors, SecurityErrors } = require("../errors");

function createPassportController(provider) {
    return async function(_accessToken, _refreshToken, profile, done) {
        try {
            const existingUser = await User.findOne({ "security.id": profile.id });
            if (existingUser) return done(null, existingUser);

            const newUser = await User.create({
                details: {
                    displayName: profile.displayName,
                },
                security: {
                    provider,
                    id: profile.id,
                    email: profile._json.email,
                },
            });

            return done(null, newUser);
        } catch (error) {
            return done(error, null);
        }
    };
}

passport.use("google",
    new GoogleStrategy(
        {
            callbackURL: `${config.BASE_URI}/api/security/${GOOGLE}/redirect`,
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
        },
        createPassportController(GOOGLE)
    )
);

passport.use("facebook",
    new FacebookStrategy(
        {
            callbackURL: `${config.BASE_URI}/api/security/${FACEBOOK}/redirect`,
            clientID: config.FACEBOOK_CLIENT_ID,
            clientSecret: config.FACEBOOK_CLIENT_SECRET,
        },
        createPassportController(FACEBOOK)
    )
);

passport.use("local.authenticate",
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await User.findOne({"security.email": email});
            if (!user) throw DatabaseErrors.EntityNotFoundError();

            const passwordIsCorrect = await user.authenticate(password);
            if (passwordIsCorrect) return done(null, user);

            throw SecurityErrors.AuthenticationError();
        } catch (error) {
            return done(error);
        }
    })
);

passport.use("local.register",
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const emailIsTaken = await User.findOne({ "security.email": email });
            if (emailIsTaken) throw DatabaseErrors.UniqueFlagViolationError();

            const newUser = new User({
                details: {
                    displayName: email.split("@")[0],
                },
                security: {
                    provider: "local",
                    email,
                    password
                }
            });

            const user = await newUser.save();

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (userId, done) => {
    const user = await User.findById(userId).populate("travels");
    if (!user) return done(DatabaseErrors.EntityNotFoundError(), null);

    return done(null, user);
});

module.exports = passport;
