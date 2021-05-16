import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User'

class SessionController {
  async store(request, response) {
    const { email, password } = request.body

    const user = await User.findOne({ email })

    if (!user) {
      return response.status(401).json({ error: 'User is not registered.' })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return response.status(401).json({ error: 'Invalid password.' })
    }

    const { id, name } = user

    return response.status(200).json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      }),
    })
  }
}

export default new SessionController()
