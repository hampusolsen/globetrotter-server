const { SchemaTypes, model } = require("mongoose");
const bcrypt = require("bcrypt");
const extendBaseSchema = require("./Base.schema");
const { AUTH_PROVIDERS } = require("../config");
const {
    EncryptionError,
    InvalidProviderError,
    EntityValidationError,
} = require("../errors");
const { LOCAL } = require("../config/constants");
const { BCRYPT_SALT_ROUNDS } = require("../config/security");

const UserSchema = extendBaseSchema({
    username: {
        type: String,
        required: true,
        index: true,
    },
    security: {
        id: { type: String, index: true, required: true },
        provider: { type: String, required: true },
        email: { type: String, required: true },
        password: String,
    },
    profile_pic: String,
    description: String,
    travels: [SchemaTypes.ObjectId],
    followers: [SchemaTypes.ObjectId],
    following: [SchemaTypes.ObjectId],
});

UserSchema.pre("validate", function validateSecurityProperties(next) {
    const { provider, email, password, id } = this.security;

    switch (provider) {
    case LOCAL:
        if (!email || !password) return next(EntityValidationError());

        // fall through
    case !LOCAL:
        if (!id) return next(EntityValidationError());

        // fall through
    default:
        if (!AUTH_PROVIDERS.includes(provider)) {
            return next(InvalidProviderError(provider));
        }

        return next();
    }
});

UserSchema.pre("save", async function hashPassword(next) {
    if (this.password) {
        try {
            this.password = await bcrypt.hash(
                this.password,
                BCRYPT_SALT_ROUNDS
            );
        } catch (error) {
            return next(EncryptionError(error.message));
        }
    }
    return next();
});

UserSchema.methods.authenticate = async function validatePassword(password) {
    const authenticated = await bcrypt.compare(password, this.password);
    return authenticated;
};

module.exports = model("User", UserSchema);
