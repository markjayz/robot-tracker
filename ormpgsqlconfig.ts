import { Robot } from "src/robots/entities/robot.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const psqlconfig : PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'markjaysonlomboy',
    password: 'root',
    database: 'robot_tracker',
    entities: [Robot],
    synchronize: true,
}

export default psqlconfig;