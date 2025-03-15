import multer from "multer";


// Cấu hình nơi lưu trữ các file upload
const storage = multer.memoryStorage(); // Sử dụng memoryStorage


// Khởi tạo multer với cấu hình đã định nghĩa
const Remoteupload = multer({ storage: storage });

export default Remoteupload;
