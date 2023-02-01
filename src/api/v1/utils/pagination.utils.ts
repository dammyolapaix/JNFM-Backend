export const getPaginationOptions = (
  reqQuerypage?: string,
  reqQuerylimit?: string
) => {
  let page: number = 1
  let limit: number = 50

  if (reqQuerypage) {
    page = parseInt(reqQuerypage, 10)
  }
  if (reqQuerylimit) {
    limit = parseInt(reqQuerylimit, 10)
  }
  const startIndex: number = (page - 1) * limit
  const endIndex: number = page * limit

  return { page, limit, startIndex, endIndex }
}

export const getPaginationResult = (
  page: number,
  limit: number,
  startIndex: number,
  endIndex: number,
  totalDocument: number
) => {
  const pagination = {}
  if (endIndex < totalDocument) {
    // @ts-ignore
    pagination.next = {
      page: page + 1,
      limit,
    }
  }
  if (startIndex > 0) {
    // @ts-ignore
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  return pagination
}
