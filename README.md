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

app.listen(port);
```

### Get start

1. create a directory where to place your routers and data
![structure](https://raw.githubusercontent.com/ss9501/user-guide-about/master/pics/node-mock-directory.png)
2. edit your route files
![/](https://github.com/ss9501/user-guide-about/blob/master/pics/node-mock-root.png?raw=true)
or
![/hr/xxx](https://github.com/ss9501/user-guide-about/blob/master/pics/node-mock-secondary-root.png?raw=true)

