import { TypeOrmModule } from "@nestjs/typeorm";
import { Rocco } from "src/rocco/entity/rocco.entity";
import { User } from "src/User/entity/user.entity";
const database = TypeOrmModule.forRoot({
    type:"sqlite",
    database:"dev.sqlite",
    entities:[User,Rocco],
    synchronize:true
})

export default database