import { SetMetadata } from '@nestjs/common';
export const KeyPermissions = 'permissions_required';

export const RequirePermissions = (permissions: string[]) =>
  SetMetadata(KeyPermissions, permissions);
