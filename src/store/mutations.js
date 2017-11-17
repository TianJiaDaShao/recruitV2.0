export const actionAlert = (state) => {
  state.alert = !state.alert
}
export const actionAlertSelect = (state) => {
  state.alertSelect = !state.alertSelect
}
export const getIndex = (state, userId) => {
  state.userId = userId
}
export const actionCountry = (state, country) => {
  state.country = country
  state.alert = !state.alert
}
export const activeUserHead = (state, userHead) => {
  state.userHead = userHead
}
export const activeUserName = (state, userName) => {
  state.userName = userName
}
export const activeTel = (state, tel) => {
  state.tel = tel
}
export const actionMobileSelectStatus = (state, mobileSelectStatus) => {
  state.mobileSelectStatus = mobileSelectStatus
}
export const actionBirthYear = (state, birthYear) => {
  state.birthYear = birthYear
}
export const actionBirthMonth = (state, birthMonth) => {
  state.birthMonth = birthMonth
}
export const actionBirthDay = (state, birthDay) => {
  state.birthDay = birthDay
}
export const actionActiveYear = (state, activeYear) => {
  state.activeYear = activeYear
}
export const actionActiveMonth = (state, activeMonth) => {
  state.activeMonth = activeMonth
}
export const actionEndYear = (state, endYear) => {
  state.endYear = endYear
}
export const actionEndMonth = (state, endMonth) => {
  state.endMonth = endMonth
}
export const actionCVCount = (state, CVCount) => {
  state.CVCount = CVCount
}
export const actionLoading = (state, loading) => {
  state.loading = loading
}
export const actionInterested = (state, interested) => {
  state.interested = interested
}
export const actionTishi = (state, tishi) => {
  state.tishi = tishi
}
