module.exports = (sequelize: any, DataTypes: any) => {
  const Likes = sequelize.define("Likes", {
    PostId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });

  return Likes;
};
