import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface IUser {
  id?: number
  name: string
  username: string
  email: string
  password: string
  accountType: 'personal' | 'business'
  createdAt?: Date
}

//interface UserCreationAttributes extends Optional<IUser, 'id' | 'createdAt'> {}

export class User extends Model<IUser> implements IUser {
  public id!: number
  public name!: string
  public username!: string
  public email!: string
  public password!: string
  public accountType!: 'personal' | 'business'
  public createdAt!: Date

  // Sequelize static methods
  //public static readonly associations: { [key: string]: any };
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  accountType: {
    type: DataTypes.ENUM('personal', 'business'),
    allowNull: false,
    defaultValue: 'personal',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: false, // manually handling createdAt only
});

export default User