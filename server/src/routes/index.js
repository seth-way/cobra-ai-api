const router = require('express').Router();

// Define routes
const routes = ['fighters'];

const routesObj = routes.reduce((acc, route) => {
  acc[`/${route}`] = require(`./${route}`);
 return acc;
}, {});

// Use routes
Object.entries(routesObj).forEach(([prefix, handler]) =>
  router.use(prefix, handler)
);

module.exports = router;
