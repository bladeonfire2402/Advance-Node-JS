
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config()
// Cấu hình Cloudinary
const Cloudinary= cloudinary.config({
  cloud_name: "drkjgtjx7",
  api_key: "155458673135492",
  api_secret: "YOSQ7rHZlKmNZCjU9tlaQwW5014",
});

export default Cloudinary

