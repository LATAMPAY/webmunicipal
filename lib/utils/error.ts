import { toast } from '@/components/ui/use-toast'

export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public status: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const handleError = (error: unknown) => {
  console.error('Error:', error)
  
  if (error instanceof AppError) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: error.message
    })
    return error
  }

  if (error instanceof Error) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: error.message || 'Ha ocurrido un error inesperado'
    })
    return new AppError(error.message)
  }

  const message = 'Ha ocurrido un error inesperado'
  toast({
    variant: 'destructive',
    title: 'Error',
    description: message
  })
  return new AppError(message)
}

export const createErrorResponse = (error: unknown) => {
  const appError = handleError(error)
  return Response.json(
    { error: appError.message },
    { status: appError instanceof AppError ? appError.status : 500 }
  )
}