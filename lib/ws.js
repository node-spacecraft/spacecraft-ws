const Component = require('spacecraft/component');
const logger = require('spacecraft-logger')();
const Server = require('socket.io');
const defaultOpts = {
  http: null,
  port: 3001,
}

class WS extends Component {
  constructor(opts) {
    super();
    this.opts = Object.assign({}, defaultOpts, opts);
    this.events = [];
  }

  onMount() {
    super.onMount();
  }

  onLoad() {
    logger.info('websocket is loading...');
    if(this.opts.http) {
      logger.info('websocket is bind to', this.opts.http);
      this.io = new Server(this.opts.http);
    }else {
      logger.info('websocket is bind to port', this.opts.port);
      this.io = new Server(this.opts.port);
    }

    // 挂载事件
    this.io.on('connection', (socket) => {
      for (let event of this.events) {
        socket.on(event.eventName, async (data, cb) => {
          logger.info('[On]'+event.eventName, '<---', data);
          let res = await event.eventFn(data);
          if(res && cb) {
            logger.info('[On]'+event.eventName, '--->', res);
            cb(res);
          }
        });
      }
    })
  }

  mount(eventName, eventFn) {
    logger.info('mount event:', eventName);
    this.events.push({eventName, eventFn});

    return this;
  }

  emit(eventName, eventData, eventFn) {
    socket.emit(eventName, eventData, async (data, cb) => {
      logger.info('[Emit]'+eventName, "--->", eventData);
      let res = await eventFn(data)
      if(res && cb) {
        cb(res)
        logger.info('[Emit]'+eventName, "<---", res);
      }
    });
  }
}

module.exports = WS;
