# opencode-usage-plugin

Plugin para OpenCode que muestra uso de tokens y costo en la sesión actual.

## Instalación

```bash
opencode plugin add github:cristiandavidcantillo/usage-opencode
```

## Uso

Ejecuta `opencode` normalmente. El plugin se carga automáticamente.

## Qué muestra

- **Footer**: `$costo | total tokens | total msg | tokens/turno`
- **Ctrl+U**: Abre/cerrar panel lateral con desglose completo (entrada/salida/total, costo USD, mensajes user/assistant, tokens/turno)