import { SetMetadata } from '@nestjs/common';

export const UseRole = (role: string) => SetMetadata('auth_role', role)