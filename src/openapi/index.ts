import * as Path from 'path'
import * as SwaggerJsdoc from 'swagger-jsdoc'

const swaggerDefinition: SwaggerJsdoc.SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Template API',
    version: '1.0.0',
    description: 'API documentation for the project',
  },
  security: [{ JWT: [] }],
  components: {
    securitySchemes: {
      JWT: {
        in: 'header',
        name: 'Authorization',
        type: 'apiKey'
      }
    },
    responses: {
      204: { description: 'No content' },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/exception'
            }
          }
        }
      }
    }
  },
  schemas: {
    exception: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        timestamp: { type: 'string', format: 'date-time' },
        path: { type: 'string' },
        message: { type: 'string' },
        error: { type: 'object' }
      }
    }
  }
}

const options: SwaggerJsdoc.Options = {
  swaggerDefinition,
  apis: [
    Path.resolve(__dirname, '../../src/authentication/*.controller.ts'),
    Path.resolve(__dirname, '../../src/api/*/*.controller.ts'),
    Path.resolve(__dirname, '../../src/openapi/components/*.yml'),
  ]
}

export default async (): Promise<Record<string, any>> => SwaggerJsdoc(options)