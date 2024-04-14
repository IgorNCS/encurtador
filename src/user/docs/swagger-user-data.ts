import { ApiOperation, ApiTags, ApiResponse, getSchemaPath, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ViewUserDTO } from '../dtos/responses/view-user.dto';
import { LoginResponse } from '../dtos/responses/login-response.dto';

export function RegisterUserSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Registrar User.',
      description: 'Post para registrar novo usuario.'
    })(target, propertyKey, descriptor);
    ApiTags('User')(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Usuario criado com sucesso!',
      type: ViewUserDTO
    })(target, propertyKey, descriptor)
  };
}

export function LoginUserSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Logar User.',
      description: 'Post para logar um usuario existente.'
    })(target, propertyKey, descriptor);
    ApiTags('User')(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Usuario logado com sucesso!',
      type: LoginResponse

    })(target, propertyKey, descriptor)
  };
}

export function LogoutUserSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Deslogar User.',
      description: 'Post para deslogar o usuario logado.'
    })(target, propertyKey, descriptor);
    ApiTags('User')(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Usuario deslogado com sucesso!',
      schema: {
        properties: {
          acces_token: {
            type: 'string',
            description: "Token de acesso do usuário",
            example: null
          },
          status: {
            type: 'number',
            description: "Http Status code",
            example: 200
          }
        }
      }
    })(target, propertyKey, descriptor)
  };
}

