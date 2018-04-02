

export const Playlist = sequelize.define('playlist', {
  searchString: {
    type: Sequelize.STRING
  },
  requestedBy: {
    type: Sequelize.INTEGER
  },
  requestedOn: {
    type: Sequelize.DATE
  }
})
