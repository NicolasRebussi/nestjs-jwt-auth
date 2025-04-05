import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <-- importa o módulo de configuração .env
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  // 🔽 Aqui definimos os módulos que serão importados no app principal
  imports: [
    // 📦 ConfigModule: responsável por ler o arquivo `.env` e disponibilizar variáveis com process.env
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule disponível globalmente (não precisa importar em outros módulos)
    }),

    // 🔐 AuthModule: módulo responsável pela autenticação (signup/signin com JWT)
    AuthModule,

    // 🧠 PrismaModule: fornece acesso ao banco de dados usando Prisma
    PrismaModule,
  ],

  // 🎯 Controllers principais da aplicação (nesse caso, apenas o AppController padrão do Nest)
  controllers: [AppController],

  // 🛠️ Serviços disponíveis globalmente no App (aqui, o AppService padrão)
  providers: [AppService],
})
export class AppModule {}
