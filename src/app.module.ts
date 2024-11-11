// import { Module } from '@nestjs/common';
// import { TasksModule } from './tasks/tasks.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { configValidationSchema } from './config.schema';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: [`.env.stage.${process.env.STAGE}`],
//       validationSchema: configValidationSchema,
//     }),
//     TasksModule,
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => {
//         const isProduction = configService.get('stage') ==='prod';
//         return {
//           ssl: isProduction,
//           extra: { 
//             ssl: isProduction ? { rejectunauthorized: false } : null
//           },
//         type: 'postgres',
//         autoLoadEntities: true,
//         synchronize: true,
//         host: configService.get('DB_HOST'),
//         port: configService.get('DB_PORT'),
//         username: configService.get('DB_USERNAME'),
//         password: configService.get('DB_PASSWORD'),
//         database: configService.get('DB_DATABASE'),
//       };
//     },
//     }),
//     AuthModule,
//   ],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: isProduction ? undefined : configService.get('DB_HOST'),
          port: isProduction ? undefined : configService.get('DB_PORT'),
          username: isProduction ? undefined : configService.get('DB_USERNAME'),
          password: isProduction ? undefined : configService.get('DB_PASSWORD'),
          database: isProduction ? undefined : configService.get('DB_DATABASE'),
          ssl: isProduction,  // Set SSL only in production
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,  // Corrected property name
          },
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}