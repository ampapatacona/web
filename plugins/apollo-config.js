export default ({ store }) => {
  return {
    httpEndpoint: process.env.GRAPH_HTTP_ENDPOINT,

    wsEndpoint: process.env.GRAPH_WS_ENDPOINT,
    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    getAuth: () => {
      const token = store.state.token
      // console.log('token en la creació del endpoint', token)
      return `Bearer ${token}`
    }
  }
}
