export default function companies(state = [], action) {
  switch(action.type) {
    case 'DELIVER_COMPANIES':
      return [ ...action.payload ]
    default:
      return state
  }
}
