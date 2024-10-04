import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.json('GET');
});

router.post('/', (req, res) => {
    res.json('POST');
});

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