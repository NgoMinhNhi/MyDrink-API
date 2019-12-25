/**
 * Send data
 */
export function sendData(listSockets, msg, data, listExpect = []) {
  listSockets.map(s => {
    if (!listExpect.includes(s.myself.userId)) {
      setTimeout(function () {
        s.emit(msg, data)
      }, 200);
    }
  })
}
