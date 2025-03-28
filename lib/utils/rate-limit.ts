import { Redis } from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible'

const redisClient = new Redis(process.env.REDIS_URL!)

interface RateLimitOptions {
  points: number      // Número de intentos permitidos
  duration: number    // Duración en segundos
}

export const rateLimit = {
  async checkLimit(
    key: string,
    action: string,
    options: RateLimitOptions
  ): Promise<boolean> {
    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: `ratelimit:${action}`,
      points: options.points,
      duration: options.duration
    })

    try {
      await limiter.consume(key)
      return false // No bloqueado
    } catch (error) {
      return true // Bloqueado
    }
  },

  async getRemainingAttempts(
    key: string,
    action: string,
    options: RateLimitOptions
  ): Promise<number> {
    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: `ratelimit:${action}`,
      points: options.points,
      duration: options.duration
    })

    try {
      const rateLimitRes = await limiter.get(key)
      return options.points - rateLimitRes.consumedPoints
    } catch {
      return options.points
    }
  },

  async resetLimit(
    key: string,
    action: string
  ): Promise<void> {
    await redisClient.del(`ratelimit:${action}:${key}`)
  }
} 