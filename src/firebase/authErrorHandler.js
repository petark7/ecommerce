export function handleAuthError(errorCode) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "The provided email is already in use by an existing user. Please use a different email.";
    case "auth/invalid-email":
      return "The provided email is invalid. Please enter a valid email address.";
    case "auth/invalid-password":
      return "The provided password is invalid. It must be a string with at least six characters.";
    case "auth/user-not-found":
      return "There is no existing user record corresponding to the provided identifier.";
    case "auth/wrong-password":
      return "The password is invalid or account doesn't exist.";
    case "auth/too-many-requests":
      return "Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.";
    case "auth/weak-password":
      return "The password is too weak. Use a mix of letters, numbers, and special characters. Length should be minimum 6 characters.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
}
