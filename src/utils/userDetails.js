export function getStoredUserDetails() {
  const storedUserDetails = localStorage.getItem("userDetails");

  if (!storedUserDetails || storedUserDetails === "undefined") {
    localStorage.removeItem("userDetails");
    return null;
  }

  try {
    return JSON.parse(storedUserDetails);
  } catch (error) {
    console.error("Invalid user details in localStorage:", error);
    localStorage.removeItem("userDetails");
    return null;
  }
}
