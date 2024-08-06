import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { AuthService } from 'src/auth/auth.service';
@Module({
  controllers: [MovieController],
  providers: [MovieService, AuthService],
  exports: [MovieService],
})
export class MovieModule {}
