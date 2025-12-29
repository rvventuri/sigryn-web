# Google OAuth Setup

## Instalação

Execute o seguinte comando para instalar a dependência:

```bash
pnpm add @react-oauth/google
```

## Configuração

### 1. Variável de Ambiente

Adicione o Google Client ID ao seu arquivo `.env`:

```env
VITE_GOOGLE_CLIENT_ID=396371280970-81jm9r2f7bb1km8si7ijpfqnahqnsbl8.apps.googleusercontent.com
```

**Nota:** O Client ID já está configurado como fallback no código, mas é recomendado usar a variável de ambiente.

### 2. Backend API

O backend precisa implementar o endpoint `POST /auth/google` que recebe:

```json
{
  "credential": "JWT_TOKEN_FROM_GOOGLE"
}
```

E retorna:

```json
{
  "access_token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "phone": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Google Cloud Console

Certifique-se de que:

1. O Client ID está configurado no Google Cloud Console
2. As URLs autorizadas estão configuradas:
   - `http://localhost:5173` (desenvolvimento)
   - Sua URL de produção
3. O OAuth consent screen está configurado

## Uso

O botão "Continue with Google" já está integrado nas páginas de:
- `/sign-in` - Login
- `/sign-up` - Registro

O componente `GoogleAuthButton` pode ser usado em qualquer lugar da aplicação.

## Funcionalidades

- ✅ Login com Google
- ✅ Registro com Google
- ✅ Redirecionamento automático após autenticação
- ✅ Tratamento de erros
- ✅ Loading states
- ✅ Integração com o sistema de autenticação existente

