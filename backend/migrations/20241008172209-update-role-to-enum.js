'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('superadministrador', 'administrador', 'usuario'),
      defaultValue: 'usuario',
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.STRING,
    });

    // Eliminar el tipo ENUM en caso de rollback
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";');
  }
};
