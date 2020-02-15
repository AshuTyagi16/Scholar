module.exports = {
    apps: [{
        name: 'scholar',
        script: 'app.js',
        kill_timeout: 5000,
        listen_timeout: 30000,

        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        args: 'one two',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development',
            DB: 'mongodb://localhost/scholar',
            DB_USER: "rwuser",
            DB_PASS: "rwuser",
            PORT: 5000
        },
        env_production: {
            NODE_ENV: 'production',
            DB: 'mongodb://localhost/scholar',
            DB_USER: "rwuser",
            DB_PASS: "rwuser",
            PORT: 5000
        }
    }],
};
