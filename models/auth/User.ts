export type Role = 'Admin' | 'Mod';

export interface UserData {
  userName?: string;
  roles: Role[];
}

export class User {
  public userName: string;
  public roles: Role[];

  constructor(user: UserData) {
    this.userName = user.userName!;
    this.roles = user.roles;
  }

  public is(role: Role) {
    return this.roles.includes(role);
  }

  public get isAdmin() {
    return this.is('Admin');
  }

  public get isMod() {
    return this.is('Mod');
  }
}
