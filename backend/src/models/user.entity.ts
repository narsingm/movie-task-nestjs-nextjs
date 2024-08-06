import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'users' })
export class User extends Model<User> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  id: bigint;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.DATE })
  created_at?: Date;

  @Column({ type: DataType.DATE })
  updated_at?: Date;
}
