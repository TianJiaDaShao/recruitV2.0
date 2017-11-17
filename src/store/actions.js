export const actionAlert = ({ commit }) => {
  commit('actionAlert')
}
export const actionAlertSelect = ({ commit }) => {
  commit('actionAlertSelect')
}
export const login = ({ commit }, userId) => {
  commit('getIndex', userId)
}
export const actionCountry = ({ commit }, country) => {
  commit('actionCountry', country)
}
export const activeUserHead = ({ commit }, userHead) => {
  commit('activeUserHead', userHead)
}
export const activeUserName = ({ commit }, userName) => {
  commit('activeUserName', userName)
}
export const activeTel = ({ commit }, tel) => {
  commit('activeTel', tel)
}
export const actionMobileSelectStatus = ({ commit }, mobileSelectStatus) => {
  commit('actionMobileSelectStatus', mobileSelectStatus)
}
export const actionBirthYear = ({ commit }, birthYear) => {
  commit('actionBirthYear', birthYear)
}
export const actionBirthMonth = ({ commit }, birthMonth) => {
  commit('actionBirthMonth', birthMonth)
}
export const actionBirthDay = ({ commit }, birthDay) => {
  commit('actionBirthDay', birthDay)
}
export const actionActiveYear = ({ commit }, activeYear) => {
  commit('actionActiveYear', activeYear)
}
export const actionActiveMonth = ({ commit }, activeMonth) => {
  commit('actionActiveMonth', activeMonth)
}
export const actionEndYear = ({ commit }, endYear) => {
  commit('actionEndYear', endYear)
}
export const actionEndMonth = ({ commit }, endMonth) => {
  commit('actionEndMonth', endMonth)
}
export const actionCVCount = ({ commit }, CVCount) => {
  commit('actionCVCount', CVCount)
}
export const actionLoading = ({ commit }, loading) => {
  commit('actionLoading', loading)
}
export const actionInterested = ({ commit }, interested) => {
  commit('actionInterested', interested)
}
export const actionTishi = ({ commit }, tishi) => {
  commit('actionTishi', tishi)
}
