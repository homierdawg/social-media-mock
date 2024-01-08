/**importing all the packages and important stuff we need to get this on da road ayeeeee */

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register} from "./Controllers/auth.js";
import { createPost } from "./Controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";


/* configurations - rdawg */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());/**not sure abt this tbh */
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"})); /**not sure abt this tbh */
app.use(morgan("common"));/**not sure abt this tbh */
app.use(bodyParser.json({limit: "30mb", extended: true}));/**not sure abt this tbh */
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));/**not sure abt this tbh */
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));/**supposedly this is for paths */


/* file storage -rdawg */
/** helps divert the storage for the files on a local machine (can be configured to cloud???) */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({storage});

/** route with files :P -  */
app.post('/auth/register', upload.single("picture"), register);
app.post("/posts", verifyToken,  upload.single("picture"), createPost);

/** other ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* setting up dat mongoose -rdawg */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT} `));
}).catch((error) => console.log(`${error} did not connect`)); 