// Importa decoradores e exceções do NestJS
import {
  Injectable,                // Permite que a classe seja injetável em outros lugares
  ConflictException,         // Lança erro 409 caso algo já exista (ex: e-mail duplicado)
  UnauthorizedException,     // Lança erro 401 em caso de login inválido
} from '@nestjs/common';

// Serviço do Prisma para acessar o banco de dados
import { PrismaService } from '../prisma/prisma.service';

// DTOs (Data Transfer Objects) com validações para os dados recebidos
import { CreateAuthDto } from './dto/create-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';

// Biblioteca para criptografar e comparar senhas
import * as bcrypt from 'bcrypt';

// Serviço de JWT do NestJS (usado para gerar o token)
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // Injeção de dependências no construtor
  constructor(
    private prisma: PrismaService, // Acesso ao banco via Prisma
    private jwt: JwtService,       // Geração de JWT
  ) {}

  /**
   * Método de cadastro (signup)
   * Verifica se o e-mail já existe, criptografa a senha e cria o usuário.
   */
  async signup(dto: CreateAuthDto) {
    // Busca usuário com mesmo e-mail no banco
    const userExists = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (userExists) {
      // Se já existir, lança erro 409 (Conflito)
      throw new ConflictException('Email já está em uso');
    }

    // Criptografa a senha com 10 rounds de salt
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Cria o novo usuário no banco com a senha criptografada
    const newUser = await this.prisma.usuario.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        password: hashedPassword,
      },
    });

    // Remove a senha do objeto retornado por segurança
    const { password, ...result } = newUser;
    return result; // Retorna os dados do usuário (sem senha)
  }

  /**
   * Método de login (signin)
   * Verifica se o e-mail existe, compara a senha e retorna um token JWT.
   */
  async signin(dto: SigninAuthDto) {
    // Busca usuário pelo e-mail
    const user = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      // Se não existir, lança erro 401
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Compara a senha enviada com a senha salva (criptografada)
    const senhaValida = await bcrypt.compare(dto.password, user.password);
    if (!senhaValida) {
      // Se a senha estiver errada, lança erro 401
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Cria o payload do token (dados que vão dentro do JWT)
    const payload = {
      sub: user.id,      // "sub" = subject = identificador principal
      email: user.email, // pode colocar mais dados aqui se quiser
    };

    // Gera o token assinado
    const token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET, // chave secreta (definida no .env)
      expiresIn: '1h',                // duração do token
    });

    // Retorna o token para o cliente
    return { access_token: token };
  }
}
