export class ConsoleLogger implements NodeRedScenes.ILogger {
  debug(msg: any) : void {
    console.log('d>', msg);
  }
  info(msg: any) : void {
    console.info('i>', msg);
  }
  warn(msg: any) : void {
    console.warn('w>', msg);
  }
  error(msg: any) : void {
    console.error('e>', msg);
  }
}
