import { ApiOperation, ApiTags, ApiResponse, getSchemaPath, ApiParam } from '@nestjs/swagger';
import { ViewShortenerDTO } from '../dtos/responses/view-shortener.dto';
import { HttpStatus } from '@nestjs/common';

export function RegisterShortenerSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Registrar URL.',
      description: 'Registrar URL para ser encurtada. Requisição pode ser feita estando autenticado ou não'
    })(target, propertyKey, descriptor);
    ApiTags('Shortener')(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Link encurtado com sucesso!',
      type: ViewShortenerDTO
    })(target, propertyKey, descriptor)
  };

}

export function UpdateShortenerSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Atualizar URL encurtada.',
      description: 'Put para atualizar URL encurtada, alterando o destino do redirecionamento.'
    })(target, propertyKey, descriptor);
    ApiTags('Shortener')(target, propertyKey, descriptor);
    ApiParam({
      name: 'IDShortenedUrl',
      description: 'o ID da URL encurtada.',
      example: 1
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Link atualizado com sucesso!',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ViewShortenerDTO) },
          {
            properties: {
              originalUrl: {
                type: 'string',
                example: "https://wwww.facebook.com"
              },
            },
          },
          {
            properties: {
              updatedAt: {
                type: 'date',
                example: "2024-04-14T14:00:33.782Z"
              },
            },
          },

        ]
      }

    })(target, propertyKey, descriptor);
  };
}

export function DeleteShortenerSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Deletar URL encurtada.',
      description: 'Put para deletar logicamente a URL encurtada. Enviando o ID do encurtado como parametro.'
    })(target, propertyKey, descriptor);
    ApiTags('Shortener')(target, propertyKey, descriptor);
    ApiParam({
      name: 'IDShortenedUrl',
      description: 'ID da URL encurtada.',
      example: 1
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'Link deletado com sucesso!',
    })(target, propertyKey, descriptor);
  };
}


export function FindMyShortenerSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Pegar encurtados do usuário',
      description: 'Get para pegar todos os encurtados feitos pelo usuário autenticado que estão ativados.'
    })(target, propertyKey, descriptor);
    ApiTags('Shortener')(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Links encontrados com sucesso!',
      type: [ViewShortenerDTO]
    })(target, propertyKey, descriptor);
  };
}

export function FindAllShortenerSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Pegar todos os encurtados',
      description: 'Get para pegar todos os encurtados que estão ativados.'
    })(target, propertyKey, descriptor);
    ApiTags('Shortener')(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Links encontrados com sucesso!',
      type: [ViewShortenerDTO]
    })(target, propertyKey, descriptor);
  };
}
