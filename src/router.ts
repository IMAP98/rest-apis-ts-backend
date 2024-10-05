import { Router } from "express";
import { body } from "express-validator";
import { createProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get('/', (req, res) => {
    res.json('GET');
});

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

router.put('/', (req, res) => {
    res.json('PUT');
});

router.patch('/', (req, res) => {
    res.json('PATCH');
});

router.delete('/', (req, res) => {
    res.json('DELETE');
});

export default router;
