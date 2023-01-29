import {
  getPaginationOptions,
  getPaginationResult,
  getQueryStr,
} from '../../utils'
import { IAttendance } from '../attendance'
import { IDepartment } from '../department'
import { IBaseMember, IMember, IMemberQuery, Member } from './index'

export const getMembers = (query?: IMemberQuery) => {
  if (query) {
    return Member.find(query)
  } else {
    return Member.find()
  }
}

export const getSingleMemberById = (memberId: IMember['_id']) => {
  return Member.findById(memberId)
}

export const addMember = (member: IBaseMember) => {
  return Member.create(member)
}

export const editMember = (memberId: IMember['_id'], member: IBaseMember) => {
  return Member.findByIdAndUpdate(memberId, member, {
    new: true,
    runValidators: true,
  })
}

export const deleteMember = (memberId: IMember['_id']) => {
  return Member.findByIdAndDelete(memberId)
}

const countMemberDocument = () => Member.countDocuments()

export const getMemberQueryResults = async (memberQuery: IMemberQuery) => {
  let query
  if (memberQuery && Object.keys(memberQuery).length > 0) {
    if (memberQuery.fullName) {
      // @ts-ignore
      memberQuery.fullName = { $regex: memberQuery.fullName, $options: 'i' }
    }

    const queryStr = getQueryStr(memberQuery)

    query = getMembers(JSON.parse(queryStr))
      .populate<{
        attendances: IAttendance[]
      }>({
        path: 'attendances',
        model: 'Attendance',
      })
      .populate<{
        departments: IDepartment[]
      }>({
        path: 'departments',
        model: 'Department',
      })
  } else {
    query = getMembers()
      .populate<{
        attendances: IAttendance[]
      }>({
        path: 'attendances',
        model: 'Attendance',
      })
      .populate<{
        departments: IDepartment[]
      }>({
        path: 'departments',
        model: 'Department',
      })
  }

  // Selecting specific field(s)
  if (memberQuery && memberQuery.select) {
    const fields = memberQuery.select.split(',').join(' ')
    query = query.select(fields)
  }

  // Sort by field(s)
  if (memberQuery && memberQuery.sort) {
    const sortedBy = memberQuery.sort.split(',').join(' ')
    query = query.sort(sortedBy)
  } else {
    query = query.sort('-fullName')
  }

  // Pagination
  let paginationOptions
  if (memberQuery.page) {
    paginationOptions = getPaginationOptions(memberQuery.page)
  }
  if (memberQuery.limit) {
    paginationOptions = getPaginationOptions(undefined, memberQuery.limit)
  }
  if (memberQuery.page && memberQuery.limit) {
    paginationOptions = getPaginationOptions(
      memberQuery.page,
      memberQuery.limit
    )
  }
  if (!memberQuery.page && !memberQuery.limit) {
    paginationOptions = getPaginationOptions()
  }

  const { page, limit, startIndex, endIndex } = paginationOptions

  query = query.skip(startIndex).limit(limit)

  const members: IMember[] = await query

  const totalDocument = await countMemberDocument()

  const pagination = getPaginationResult(
    page,
    limit,
    startIndex,
    endIndex,
    totalDocument
  )

  return { members, pagination }
}
