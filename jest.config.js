module.exports = {
    setupFiles: ["dotenv/config"],
    testEnvironment: "node",
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/docs/",
        "/errors/",
        "/.docker/",
        "/coverage/",
    ],
    verbose: true,
    bail: true,
    collectCoverage: true,
};
