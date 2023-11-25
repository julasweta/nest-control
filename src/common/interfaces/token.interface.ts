export interface TokenPayload {
  id: string;
  type: 'access' | 'refresh';
  iat?: number;
}
