import { applyDecorators, Controller } from '@nestjs/common';
// import { ApiHeader, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export function ControllerApi({ name }) {
  return applyDecorators(
    Controller(`/api/${name}`),
  );
}

export function ControllerAuth({ name }) {
  return applyDecorators(
    Controller(`/auth${name ? `/${name}` : ''}`),
  );
}

