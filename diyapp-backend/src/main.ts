import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const uploadsPath = join(process.cwd(), 'uploads');
  
  app.enableCors({
    origin: 'http://localhost:4200',
  });

  app.use('/uploads', (req: Request, res: Response, next: NextFunction) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const url = req.url.toLowerCase();
    if (allowedExtensions.some(ext => url.endsWith(ext))) {
      next();
    } else {
      res.status(403).send('Forbidden: Only image files are served');
    }
  });

  app.useStaticAssets(uploadsPath, {
    prefix: '/uploads',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
