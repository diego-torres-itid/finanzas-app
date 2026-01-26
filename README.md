## 🛠 Tech Stack Completo

### Core & Estado
| Tecnología | Propósito |
| :--- | :--- |
| **Zustand** | Estado Global (Ligero). |
| **React Query** | Caché y Sincronización con Backend. |
| **Supabase** | Backend, Auth y Database. |
| **Expo Router** | Navegación basada en archivos. |

### UI & UX
| Tecnología | Propósito |
| :--- | :--- |
| **NativeWind** | Estilos (Tailwind CSS). |
| **Reanimated** | Animaciones fluidas (60fps) en el hilo nativo. |
| **Gesture Handler** | Gestos complejos (Swipes, Drags). |
| **Victory Native** | Gráficas y visualización de datos. |
| **Expo Image** | Carga de imágenes optimizada y caché. |

### Servicios e Integraciones
| Tecnología | Propósito |
| :--- | :--- |
| **RevenueCat** | Gestión de Suscripciones In-App. |
| **AdMob** | Monetización con anuncios. |
| **Mixpanel** | Analíticas de uso de usuario. |
| **Sentry** | Monitoreo de errores y crasheos en tiempo real. |
| **Expo Notifications** | Notificaciones Push. |

---

## ⚙️ Configuración Especial (Setup)

Este proyecto utiliza librerías que requieren configuración nativa o variables de entorno.

### 1. Variables de Entorno (.env)
Asegúrate de tener las siguientes llaves:
```bash
# Supabase
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...

# Sentry (Error Tracking)
SENTRY_DSN=...

# RevenueCat (Pagos)
EXPO_PUBLIC_RC_API_KEY_IOS=...
EXPO_PUBLIC_RC_API_KEY_ANDROID=...