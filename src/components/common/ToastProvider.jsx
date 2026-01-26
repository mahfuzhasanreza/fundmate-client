import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { CheckCircle, XCircle, Info } from 'lucide-react'

const ToastContext = createContext(null)

const typeStyles = {
  success: {
    icon: CheckCircle,
    container: 'bg-green-50 border-green-200 text-green-800',
    iconColor: 'text-green-600'
  },
  error: {
    icon: XCircle,
    container: 'bg-red-50 border-red-200 text-red-800',
    iconColor: 'text-red-600'
  },
  info: {
    icon: Info,
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    iconColor: 'text-blue-600'
  }
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), duration)
  }, [removeToast])

  const value = useMemo(() => ({ addToast }), [addToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        {toasts.map((toast) => {
          const styles = typeStyles[toast.type] || typeStyles.info
          const Icon = styles.icon
          return (
            <div
              key={toast.id}
              className={`flex items-center gap-3 border px-4 py-3 rounded-xl shadow-lg ${styles.container}`}
            >
              <Icon className={`h-5 w-5 ${styles.iconColor}`} />
              <span className="text-sm font-semibold">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-xs opacity-70 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
