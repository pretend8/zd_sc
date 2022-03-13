// pm2 配置文件
// ecosystem.config.js
module.exports = {
    apps: [{
        // 生产环境
        name: 'prod-implant',
        // 项目启动入口文件
        script: './src/main.js',
        // 项目环境变量
        env: {
            'NODE_ENV': 'production',
            'PORT': 39100,
            'MYSQL_HOST': '127.0.0.1',
            'MYSQL_PORT': 3306,
            'MYSQL_USER': 'root',
            'MYSQL_PWD': '07cb028072ad9574',
            'MYSQL_DB': 'zdsc',
            'JWT_SECRET': 'ZZX',
        },
    }, {
        // 测试环境
        name: 'test-implant',
        script: './src/main.js',
        env: {
            'NODE_ENV': 'test',
            'PORT': 39100,
            'MYSQL_HOST': '1.15.249.210',
            'MYSQL_PORT': 3306,
            'MYSQL_USER': 'root',
            'MYSQL_PWD': '07cb028072ad9574',
            'MYSQL_DB': 'zdsc',
            'JWT_SECRET': 'ZZX',
        },
    }, {
        // 预发布环境
            name: 'release-implant',
            script: './src/main.js',
            env: {
                'NODE_ENV': 'release',
                'PORT': 39100,
                'MYSQL_HOST': '1.15.249.210',
                'MYSQL_PORT': 3306,
                'MYSQL_USER': 'root',
                'MYSQL_PWD': '07cb028072ad9574',
                'MYSQL_DB': 'zdsc',
                'JWT_SECRET': 'ZZX',
            },
        },
    ],
};