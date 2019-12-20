const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

//connect to database
connectDB();

app.use(bodyParser.json());

//middleware
app.use(express.json({ extended: false }));

//routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//Create storage engine
// const storage = new GridFsStorage({
// 	url: mongoURI,
// 	file: (req, file) => {
// 		return new Promise((resolve, reject) => {
// 			crypto.randomBytes(16, (err, buf) => {
// 				if (err) {
// 					return reject(err);
// 				}
// 				const filename = file.originalname;
// 				const fileInfo = {
// 					filename: filename,
// 					bucketName: 'uploads'
// 				};
// 				resolve(fileInfo);
// 			});
// 		});
// 	}
// });

// const upload = multer({ storage });

// app.post('/', upload.single('img'), (req, res, err) => {
// 	if (err) throw err;
// 	res.status(201).send();
// });

////////

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
