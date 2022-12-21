export const getFullName = (
  lastName: string,
  firstName?: string,
  otherNames?: string
): string => {
  let assignedFullName = lastName

  if (firstName) {
    assignedFullName = `${lastName} ${firstName}`
  }

  if (otherNames) {
    assignedFullName = `${lastName} ${otherNames}`
  }

  if (firstName && otherNames) {
    assignedFullName = `${lastName} ${firstName} ${otherNames}`
  }

  return assignedFullName
}
