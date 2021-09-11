# @atton16/logger

A pre-configured winston logger for web services. Works with NestJS and ExpressJS.

## Installation

```bash
npm install @atton16/logger
```

## Usage

### TypeScript

```typescript
import { logger } from '@atton16/logger';

logger.log('info', 'hello world');
logger.debug('debug message');
logger.info('some log');
```

### JavaScript

```javascript
const logger = require('@atton16/logger').logger;

logger.log('info', 'hello world');
logger.debug('debug message');
logger.info('some log');
```

## Configuration

The logger can be configured using environment variables. Here is the support configuration.

| Variable        | Description                                    | Default        |
| --------------- | ---------------------------------------------- | -------------- |
| LOG_FILE_PREFIX | File prefiex (should be your application name) | ``             |
| LOG_MAX_FILES   | Maximum file to be kept                        | `60d`          |
| LOG_FOLDER      | Log folder for file transport                  | `./logs`       |
| LOG_LEVEL       | Log level for console transport                | `debug`        |
| LOG_APP_NAME    | Set logging app name                           | `NestWinston`  |
| LOG_COLOR       | Enable log coloring                            | `true`         |
| LOG_TIMESTAMP   | Include timestamp in log message               | `true`         |
| LOG_TRANSPORTS  | Transports to emit log                         | `console,file` |

### Log Level

Log level can be controlled by `LOG_LEVEL` environment variable. See [winston Logging Level](https://github.com/winstonjs/winston#logging-levels) for more detail.

## Activity Logging (Additional Features)

The package also comes with standard request/response logging middleware for convenient logging.

### Usage - Activity Logging

Example with NestJS:

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { activityLogMiddleware, logger } from '@atton16/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(activityLogMiddleware);
  await app.listen(3000, () => {
    logger.info(`Listening at 127.0.0.1:3000`);
  });
}
bootstrap();
```

Example with ExpressJS:

```javascript
const express = require('express');
const { activityLogMiddleware, logger } = require('@atton16/logger');

const app = express();
app.use(activityLogMiddleware);

app.get('/', (req, res) => {
  res.json({ timestamp: Date.now() });
});

app.listen(3000, () => {
  logger.info(`Listening at 127.0.0.1:3000`);
});
```

### Skip Dumping Response Body

The middleware is highly useful for running web service in production environment. However, sometimes the response body is fairly huge (i.e. image, binary) and you might wanted to skip dumping it.
If you are using NestJS, you can use `ActivityLogResponseSkipBody` interceptor provided.
Or if you are using ExpressJS, you can use `responseSkipBody` middleware provided.

Example with NestJS:

```typescript
// app.controller.ts
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ActivityLogResponseSkipBody } from '@atton16/logger';

@Controller()
export class AppController {
  @Get()
  @UseInterceptors(ActivityLogResponseSkipBody)
  helloWorld(): string {
    let ret: string;
    for (let i = 0; i < 100000000; i++) {
      ret += 'A';
    }
    return ret; // 100 million A's
  }
}
```

Example with ExpressJS:

```javascript
const express = require('express');
const {
  activityLogMiddleware,
  logger,
  responseSkipBody,
} = require('@atton16/logger');

const app = express();
app.use(activityLogMiddleware);

app.get('/', responseSkipBody, (req, res) => {
  let ret;
  for (let i = 0; i < 100000000; i++) {
    ret += 'A';
  }
  res.send(ret);
});

app.listen(3000);
```

## License

ISC License

Copyright (c) 2020, Attawit Kittikrairit

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
