const { SchemaTypes, model } = require("mongoose");
const bcrypt = require("bcrypt");
const extendBaseSchema = require("./Base.schema");
const { AUTH_PROVIDERS } = require("../config");
const { LOCAL } = require("../config/constants");
const { BCRYPT_SALT_ROUNDS } = require("../config/security");
const { DatabaseErrors, SecurityErrors } = require("../errors");

const UserSchema = extendBaseSchema({
    details: {
        displayName: { type: String, required: true },
        profilePic: String,
        description: String,
    },
    security: {
        id: { type: String, index: true },
        provider: { type: String, required: true },
        email: { type: String, required: true, index: true },
        password: String,
    },
    travels: [{ type: SchemaTypes.ObjectId, ref: "Travel" }],
    followers: [{ type: SchemaTypes.ObjectId, ref: "User" }],
    following: [{ type: SchemaTypes.ObjectId, ref: "User" }],
});

UserSchema.pre("validate", function validateSecurityProperties(next) {
    const { provider, email, password, id } = this.security;

    switch (provider) {
    case LOCAL:
        if (!email || !password) return next(DatabaseErrors.EntityValidationError());
        break;

    case !LOCAL:
        if (!id) return next(DatabaseErrors.EntityValidationError());
        break;
    }

    if (!AUTH_PROVIDERS.includes(provider)) {
        return next(SecurityErrors.InvalidProviderError(provider));
    }

    return next();
});

UserSchema.pre("save", async function hashPassword(next) {
    if (!this.isModified("security.password")) return next();

    if (this.security.password) {
        try {
            this.security.password = await bcrypt.hash(
                this.security.password,
                BCRYPT_SALT_ROUNDS
            );
        } catch (error) {
            return next(SecurityErrors.EncryptionError(error.message));
        }
    }

    return next();
});

UserSchema.methods.authenticate = async function validatePassword(password) {
    const authenticated = await bcrypt.compare(password, this.security.password);
    return authenticated;
};

module.exports = model("User", UserSchema);
