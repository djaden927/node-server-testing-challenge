const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

test('is the correct environment', () => {
  expect(process.env.DB_ENV).toBe('testing')
})
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
}) // migrate
beforeEach(async () => {
  await db.seed.run()
}) // truncate and seed fresh data
afterAll(async () => {
  await db.destroy()
}) // disconnect from the db

describe('endpoints work', () => {

  describe('[post] endpoints work', () => {
    test('posting to endpoint creates a hobbit with an incrementing id.', async () => {
      const res = await request(server).post('/hobbits').send({name: "jaden"})
      expect(res.body.id).toEqual(5)
    })

    test('posting to endpoint returns a hobbit', async () => {
      const res = await request(server).post('/hobbits').send({name: "jaden"})
      expect(res.body).toMatchObject({ name: "jaden", id: 5})
    })

    test('posting to endpoint returns a hobbit', async () => {
      const res = await request(server).post('/hobbits').send({name: "jaden"})
      expect(res.body).toMatchSnapshot()
    })
  })

    describe('[delete] endpoint ', () => {
      test('delete endpoint removes record from database', async () => {
        await request(server).delete('/hobbits/4')
        const result = await db('hobbits')
        expect(result).toHaveLength(3)
      })
      test('returns a 200 status code upon successfully deleting', async () => {
        const res = await request(server).delete('/hobbits/4')
        expect(res.status).toEqual(200)
      })
    })
})

