import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get('/', getProducts);

router.get('/:id', 
    // NOTE: Validations
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
);

router.post('/',  
        
    // NOTE: Validations
    body('name')
                .notEmpty().withMessage("The product name can't be empty"),
    body('price')
                .isNumeric().withMessage("Invalid value")
                .notEmpty().withMessage("The product price can't be empty")
                .custom(value => value > 0).withMessage("The product price can't be negative"),
    handleInputErrors,
    createProduct,
    
);

router.put('/:id', 
        
    // NOTE: Validations
    param('id').isInt().withMessage('ID no válido'),
    body('name')
                .notEmpty().withMessage("The product name can't be empty"),
    body('price')
                .isNumeric().withMessage("Invalid value")
                .notEmpty().withMessage("The product price can't be empty")
                .custom(value => value > 0).withMessage("The product price can't be negative"),
    body('availability')
                .isBoolean().withMessage("Invalid value for availability"),
    handleInputErrors,
    updateProduct
);

router.patch('/:id ', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
);

router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
);

export default router;
