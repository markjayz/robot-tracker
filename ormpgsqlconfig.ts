import { User } from "src/auth/entities/user.entity";
import { Robot } from "src/robot/entities/robot.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const psqlconfig : PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'markjaysonlomboy',
    password: 'root',
    database: 'robot_tracker',
    entities: [Robot, User],
    synchronize: true,
}

export default psqlconfig;