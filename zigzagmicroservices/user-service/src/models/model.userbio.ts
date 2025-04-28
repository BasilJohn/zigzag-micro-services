import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import User from './model.user'

export class UserBio extends Model {
  public id!: number;
  public userId!: number;

  public birthday!: Date | null;
  public showBirthday!: boolean;

  public pronouns!: string | null;
  public showPronouns!: boolean;

  public vibe!: string[] | null;
  public vibeWith!: string[] | null;
  public interests!: string[] | null;
  public availability!: string[] | null;
  public whyHere!: string[] | null;

  public bio!: string | null;
  public photos!: string[] | null;

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
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  showBirthday: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  pronouns: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  showPronouns: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  vibe: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  vibeWith: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  interests: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  availability: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  whyHere: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'user_bio',
  timestamps: true,
});

// Relationship
User.hasOne(UserBio, { foreignKey: 'userId', as: 'bio' });
UserBio.belongsTo(User, { foreignKey: 'userId' });

export default UserBio;