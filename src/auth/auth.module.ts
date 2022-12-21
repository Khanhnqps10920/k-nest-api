import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { LocalStrategy } from './auth.local.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.stategy';
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {},
    }),
    PassportModule,
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
