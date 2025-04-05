import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importa o módulo que fornece o PrismaService
import { JwtModule } from '@nestjs/jwt'; // Importa o módulo JWT

@Module({
  // Aqui declaramos quais módulos esse módulo depende
  imports: [
    PrismaModule, // Necessário para acessar o banco via PrismaService
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Define a chave secreta para assinar o token (vem do .env)
      signOptions: { expiresIn: '1h' }, // Define tempo de expiração do token
    }),
  ],
  // Controladores que fazem parte desse módulo
  controllers: [AuthController],

  // Serviços que serão utilizados internamente ou exportados
  providers: [AuthService],
})
export class AuthModule {}
