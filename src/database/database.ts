import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/User/entity/user.entity";
const database = TypeOrmModule.forRoot({
    type:"sqlite",
    database:"dev.sqlite",
    entities:[User],
    synchronize:true
})

export default database