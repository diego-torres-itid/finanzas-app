# Configuración de Autenticación

## ✅ Implementación Completa

Se ha implementado un sistema completo de gestión de autenticación con las siguientes características:

### 🔐 Características

1. **Persistencia de Sesión**
   - Los tokens se guardan automáticamente en AsyncStorage
   - La sesión se restaura al abrir la app
   - Auto-refresh de tokens cuando expiran

2. **Gestión de Estado Global**
   - Hook `useAuth` centralizado para acceder al estado de autenticación
   - Contexto `AuthProvider` que envuelve toda la app
   - Estado incluye: user, session, profile, loading, initialized

3. **Protección de Rutas Automática**
   - Usuarios no autenticados → redirigidos a `/welcome`
   - Usuarios autenticados → redirigidos a `/(tabs)`
   - Se ejecuta automáticamente en cada cambio de ruta

4. **Perfil de Usuario en Supabase**
   - Se crea automáticamente al hacer login
   - Guarda: email, nombre, foto de perfil
   - Se actualiza con datos de Google/Facebook/Apple

5. **Eventos de Autenticación**
   - Listener `onAuthStateChange` detecta todos los cambios
   - Maneja: SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, etc.

### 📁 Archivos Creados/Modificados

#### Nuevos Archivos:
- **`hooks/useAuth.tsx`**: Hook y contexto principal de autenticación
- **`types/auth.ts`**: Tipos TypeScript para autenticación
- **`supabase_profiles_table.sql`**: Script SQL para crear tabla en Supabase

#### Archivos Modificados:
- **`app/_layout.tsx`**: Envuelto con `AuthProvider`, muestra loading mientras inicializa
- **`app/auth.tsx`**: Usa el nuevo sistema (navegación automática)

### 🗄️ Base de Datos - Tabla `profiles`

Ejecuta el SQL en Supabase Dashboard > SQL Editor:

```sql
-- Ver archivo: supabase_profiles_table.sql
```

La tabla incluye:
- ✅ Row Level Security (RLS)
- ✅ Políticas de acceso seguras
- ✅ Trigger para crear perfil automáticamente
- ✅ Actualización automática de `updated_at`

### 🔧 Uso del Hook

```tsx
import { useAuth } from '@/hooks/useAuth';

function MiComponente() {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();

  if (loading) return <Loading />;

  return (
    <View>
      <Text>Email: {user?.email}</Text>
      <Text>Nombre: {profile?.full_name}</Text>
      <Button onPress={signOut} title="Cerrar Sesión" />
    </View>
  );
}
```

### 🚀 Flujo de Autenticación

1. **Usuario hace login con Google**
   - Se obtienen tokens OAuth
   - Se establece sesión en Supabase
   
2. **Hook detecta cambio (`onAuthStateChange`)**
   - Evento: `SIGNED_IN`
   - Busca perfil en tabla `profiles`
   - Si no existe, lo crea con datos de Google
   
3. **Actualiza estado global**
   - `user`: Datos del usuario de Supabase Auth
   - `profile`: Datos de la tabla `profiles`
   - `session`: Sesión activa con tokens
   
4. **Protección de rutas**
   - Usuario autenticado → navega a `/(tabs)`
   - Tokens se guardan en AsyncStorage
   
5. **Próximo inicio de app**
   - Se restaura sesión desde AsyncStorage
   - Se verifica validez de tokens
   - Si son válidos → usuario ya autenticado
   - Si expiraron → se refrescan automáticamente

### 📝 Próximos Pasos (Opcional)

- Implementar Facebook y Apple OAuth
- Agregar más campos al perfil (bio, preferencias, etc.)
- Crear pantalla de perfil editable
- Agregar verificación de email
- Implementar onboarding post-registro

### ⚠️ Importante

No olvides ejecutar el SQL en Supabase para crear la tabla `profiles` antes de probar el login.
