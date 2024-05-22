const { Router } = require('express');
const multer = require('multer');
const AuthController = require('../controllers/AuthController');
const PlaceController = require('../controllers/PlaceController');
const FilesController = require('../controllers/FilesController');
const HostingController = require('../controllers/HostingController');
const AppController = require('../controllers/AppController');


const router = Router();
const photosMiddleware = multer({ dest: 'uploads/' });

// Routes for the test
router.get("/test", AppController.test);

// Routes for authentication
router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/logout', AuthController.logoutUser);
router.get('/profile', AuthController.getProfile);

// Routes for places
router.post('/places', PlaceController.createPlaces);
router.get('/user-places', PlaceController.getUserPlaces);
router.get('/places/:id', PlaceController.getPlacesById);
router.put('/places', PlaceController.updatePlaces);
router.get('/places', PlaceController.getAllPlaces);

// Routes for hosting
router.post('/hosting', HostingController.createHosting);
router.get('/hosting', HostingController.getHosting);
router.get('/hosted', HostingController.getHosted);

// Route for uploading images
router.post('/upload', photosMiddleware.array('photos', 100), FilesController.uploadImages);
router.post('/upload-by-link', FilesController.uploadByLink);


module.exports = router;