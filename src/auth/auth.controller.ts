// Importa os decorators usados para criar um controller e lidar com requisições HTTP
import { Controller, Post, Body } from '@nestjs/common';

// Importa o serviço de autenticação, que contém a lógica de cadastro e login
import { AuthService } from './auth.service';

// Importa os DTOs (Data Transfer Objects) que definem o formato esperado dos dados de entrada
import { CreateAuthDto } from './dto/create-auth.dto';     // DTO para cadastro (signup)
import { SigninAuthDto } from './dto/signin-auth.dto';     // DTO para login (signin)

// Define o controller e a rota base dele como 'auth'
// Ou seja, todas as rotas aqui dentro serão acessíveis a partir de /auth
@Controller('auth')
export class AuthController {
  // Injeção de dependência do AuthService
  // O NestJS automaticamente cria uma instância do AuthService e injeta aqui
  constructor(private readonly authService: AuthService) {}
// Define a rota POST /auth/signup
  // Essa rota será usada para registrar um novo usuário no sistema
  @Post('signup')
  signup(@Body() dto: CreateAuthDto) {
    // Quando essa rota for chamada, o NestJS pega os dados do corpo da requisição (body)
    // e injeta no DTO CreateAuthDto
    // Em seguida, chama o método signup do AuthService, passando esses dados
    return this.authService.signup(dto);
  }
  // Define a rota POST /auth/signin
  // Essa rota será usada para autenticar um usuário e retornar um token JWT
  @Post('signin')
  signin(@Body() dto: SigninAuthDto) {
    // O NestJS injeta os dados do corpo da requisição no SigninAuthDto
    // e envia esses dados para o método signin do AuthService
    return this.authService.signin(dto);
  }
}
