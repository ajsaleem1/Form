module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            firstName: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            lastName: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            phone: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },

            email: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            company: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            city: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            state: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            inquiry: {
                type: DataTypes.STRING(5000),
                allowNull: true,
            },
        },

        {
            timestamps: false,
            underscored: false,
            freezeTableName: true,
            tableName: "users",
        }
    );

    return User;
};
