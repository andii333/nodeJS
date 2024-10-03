import { Controller, Get, UseGuards } from '@nestjs/common';
import { RbacGuard } from './rbac/rbac.guard';
import { Roles } from './roles/roles.decorator';

@Controller()
export class AppController {
  @Get()
  @Roles('admin', 'manager')
  @UseGuards(RbacGuard)
  findAll() {
    return 'This route is protected with RBAC';
  }

  @Get('public')
  findPublic() {
    return 'This route is public';
  }
}
