const { Router } = require('express');
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const multer = require('multer');
const AuthController = require('../controllers/AuthController');
const PlaceController = require('../controllers/PlaceController');
const FilesController = require('../controllers/FilesController');
const HostingController = require('../controllers/HostingController');
const AppController = require('../controllers/AppController');

const router = Router();

// Use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes for the test
router.get("/api/hostme", AppController.test);

// Routes for authentication
router.post('/api/register', AuthController.registerUser);
router.post('/api/google', AuthController.googleLogin);
router.post('/api/login', AuthController.loginUser);
router.post('/api/logout', AuthController.logoutUser);
router.get('/api/profile', AuthController.getProfile);
router.post("/api/reset-password", AuthController.resetPassword);

// Routes for places
router.post('/api/places', PlaceController.createPlaces);
router.get('/api/user-places', PlaceController.getUserPlaces);
router.get('/api/places/:id', PlaceController.getPlacesById);
router.put('/api/places', PlaceController.updatePlaces);
router.get('/api/places', PlaceController.getAllPlaces);
router.delete("/api/places/:id", PlaceController.deletePlace);


// Routes for hosting
router.post('/api/hosting', HostingController.createHosting);
router.get('/api/hosting', HostingController.getHosting);
router.get('/api/hosted', HostingController.getHosted);
router.delete("/api/hostings/:id", HostingController.deleteHosting);

// Route for uploading images
router.post('/api/upload', upload.array('photos', 100), FilesController.uploadImages);
router.post('/api/upload-by-link', FilesController.uploadByLink);

module.exports = router;
