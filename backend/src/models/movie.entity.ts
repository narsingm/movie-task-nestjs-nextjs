import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({ timestamps: false, tableName: 'movies' })
export class Movie extends Model<Movie> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  id: bigint;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  publishingYear: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false })
  userId: bigint;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.DATE })
  created_at?: Date;

  @Column({ type: DataType.DATE })
  updated_at?: Date;
}
