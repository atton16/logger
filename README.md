# atton16-logger

A pre-configured winston logger for web services.

## Installation

```bash
npm install atton16-logger
```

## Usage

```typescript
import logger from 'atton16-logger';

logger.log('info', 'hello world');
logger.debug('debug message');
logger.info('some log');

```

## Log Level

Log level can be controlled by `LOG_LEVEL` environment variable. See [winston Logging Level](https://github.com/winstonjs/winston#logging-levels) for more detail.

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
