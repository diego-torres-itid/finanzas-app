# 🗺️ ROADMAP - FINANZAS MX APP

**Proyecto:** App de Microlearning Financiero para México  
**Duración:** 5 meses (Part-time)  
**Stack:** React Native (Expo) + Supabase + NativeWind  
**Target:** Jóvenes 22-30 años, México  

---

## 📊 VISIÓN GENERAL

| Mes | Objetivo Principal | Entregable | Status |
|-----|-------------------|------------|--------|
| **Mes 1** | Fundación técnica + Primera lección | App funcional con autenticación | ⏳ En progreso |
| **Mes 2** | Sistema de lecciones + Gamificación | Módulo 1 completo (10 lecciones) | 🔜 Pendiente |
| **Mes 3** | Simuladores + Contenido premium | 20 lecciones + 3 simuladores | 🔜 Pendiente |
| **Mes 4** | Polish + Beta Testing | App lista para usuarios beta | 🔜 Pendiente |
| **Mes 5** | Monetización + Lanzamiento | App en producción con freemium | 🔜 Pendiente |

---

# 📅 MES 1: FUNDACIÓN + ONBOARDING

**Objetivo:** Crear la base técnica y primera experiencia funcional

## Semana 1-2: Setup Técnico ⚙️

### Tareas
- [x] Configurar proyecto React Native + Expo
- [x] Configurar Supabase (auth + database)
- [ ] Diseñar sistema de componentes base
  - [ ] Definir paleta de colores (verde #22c55e como principal)
  - [ ] Tipografía (fuentes, tamaños)
  - [ ] Componentes reutilizables básicos
- [ ] Setup de repositorio en GitHub
  - [x] Crear repo privado
  - [ ] Configurar `.gitignore`
  - [x] Primer commit

### Componentes a crear
```
components/ui/
├── Button.tsx          (Botón principal)
├── Input.tsx           (Input de texto)
├── Card.tsx            (Tarjeta genérica)
└── LoadingSpinner.tsx  (Indicador de carga)
```

### Notas técnicas
- **Colores principales:**
  - Primary: `#1A1A1A` (negro)
  - Secondary: `#22C55E` (verde)
  - Background: `#ffffff`
  - Text: `#1A1A1A`
- **Fuentes:** Inter

---

## Semana 3-4: MVP Core 🔐

### Tareas
- [ ] **Sistema de autenticación**
  - [ ] Pantalla de Login
  - [ ] Pantalla de Register
  - [ ] Recuperación de contraseña
  - [ ] Validación de formularios
  - [ ] Manejo de errores  

- [ ] **Onboarding flow**
  - [ ] Pantalla 1: "¿A dónde se va tu dinero?"
  - [ ] Pantalla 2: "Aprende en 5 minutos"
  - [ ] Pantalla 3: "Controla tu futuro"
  - [ ] Sistema de skip/navegación  

- [ ] **Estructura de lecciones básica**
  - [ ] Modelo de datos en Supabase
  - [ ] Query para obtener lecciones
  - [ ] Navegación dinámica  

- [ ] **Primera lección funcional**
  - [ ] Renderizar contenido (texto + imagen)
  - [ ] Sistema de scroll
  - [ ] Botón "Completar lección"
  - [ ] Actualizar progreso en DB

### Pantallas creadas
```
app/
├── (auth)/
│   ├── login.tsx        ✅ Login
│   ├── register.tsx     ✅ Register
│   └── forgot.tsx       ✅ Recuperar contraseña
├── onboarding.tsx       ✅ Onboarding (3 slides)
└── lesson/[id].tsx      ✅ Vista de lección
```

### Testing
- [ ] Login exitoso guarda sesión
- [ ] Register crea usuario en Supabase
- [ ] Onboarding se muestra solo primera vez
- [ ] Lección marca como completada

### Entregable Mes 1
- ✅ App con login funcional  
- ✅ 1 lección completa renderizada  
- ✅ Guardado de progreso en Supabase  
- ✅ Navegación básica funcionando  

---

# 📅 MES 2: SISTEMA DE LECCIONES + GAMIFICACIÓN

**Objetivo:** Contenido educativo completo y engagement

## Semana 1-2: Contenido + Progreso 📚

### Tareas
- [ ] **Escribir 10 lecciones (Módulo 1: Fundamentos)**
  - [ ] L1: ¿Por qué el dinero no me alcanza?
  - [ ] L2: La inflación en México
  - [ ] L3: El efecto latte (gastos hormiga)
  - [ ] L4: Ingresos vs Gastos
  - [ ] L5: El método de los sobres digital
  - [ ] L6: La regla 50/30/20
  - [ ] L7: Cómo rastrear tus gastos
  - [ ] L8: Apps de bancos digitales (Nu, Mercado Pago)
  - [ ] L9: [SIMULADOR] Crea tu presupuesto
  - [ ] L10: [QUIZ] Evaluación Módulo 1

- [ ] **Diseñar cada lección**
  - [ ] Buscar/crear ilustraciones
  - [ ] Formatear contenido (JSONB en Supabase)
  - [ ] Insertar en base de datos  

- [ ] **Sistema de progreso**
  - [ ] Barra de progreso por módulo
  - [ ] Porcentaje completado
  - [ ] Lecciones bloqueadas/desbloqueadas
  - [ ] Checkmarks visuales  

- [ ] **Sistema de rachas (streaks)**
  - [ ] Contador de días consecutivos
  - [ ] Guardar actividad diaria en `user_streaks`
  - [ ] Racha actual vs racha más larga
  - [ ] Animación cuando aumenta

### Componentes nuevos
```
components/
├── LessonCard.tsx       (Tarjeta de lección en lista)
├── ProgressBar.tsx      (Barra de progreso)
├── StreakCounter.tsx    (Contador de rachas con 🔥)
└── ModuleHeader.tsx     (Header de módulo)
```

### Estructura de contenido JSONB
```json
{
  "blocks": [
    {
      "type": "heading",
      "content": "¿Qué es la inflación?"
    },
    {
      "type": "text",
      "content": "La inflación es el aumento sostenido..."
    },
    {
      "type": "image",
      "url": "https://...",
      "alt": "Gráfica de inflación"
    },
    {
      "type": "highlight",
      "content": "En México, la inflación promedio es del 4% anual"
    },
    {
      "type": "example",
      "title": "Ejemplo práctico",
      "content": "Si hoy gastas $100 en despensa..."
    }
  ]
}
```

---

## Semana 3-4: Gamificación 🎮

### Tareas
- [ ] **Sistema de puntos/XP**
  - [ ] +10 XP por completar lección
  - [ ] +20 XP por aprobar quiz
  - [ ] Bonus x2 los domingos (motivar fin de semana)
  - [ ] Total de XP acumulado en perfil
  - [ ] Animación al ganar XP  

- [ ] **Quiz interactivo**
  - [ ] Componente de pregunta múltiple opción
  - [ ] Feedback inmediato (correcto/incorrecto)
  - [ ] Score al final (% de aciertos)
  - [ ] Opción de reintentar
  - [ ] Guardar mejor score en DB  

- [ ] **Notificaciones push básicas**
  - [ ] Setup de Expo Notifications
  - [ ] Recordatorio diario configurable
  - [ ] Mensaje: "¡No pierdas tu racha de X días!"
  - [ ] Configurar hora preferida en settings  

- [ ] **Pantalla de perfil con estadísticas**
  - [ ] Avatar (iniciales o imagen)
  - [ ] Nombre de usuario
  - [ ] XP total con barra de nivel
  - [ ] Racha actual/más larga
  - [ ] Lecciones completadas (X/30)
  - [ ] Tiempo total invertido (estimado)

### Componentes nuevos
```
components/
├── QuizQuestion.tsx     (Pregunta de quiz)
├── XPAnimation.tsx      (Animación de +10 XP)
├── StatCard.tsx         (Tarjeta de estadística)
└── AvatarUpload.tsx     (Avatar del usuario)
```

### Entregable Mes 2
- ✅ 10 lecciones completas con contenido real  
- ✅ Sistema de progreso funcionando  
- ✅ Rachas guardándose correctamente  
- ✅ Quiz funcional al final del módulo  
- ✅ Notificaciones básicas configuradas  
- ✅ Perfil con stats completo  

---

# 📅 MES 3: SIMULADORES + CONTENIDO PREMIUM

**Objetivo:** Herramientas prácticas y modelo de negocio

## Semana 1-2: Simuladores Financieros 🧮

### Tareas
- [ ] **Calculadora de presupuesto 50/30/20**
  - [ ] Input de ingreso mensual
  - [ ] Cálculo automático (50% Necesidades, 30% Deseos, 20% Ahorro)
  - [ ] Gráfica de pastel (Victory Native)
  - [ ] Opción de guardar presupuesto  

- [ ] **Simulador de ahorro (metas)**
  - [ ] Input: Meta ($10,000 MXN)
  - [ ] Input: Plazo (6 meses)
  - [ ] Cálculo de ahorro mensual necesario
  - [ ] Tracking de progreso actual
  - [ ] Gráfica de proyección  

- [ ] **Simulador de interés compuesto**
  - [ ] Capital inicial
  - [ ] Aporte mensual
  - [ ] Tasa de interés anual (%)
  - [ ] Plazo (años)
  - [ ] Gráfica de crecimiento
  - [ ] Comparación ahorro vs inversión

### Componentes nuevos
```
components/
├── PieChart.tsx         (Gráfica de pastel)
├── LineChart.tsx        (Gráfica de líneas)
├── Calculator.tsx       (Calculadora base)
├── GoalTracker.tsx      (Seguimiento de meta)
└── CurrencyInput.tsx    (Input para MXN)
```

---

## Semana 3-4: Contenido Premium 💎

### Tareas
- [ ] **Escribir 10 lecciones nuevas (Módulo 2)**
  - [ ] L11: El fondo de emergencia (GRATIS)
  - [ ] L12: Págate primero (GRATIS)
  - [ ] L13: Cuentas de ahorro en México (GRATIS)
  - [ ] L14: El reto de las 52 semanas (GRATIS)
  - [ ] L15: Ahorro vs Inversión ⭐ PREMIUM
  - [ ] L16: La inflación destruye tu dinero ⭐ PREMIUM
  - [ ] L17: [SIMULADOR] Fondo de emergencia ⭐ PREMIUM
  - [ ] L18: Metas SMART ⭐ PREMIUM
  - [ ] L19: Salario variable ⭐ PREMIUM
  - [ ] L20: [QUIZ] Evaluación Módulo 2 ⭐ PREMIUM  

- [ ] **Simulador de deuda (tarjetas)**
  - [ ] Input: Deuda actual
  - [ ] Input: Tasa de interés (CAT %)
  - [ ] Cálculo: Tiempo para liquidar
  - [ ] Comparación: Pago mínimo vs Pago fijo  

- [ ] **Sistema de contenido bloqueado**
  - [ ] Candado en lecciones premium
  - [ ] Banner "Desbloquear con Premium"
  - [ ] Preview de contenido

### Componentes nuevos
```
components/
├── PremiumBanner.tsx    (Banner de upgrade)
├── LockedLesson.tsx     (Lección bloqueada)
└── DebtCalculator.tsx   (Calculadora de deuda)
```

### Entregable Mes 3
- ✅ 20 lecciones totales  
- ✅ 3 simuladores funcionales  
- ✅ Sistema premium/gratis  
- ✅ Visualizaciones con gráficas  

---

# 📅 MES 4: POLISH + BETA TESTING

**Objetivo:** Refinamiento y validación

## Semana 1-2: UI/UX Refinamiento ✨

### Tareas
- [ ] **Mejoras visuales**
  - [ ] Micro-animaciones
  - [ ] Transiciones suaves
  - [ ] Skeleton loaders
  - [ ] Estados vacíos
  - [ ] Mensajes de error amigables  

- [ ] **Sistema de logros/badges**
  - [ ] Crear 15 logros
  - [ ] Notificación al desbloquear
  - [ ] Galería en perfil  

- [ ] **Modo oscuro**
  - [ ] Paleta dark
  - [ ] Toggle en settings
  - [ ] Persistir preferencia  

- [ ] **Mejoras de performance**
  - [ ] Lazy loading
  - [ ] Optimizar queries
  - [ ] Reducir re-renders

### Componentes nuevos
```
components/
├── Achievement.tsx      (Logro desbloqueado)
├── Skeleton.tsx         (Loading)
├── EmptyState.tsx       (Estado vacío)
└── ThemeToggle.tsx      (Dark mode switch)
```

---

## Semana 3-4: Beta Testing 🧪

### Tareas
- [ ] **Reclutar 20-30 beta testers**
  - [ ] Amigos/familia
  - [ ] Grupos Facebook
  - [ ] Reddit r/MexicoFinanciero
  - [ ] Twitter/X  

- [ ] **Implementar analytics**
  - [ ] Instalar Mixpanel
  - [ ] Trackear eventos clave
  - [ ] Dashboard de métricas  

- [ ] **Corrección de bugs**
  - [ ] Priorizar bugs críticos
  - [ ] Crear issues en GitHub
  - [ ] Fix iterativo  

- [ ] **Onboarding mejorado**
  - [ ] Ajustar según feedback
  - [ ] Personalización inicial

### Entregable Mes 4
- ✅ UI pulida y profesional  
- ✅ Sistema de logros  
- ✅ 20+ beta testers  
- ✅ Analytics implementado  
- ✅ Bugs corregidos  

---

# 📅 MES 5: MONETIZACIÓN + LANZAMIENTO

**Objetivo:** Generar revenue y escalar

## Semana 1-2: Implementar Paywall 💰

### Tareas
- [ ] **Configurar RevenueCat**
  - [ ] Crear cuenta
  - [ ] Configurar productos:
    - Plan Mensual: $99 MXN/mes
    - Plan Anual: $899 MXN/año (25% off)
  - [ ] Integrar SDK
  - [ ] Testear compras sandbox  

- [ ] **Diseñar pantalla paywall**
  - [ ] Lista de beneficios premium
  - [ ] Comparación Free vs Premium
  - [ ] CTA atractivo
  - [ ] Garantía 7 días  

- [ ] **Integrar anuncios (tier gratis)**
  - [ ] AdMob setup
  - [ ] Banner en Home
  - [ ] Interstitial ocasional  

- [ ] **Crear lecciones premium avanzadas**
  - [ ] Módulo 3: Inversión (todo premium)
  - [ ] 5-10 lecciones exclusivas

---

## Semana 3-4: Lanzamiento 🚀

### Tareas
- [ ] **Crear assets de tienda**
  - [ ] Ícono 1024x1024
  - [ ] 5-8 screenshots
  - [ ] Preview video 30s
  - [ ] Descripción optimizada (ASO)  

- [ ] **Keywords (ASO)**
  - finanzas personales
  - educación financiera
  - ahorro México
  - inversión
  - presupuesto  

- [ ] **Landing page web**
  - [ ] Hero + CTA descarga
  - [ ] Features principales
  - [ ] Testimonios
  - [ ] FAQ
  - [ ] Blog con lecciones gratis  

- [ ] **Publicar en Google Play Store**
  - [ ] Crear cuenta desarrollador ($25 USD)
  - [ ] Subir AAB
  - [ ] Rellenar metadata
  - [ ] Submit para review  

- [ ] **Marketing inicial**
  - [ ] Twitter/X (thread)
  - [ ] Reddit r/MexicoFinanciero
  - [ ] Facebook grupos
  - [ ] TikTok (3-5 videos)
  - [ ] LinkedIn  

- [ ] **Programa de referidos**
  - [ ] Códigos únicos
  - [ ] Reward: 1 semana premium
  - [ ] Tracking en DB

### Entregable Mes 5
- ✅ App en Google Play Store  
- ✅ Suscripciones funcionando  
- ✅ 100+ descargas semana 1  
- ✅ Landing page live  
- ✅ Marketing activo  
- ✅ Métricas en tiempo real  

---

# 📊 MÉTRICAS DE ÉXITO

## KPIs - Primer Mes Post-Lanzamiento

| Métrica | Meta | Crítico | Bueno | Excelente |
|---------|------|---------|-------|-----------|
| **Descargas totales** | 500-1000 | < 200 | 500-800 | 1000+ |
| **DAU** | 50-100 | < 30 | 50-80 | 100+ |
| **Retención día 1** | 40% | < 25% | 40-50% | 60%+ |
| **Retención día 7** | 20% | < 10% | 20-30% | 40%+ |
| **Retención día 30** | 10% | < 5% | 10-15% | 20%+ |
| **Conversión premium** | 2-5% | < 1% | 2-3% | 5%+ |
| **Revenue mensual** | $1K-5K MXN | < $500 | $1K-3K | $5K+ |
| **Suscriptores** | 10-25 | < 5 | 10-20 | 25+ |

---

# 🛠️ STACK TECNOLÓGICO

```
📱 FRONTEND
├── React Native (Expo SDK 52+)
├── TypeScript
├── NativeWind (Tailwind CSS)
├── Expo Router
├── Zustand
└── React Query

🔐 BACKEND
├── Supabase
│   ├── PostgreSQL
│   ├── Auth
│   ├── Storage
│   └── Edge Functions

💰 MONETIZACIÓN
├── RevenueCat
└── AdMob

📊 ANALYTICS
├── Mixpanel
└── Sentry

🔔 NOTIFICACIONES
└── Expo Notifications + FCM

🚀 DEPLOYMENT
├── EAS Build
├── EAS Submit
└── Expo Updates
```

---

# 💡 PLAN DE CONTINGENCIA

## Prioridad ALTA (Must Have)
- ✅ Login/Register
- ✅ 10 lecciones mínimo
- ✅ Progreso básico
- ✅ 1 simulador
- ✅ Paywall funcional

## Prioridad MEDIA (Should Have)
- ⚠️ Rachas y gamificación
- ⚠️ Modo oscuro
- ⚠️ Logros
- ⚠️ 3 simuladores

## Prioridad BAJA (Nice to Have)
- 💭 Landing elaborada
- 💭 Marketing paid
- 💭 Referidos
- 💭 iOS (Android primero)

---

# 🎯 RESUMEN EJECUTIVO

**Visión:** La app #1 de educación financiera en México

**Misión:** Ayudar a 10,000 jóvenes a mejorar sus finanzas en año 1

**Objetivo revenue año 1:** $50K - $100K MXN

**Modelo:** Freemium + Ads

**Ventaja competitiva:**
- ✅ Contenido adaptado a México
- ✅ Microlearning (5 min/día)
- ✅ Gamificación
- ✅ Simuladores prácticos
- ✅ Precio accesible ($99 MXN/mes)

**Riesgos:**
- ⚠️ Baja retención (mitiga: gamificación)
- ⚠️ Poca conversión (mitiga: contenido calidad)
- ⚠️ Competencia (mitiga: enfoque mexicano)

---

**Última actualización:** 2026-01-26 01:26:37  
**Versión:** 1.0  
**Autor:** Diego Torres

---

✅ **ROADMAP COMPLETO - FINANZAS MX APP**