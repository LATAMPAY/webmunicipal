import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

type NotificationType = "success" | "error" | "info" | "warning"

interface NotificationProps {
  type: NotificationType
  title: string
  description?: string
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const styles = {
  success: "text-green-500",
  error: "text-red-500",
  info: "text-blue-500",
  warning: "text-yellow-500",
}

export function useNotification() {
  const { toast } = useToast()

  const showNotification = ({ type, title, description }: NotificationProps) => {
    const Icon = icons[type]

    toast({
      title: (
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${styles[type]}`} />
          <span>{title}</span>
        </div>
      ),
      description: description,
      variant: type === "success" ? "default" : "destructive",
    })
  }

  return {
    success: (title: string, description?: string) =>
      showNotification({ type: "success", title, description }),
    error: (title: string, description?: string) =>
      showNotification({ type: "error", title, description }),
    info: (title: string, description?: string) =>
      showNotification({ type: "info", title, description }),
    warning: (title: string, description?: string) =>
      showNotification({ type: "warning", title, description }),
  }
} 