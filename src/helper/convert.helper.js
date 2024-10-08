const path = require('path');
const configs = require('../configs');

const convertFilePath = (filePath) => {
    const publicPath = filePath.split('public')[1];
    const fullPath = path.join(configs.general.BACKEND_DOMAIN_NAME, publicPath).replace(/\\/g, '//');
    console.log('convert success');
    return fullPath;
};
// const deConvertFilePath = (filePath: string): string => {
//     const publicPath = filePath.split("3001")[1];
//     const fullPath = path.join(process.cwd(), `//public//${publicPath}`);
//     return fullPath;
// };
// const deConvertFilePath = (filePath) => {
//     try {
//         const url = new URL(filePath);
//         const publicPath = url.pathname; // Lấy đường dẫn tương đối từ URL
//         const fullPath = path.join(process.cwd(), `public${publicPath}`);
//         console.log("deconver success");
//         return fullPath;
//     } catch (error) {
//         console.error('Invalid URL:', error);
//         return '';
//     }
// };
const deConvertFilePath = (filePath) => {
    try {
        // Tạo đối tượng URL từ filePath
        const url = new URL(filePath);

        // Kiểm tra xem URL có chứa CORS proxy hay không
        // Nếu có, bạn sẽ cần lấy URL gốc
        const originalUrl = url.href.includes('cors-anywhere') ? url.href.split('cors-anywhere/')[1] : url.href;

        // Lấy đường dẫn tương đối từ URL gốc
        const publicPath = new URL(originalUrl).pathname; // Lấy đường dẫn từ URL gốc
        const fullPath = path.join(process.cwd(), `public${publicPath}`);

        console.log('deconver success');
        return fullPath;
    } catch (error) {
        console.error('Invalid URL:', error);
        return '';
    }
};
const convert = { convertFilePath, deConvertFilePath };
module.exports = convert;
