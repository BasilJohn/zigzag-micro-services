import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import User from './model.user'

export class UserBio extends Model {
  public id!: number;
  public userId!: number;

  public availability!: string[] | null;
  public bio!: string | null;
  public birthday!: Date | null;
  public interests!: string[] | null;
  public preferredVibe!: string[] | null;
  public profilePicture!: string | null;
  public pronouns!: string | null;
  public purpose!: string | null;
  public userVibe!: string[] | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserBio.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // 1:1 relationship
  },
  availability: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  interests: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  preferredVibe: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pronouns: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userVibe: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'user_bio',
  timestamps: true,
});

// Relationship
User.hasOne(UserBio, { foreignKey: 'userId', as: 'bio' });
UserBio.belongsTo(User, { foreignKey: 'userId' });

export default UserBio;