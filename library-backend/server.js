const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const jwt = require('jsonwebtoken')

const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const User = require('./models/user')

const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null
  }

  try {
    const decodedToken = jwt.verify(
      auth.substring(7),
      process.env.JWT_SECRET
    )

    console.log('Decoded token:', decodedToken)

    const user = await User.findById(decodedToken.id)

    console.log('User from DB:', user)

    return user
  } catch (error) {
    console.log("JWT ERROR:", error.message)
    return null
  }
}

const startServer = (port) => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    startStandaloneServer(server, {
      listen: { port: 4000 },
        context: async ({ req }) => {
          //console.log(req.headers.authorization)
          const auth = req.headers.authorization
          const currentUser = await getUserFromAuthHeader(auth)
          //console.log(currentUser)
          console.log("Context returning:", currentUser)
          return { currentUser }
      },
    }).then(({ url }) => {
      console.log(`Server ready at ${url}`)
    })
}

module.exports = startServer