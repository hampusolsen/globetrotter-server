const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const config = require("../config");
const { EntityNotFoundError } = require("../errors");
const User = require("../models/User.model");
const { GOOGLE, FACEBOOK } = require("../config/constants");

passport.use(
    new GoogleStrategy(
        {
            callbackURL: `${config.BASE_URI}/security/${GOOGLE}/redirect`,
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
        },
        async (_accessToken, _refreshToken, profile, done) => {
            console.log("config/passport.js:18", profile);
            try {
                let user = await User.findOne({ "security.id": profile.id });
                if (user) return done(null, user);

                user = User.create({
                    username: profile.displayName,
                    security: {
                        provider: GOOGLE,
                        id: profile.id,
                        email: profile.email,
                    },
                    profile_pic: profile.photos[0].value,
                });

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            callbackURL: `${config.BASE_URI}/security/${FACEBOOK}/redirect`,
            clientID: config.FACEBOOK_CLIENT_ID,
            clientSecret: config.FACEBOOK_CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
            // @todo callback
        }
    )
);

passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password) => {
        // @todo callback
    })
);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (userId, done) => {
    const user = await User.findById(userId);
    if (!user) return done(EntityNotFoundError(), null);

    return done(null, user);
});

module.exports = passport;
