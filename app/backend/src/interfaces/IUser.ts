interface IUser {
  findByEmail(email: string, password: string): Promise<string>;
  findByRole(authorization: string): string;
}

export default IUser;
