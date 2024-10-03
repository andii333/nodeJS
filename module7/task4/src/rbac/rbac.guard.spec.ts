import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RbacGuard } from './rbac.guard';

describe('RbacGuard', () => {
  let guard: RbacGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RbacGuard(reflector);
  });

  it('should allow access if roles match', () => {
    const mockContext = createMockExecutionContext(['admin']);
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);

    const result = guard.canActivate(mockContext);
    expect(result).toBe(true);
  });

  it('should deny access if roles do not match', () => {
    const mockContext = createMockExecutionContext(['user']);
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);

    expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
  });

  function createMockExecutionContext(userRoles: string[]): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            roles: userRoles,
          },
        }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as any;
  }
});
