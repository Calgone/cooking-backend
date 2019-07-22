import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'vps415096.ovh.net',
    port: 5432,
    username: 'postgres',
    password: '8\\=Y$|#TG{-7r58r', // attention deux backslash nécessaires ici !!!
    database: 'cuisine',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
