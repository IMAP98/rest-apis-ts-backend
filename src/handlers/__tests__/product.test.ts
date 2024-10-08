import request from "supertest";
import server from "../../server";


describe('POST /api/products', () => { 

    test('Should display validation errors', async() => { 
        const response = await request(server).post('/api/products').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(3);
    });

    test('Should validate that the price is greater than 0', async() => { 
        const response = await request(server).post('/api/products').send({
            name: "Curved monitor",
            price: 0
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(3);
    });

    test('Should validate that the price is a number', async() => { 
        const response = await request(server).post('/api/products').send({
            name: "Curved monitor",
            price: "ABC"
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(3);
    });

    test('Should create a new product', async() => { 

        const response = await request(server).post('/api/products').send({
            name: "Mouse",
            price: 49
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(200);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');

    });
});

describe('GET /api/products', () => { 

    test('Should check if api/products url exists', async() => { 

        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');

    });

    test('GET a JSON response witch products', async() => { 

        const response = await request(server).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);

    });
});

describe('GET /api/products/:id', () => { 

    test('Should return a 404 response for a non-existent product id', async() => {  
        
        const productId = 2000;
        const response = await request(server).get(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Product not found.');

    });

    test('Should check a valid ID in the URL', async() => {  
        
        const response = await request(server).get(`/api/products/1`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

    });

});

describe('PUT /api/products/:id', () => {

    test('Should check a valid ID in the URL', async() => {  
        
        const response = await request(server)
                                .put(`/api/products/ABC`)
                                .send({
                                    name: "Curved monitor",
                                    availability: true,
                                    price: 300
                                });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("Invalid ID");

    });

    test('Should display validation error messages when updating a product', async() => { 

        const response = await request(server).put('/api/products/1').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.status).not.toHaveProperty('data');

    });

    test('Should validate that the price is greater than 0', async() => { 

        const response = await request(server)
                                .put('/api/products/1')
                                .send({
                                    name: "Curved monitor",
                                    availability: true,
                                    price: 0
                                });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("The product price can't be negative or 0");

        expect(response.status).not.toBe(200);
        expect(response.status).not.toHaveProperty('data');

    });

    test('Should return 404 response for a non existent product', async() => { 

        const productId = 20000;

        const response = await request(server)
                                .put(`/api/products/${productId}`)
                                .send({
                                    name: "Curved monitor",
                                    availability: true,
                                    price: 349
                                });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Product not found.');

        expect(response.status).not.toBe(200);
        expect(response.status).not.toHaveProperty('data');

    });

    test('Should update an existing product with valid data', async() => { 

        const response = await request(server)
                                .put(`/api/products/1`)
                                .send({
                                    name: "Curved monitor",
                                    availability: true,
                                    price: 349
                                });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(400);
        expect(response.status).not.toHaveProperty('errors');

    });

});

describe('PATCH /api/products/:id', () => { 

    test('should return 404 response for a non-existing product', async() => {

        const productId = 2000;
        const response = await request(server).patch(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Product not found.');

        expect(response.body.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
        
    });

    test('should return 404 response for a non-existing product', async() => {

        const response = await request(server).patch(`/api/products/1`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.availability).toBe(false);

        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('error');
        
    });

});

describe('DELETE /api/products/:id', () => { 

    test('should check a valid ID', async() => { 
        
        const response = await request(server).delete('/api/products/ABC');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('Invalid ID');

    });

    test('should return a 404 response for a non-existent product', async() => { 

        const productId = 2000;
        const response = await request(server).delete(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Product not found.');

        expect(response.status).not.toBe(200);

    });

    test('should delete a product', async() => { 
        
        const response = await request(server).delete('/api/products/1');

        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Product deleted.');

        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(404);

    });

});