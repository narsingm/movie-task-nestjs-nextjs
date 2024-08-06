import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Param,
  Request,
  Put,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/jwt-auth.guard';
import {
  CommonPaginationDto,
  CreateMovieDto,
  UpdateMovieDto,
} from './dto/movie.dto';

@ApiBearerAuth('Authorization')
@ApiTags('Movie')
@UseGuards(AuthGuard)
@Controller('api/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('')
  create(@Request() req, @Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto, req.user);
  }

  @Get('all')
  getAllMovies(@Query() paginationDto: CommonPaginationDto) {
    return this.movieService.getAll(paginationDto);
  }

  @Get('/:id')
  movieDetails(@Param('id') id: number) {
    return this.movieService.movieDetails(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.movieService.delete(id);
  }
}
