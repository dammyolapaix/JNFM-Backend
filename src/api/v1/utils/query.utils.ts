const getQueryStr = (query: Object): string => {
  const reqQuery = { ...query }

  let queryStr = JSON.stringify(query)

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|eq|in)\b/g,
    (match) => `$${match}`
  )

  // Fields to exclude in the query
  const removeFields = ['select', 'sort', 'page', 'limit']
  removeFields.forEach((field) => delete reqQuery[field])

  return queryStr
}

export default getQueryStr
