const {Router} = require('express');
const { createProduct, getAllProducts, updateProduct, deleteProduct, generateDescription, suggestCategory, getProductByBarcode, decodeBarcodeImage } = require('../controllers/product.controller');
const protect = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const upload = require('../middleware/multer.middleware');

const router = Router();

router.get('/', protect, authorize('Admin', 'Staff'), getAllProducts);
router.post('/', protect, authorize('Admin'), upload.single('image'), createProduct);
router.put('/:id', protect, authorize('Admin'), upload.single('image'), updateProduct);
router.delete('/:id', protect, authorize('Admin'), deleteProduct);
router.post('/generate-description', protect, authorize('Admin'), generateDescription);
router.post('/suggest-category', protect, authorize('Admin'), suggestCategory);

router.get('/barcode/:barcode', protect, authorize('Admin', 'Staff'), getProductByBarcode);
router.post('/decode-barcode', protect, authorize('Admin'), upload.single('barcodeImage'), decodeBarcodeImage);

module.exports = router;