import express from "express";
const app = express();
const PORT = process.env.PORT || 8888;

app.use(express.json());

let products = [
    { id: 1, productName: 'Product 1', price: 100, stock: 10 },
    { id: 2, productName: 'Product 2', price: 200, stock: 5 },
    { id: 3, productName: 'Product 3', price: 150, stock: 20 },
];

//--- Read All Product ---//
app.get('/products', (req,res) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//--- Create Product ---//
app.post('/products', (req,res) => {
    try {
        const { productName, price, stock } = req.body;
        if(!productName || price == null || stock == null){
            return res.status(400).json({ message: "Missing fields" })
        }
        const newProducts = {
            id: products.length + 1,
            productName,
            price,
            stock
        };
        products.push(newProducts);
        res.status(201).json(newProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//--- Update Product ---//
app.patch('/products/:id', (req,res) => {
    try {
        const { id } = req.params;
        const { productName, price, stock } = req.body;
        const product = products.find(product => product.id == id);
        if(!product){
            return res.status(404).json({ message: "Product Not Found" })
        }
        if(productName) product.productName = productName;
        if(price != null)product.price = price;
        if(stock != null)product.stock = stock;

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//--- Delete Product ---//
app.delete('/products/:id', (req,res) => {
    try {
        const { id } = req.params;
        const product = products.find(product => product.id == id);
        if(!product){
            return res.status(404).json({ message: "Product Not Found"})
        }
        products = products.filter(product => product.id != id);
        res.status(200).json({ message: "Product Delete Successfully", data: products})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});