import { SEQUELIZE } from '../common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/models/user.entity';
import { Movie } from 'src/models/movie.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        dialect: 'mysql',
        models: [User, Movie],
      });

      try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

      await sequelize.sync(); // Optional: Sync models with the database

      return sequelize;
    },
    inject: [ConfigService],
  },
];
