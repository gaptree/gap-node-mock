# gap-node-mock

### install 
```
yarn add gap-node-mock --save-dev
```

### use
```
const mockMiddleware = require('gap-node-mock);
const express = require('express');

const app = express();

app.use('/', mockMiddleware({mockDir: xxx});

app.listen(port || 3000);
