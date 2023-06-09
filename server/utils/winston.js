import winston from 'winston';
import path from 'path';

const logger = winston.createLogger({
   level: 'info',
   format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json(),
      winston.format.prettyPrint()
   ),
   //  defaultMeta: { service: 'user-service' } ,
   transports: [
      new winston.transports.Console({
         format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
            // winston.format.printf(({ level, message, label, timestamp }) => {
            //    return `${level}`
            // })
         ),
      }),
   ],
});

if (process.env.NODE_ENV === 'production') {
   logger.add(
      new winston.transports.File({
         filename: path.join(__dirname, '..', 'logs', 'error.log'),
         level: 'error',
      }),
      new winston.transports.File({
         filename: path.join(__dirname, '..', 'logs', 'combined.log'),
         level: 'info',
      })
   );
}

export default logger;
