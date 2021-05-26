import { Server } from 'node:net';
import error, { BaseError } from '../errors';

function terminate(
  server: Server,
  options = { coredump: false, timeout: 500 }
) {
  const exit = (code: number) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code: number, reason: string) => (err: BaseError) => {
    if (err && err instanceof Error) {
      error(err);
    }

    server.close();
    setTimeout(exit, options.timeout).unref();
  };
}

export default terminate;
