const Role = require('../models/Role');

module.exports = async () => {
  const roleCount = await Role.collection.countDocuments();
  if (!roleCount) {
    Role.create([
      {
        title: 'Admin'
      },
      {
        title: 'User'
      }
    ])
      .then(role => {
        console.log(`Role seed done: ${role.length} roles created`);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
