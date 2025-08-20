import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import status from 'http-status';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

app.use(GlobalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'NOT FOUND',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

export default app;
