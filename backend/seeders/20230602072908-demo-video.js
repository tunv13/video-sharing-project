'use strict';

const { findOneByEmail } = require('../services/user.service');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const user = await findOneByEmail('example@example.com')

    return queryInterface.bulkInsert('Videos', [{
      title: 'CÔ ĐƠN TRÊN SOFA | Hồ Ngọc Hà x Tăng Duy Tân | Trung Quân live cover at Soul of The Forest',
      description: `Bài hát: CÔ ĐƠN TRÊN SOFA | Hồ Ngọc Hà x Tăng Duy Tân | Trung Quân live cover at Soul of The Forest

      Chào mừng bạn đến với Kênh YouTube chính thức của ca sĩ Trung Quân!
      Welcome to Trung Quan's Official YouTube Channel !
      
      ► Hãy nhấn ĐĂNG KÝ để là người đầu tiên xem CÁC SẢN PHẨM MỚI NHẤT của Trung Quân. 
      http://bit.ly/TrungQuanOfficial
      
      ▶ Theo dõi Trung Quân: 
      
      ♫ Youtube: http://bit.ly/TrungQuanOfficial
      ♫ Facebook: https://www.facebook.com/quancartoon
      ♫ Instagram: https://instagram.com/quan.cartoon/
      ♫ Fanpage: https://www.facebook.com/TrungQuanOfficial
      ♫ Soundcloud: https://soundcloud.com/quancartoon
      ♫ Twitter: https://twitter.com/quancartoon
      
      Liên hệ:
      Ms. Linh: 0972809999 
      trungquan.singer@gmail.com
      
      ------------------------------------------
      TRUNG QUAN OFFICIAL YOUTUBE CHANNEL!
      
      © Bản quyền ca khúc thuộc về Tăng Duy Tân - Hồ Ngọc Hà
      © Copyright by Tang Duy Tan - Ho Ngoc Ha
      ☞ Please do not Reup 
      
      #trungquan #codontrensofa`,
      videoKey: 'u7ScW1kCgS0',
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Videos', null, {});
  }
};
