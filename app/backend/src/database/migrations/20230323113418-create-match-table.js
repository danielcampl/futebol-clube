'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('matches', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },

    home_team_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        key: 'id',
        model: 'teams',
      },

      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'home_team_id'
    },

    home_team_goals: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'home_team_goals'
    },

    away_team_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        key: 'id',
        model: 'teams',
      },

      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'away_team_id'
    },

    away_team_goals: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'away_team_goals'
    },

    in_progress: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      field: 'in_progress'
    }
  });
 },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};