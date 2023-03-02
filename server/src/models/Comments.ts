module.exports = (sequelize: any, DataTypes: any) => {
  const Comments = sequelize.define("Comments", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    PostId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });

  return Comments;
};
