
 // Handling axios errors and returning messages to the user
export function getErrorMessage(error: unknown, defaultMessage: string = 'An error occurred. Please try again.'): string {
  // Check if it's an axios error with response data
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as {
      response?: {
        status?: number
        data?: {
          message?: string
        }
      }
    }

    // Handle 401 Unauthorized for actions that require authentication
    if (axiosError.response?.status === 401) {
      return 'You must be logged in to perform this action.'
    }

    // Handle server error messages
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message
    }
  }

  // Check if it's a standard Error object
  if (error instanceof Error) {
    return error.message
  }
  return defaultMessage
}
