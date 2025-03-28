import { rest } from 'msw'

export const handlers = [
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  }),
  rest.post('/api/auth/register', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  }),
  rest.get('/api/user/profile', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: '1',
        name: 'Test User',
        email: 'test@example.com'
      })
    )
  })
]