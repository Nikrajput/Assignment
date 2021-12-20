export const handleAuthError = (error) => {
  if (error.code === "auth/user-not-found") {
    return "User does not exist"
  }

  if (error.code === "auth/invalid-email") {
    return "Enter a valid email address"
  }

  if (error.code === "auth/wrong-password") {
    return "Invalid credentials"
  }
}