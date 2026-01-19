import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Event = sequelize.define("Event", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false, // Required in database, but controller provides default
    },
    longDescription: {
      type: DataTypes.TEXT,
      allowNull: false, // Required in database, but controller provides default
    },
    tagline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postCode: {
      type: DataTypes.STRING,
      allowNull: false, // Required in database, but controller syncs with postalCode
      field: 'postCode', // Explicitly map to database column
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'events',
  });

export default Event;