import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly keycloak: KeycloakService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (!this.keycloak.isLoggedIn()) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
