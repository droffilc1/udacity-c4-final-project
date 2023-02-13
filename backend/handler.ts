'use strict'

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      { message: 'Function executed', input: event },
      null,
      2
    )
  }
}
