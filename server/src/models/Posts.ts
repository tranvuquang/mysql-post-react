module.exports = (sequelize: any, DataTypes: any) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Posts.associate = (models: any) => {
  //   Posts.hasMany(models.Comments, {
  //     onDelete: "cascade",
  //   });

  //   Posts.hasMany(models.Likes, {
  //     onDelete: "cascade",
  //   });
  // };

  return Posts;
};
