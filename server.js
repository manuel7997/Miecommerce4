const express = require('express');
const session = require('express-session');

const cors = require('cors');
const path = require('path');
const app = express();


require('./db/database');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


app.use(session({
    secret: 'botines-store-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((req, res, next) => {
    const cart = req.session.cart || [];
    res.locals.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    next();
});


app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});
app.use('/api', require('./routes/api'));


const NO_LAYOUT = ['pages/login', 'pages/register'];

app.use((req, res, next) => {
    const originalRender = res.render.bind(res);

    res.render = (view, locals, callback) => {
        // Normalizar argumentos: locals puede ser omitido
        if (typeof locals === 'function') {
            callback = locals;
            locals = {};
        }
        locals = locals || {};

        // Vistas sin layout → render normal
        if (NO_LAYOUT.includes(view)) {
            return originalRender(view, locals, callback);
        }

        // Renderizar la vista parcial primero, luego envolverla en el layout
        originalRender(view, locals, (err, body) => {
            if (err) return next(err);
            originalRender('layouts/main', { ...locals, body }, callback);
        });
    };

    next();
});

// 🛣️ Rutas
app.use('/', require('./routes/productRoute'));
app.use('/', require('./routes/cartRoute'));
app.use('/', require('./routes/authRoute'));
app.use('/', require('./routes/categoryRoute'));

// 💳 Checkout
app.get('/checkout', (req, res) => {
    res.render('pages/checkout');
});

// ❌ 404
app.use((req, res) => {
    res.status(404).render('pages/404');
});

// 💥 500 — manejador de errores global (4 parámetros obligatorios)
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    res.status(500).render('pages/500');
});

// 🚀 Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
 