export default function users(state = [], action) {
  switch(action.type) {
    case 'DELIVER_USERS':
      return [ ...action.payload ]
    default:
      return state
  }
}
