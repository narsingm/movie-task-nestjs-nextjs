import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import globalMsg from 'src/common/globalMsg';
import { handleSequelizeError } from 'src/helpers/commonPagination';
import { Movie } from 'src/models/movie.entity';

@Injectable()
export class MovieService {
  constructor() {}

  /**
   * Controller function to handle add movie.
   * @param req Request object containing movie data in body
   * @param res Response object to send back HTTP responses
   */
  async create(movieData, tokenData) {
    try {
      let createdMovie = null;
      const newMovie = await Movie.create({
        ...movieData,
        userId: tokenData?.result?.id,
        created_at: new Date(),
        updated_at: new Date(),
      });
      createdMovie = newMovie;
      const movie = { ...createdMovie.toJSON() };
      return {
        statusCode: HttpStatus.OK,
        message: globalMsg.MOVIE_ADDED_MESSAGE,
        data: movie,
      };
    } catch (error) {
      handleSequelizeError(error);
    }
  }

  /**
   * Controller function to handle get all movie.
   * @param req Request object containing query params
   * @param res Response object to send back HTTP responses
   */

  async getAll(paginationDto) {
    try {
      const { page = 1, limit = 10 } = paginationDto;
      const offset = (page - 1) * limit;
      const order: any = [['created_at', 'desc']];

      const rows = await Movie.findAll({
        offset,
        limit: +limit,
        order,
      });

      const totalCount = await Movie.count();
      const totalPages = Math.ceil(totalCount / limit);

      return {
        statusCode: HttpStatus.OK,
        message: 'Movies retrieved successfully',
        data: {
          list: rows,
          totalPages,
          currentPage: +page,
        },
      };
    } catch (error) {
      handleSequelizeError(error);
    }
  }

  /**
   * Controller function to handle update movie.
   * @param req Request object containing movie data in body
   * @param res Response object to send back HTTP responses
   */
  async update(id, updateDto) {
    try {
      // Find the movie by id
      const existingMovie = await Movie.findByPk(id);

      // If the movie doesn't exist, throw an error
      if (!existingMovie) {
        throw new NotFoundException(globalMsg.MOVIE_NOT_FOUND);
      }
      const movie = await existingMovie.update(updateDto);
      return {
        statusCode: HttpStatus.OK,
        message: globalMsg.MOVIE_UPDATED_MESSAGE,
        data: movie,
      };
    } catch (error) {
      handleSequelizeError(error);
    }
  }

  /**
   * Controller function to handle delete movie.
   * @param req Request object containing id in params
   * @param res Response object to send back HTTP responses
   */
  async delete(id) {
    try {
      // Find the movie by id
      const existingMovie = await Movie.findByPk(id);

      // If the movie doesn't exist, throw an error
      if (!existingMovie) {
        throw new NotFoundException(globalMsg.MOVIE_NOT_FOUND);
      }

      await existingMovie.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: globalMsg.MOVIE_DELETED_MESSAGE,
      };
    } catch (error) {
      handleSequelizeError(error);
    }
  }

  /**
   * Controller function to handle get movie.
   * @param req Request object containing id in params
   * @param res Response object to send back HTTP responses
   */
  async movieDetails(id) {
    try {
      // Find the movie by id
      const movie = await Movie.findByPk(id);

      // If the movie doesn't exist, throw an error
      if (!movie) {
        throw new NotFoundException(globalMsg.MOVIE_NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: globalMsg.SUCCESS,
        data: movie,
      };
    } catch (error) {
      handleSequelizeError(error);
    }
  }
}
