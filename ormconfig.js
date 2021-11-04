
const parser = require('pg-connection-string').parse

if(process.env.NODE_ENV === 'development'){
    module.exports =  {
        name: "default",
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port:  process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: false,
        migrationsRun: true,
        entities: [
            "dist/modules/**/*.entity.js"
        ],
            migrations: [
            "dist/shared/database/migrations/*.js"
        ],
        cli : {
            entitiesDir: "src/modules/**/entities",
            migrationsDir: "src/shared/database/migrations",
            
        }
    
    }
}

if(process.env.NODE_ENV === 'production'){

    
    const config = parser(process.env.DATABASE_URL)


    module.exports =  {
        name: "default",
        type: "postgres",
        host: config.host,
        port:  config.port,
        username: config.user,
        password: config.password,
        database: config.database,
        synchronize: false,
        migrationsRun: true,
        ssl:true,
        entities: [
            "dist/modules/**/*.entity.js"
        ],
            migrations: [
            "dist/shared/database/migrations/*.js"
        ],
        cli : {
            entitiesDir: "src/modules/**/entities",
            migrationsDir: "src/shared/database/migrations",
            
        }
    
    }
}





    
   


