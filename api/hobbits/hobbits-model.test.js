const db = require('../../data/dbConfig')
const Hobbit = require('./hobbits-model')

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

describe('hobbits model', () => {
    describe('insert', () => {
        
        it('adds a hobbit to database', async () => {
            await Hobbit.insert({name: 'jaden'})
            const newHobbit = await db('hobbits').where('id', 5).first()
            expect(newHobbit).toMatchObject({ id: 5, name: 'jaden'})
        })

        it('returns a new hobbit', async () => {
            const inserted = await Hobbit.insert({ name: 'donovan'})
            expect(inserted).toMatchObject({ id: 5, name: 'donovan'})
        })

    })
    describe('delete', () => {

        it('deletes a hobbit from the database', async () => {
            await Hobbit.remove(4)
            const result = await db('hobbits')
            expect(result).toHaveLength(3)
        })

        it('matches the snapshot', async () => {
            await Hobbit.remove(4)
            const result = await db('hobbits')
            expect(result).toMatchSnapshot()
        })

    })
})


