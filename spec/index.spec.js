import CohortManager, { Cohort, Student } from '../src/index.js'
import { students } from '../src/students.js'

describe('CohortManager', () => {
  let cohortManager
  let cohort
  let student

  beforeEach(() => {
    cohortManager = new CohortManager()
    cohort = new Cohort()
    student = new Student()
  })
  it('should create a new cohort', () => {
    const expected = cohortManager.create('Cohort 12')
    expect(expected).toBeInstanceOf(Cohort)
    expect(expected.cohortName).toBe('Cohort 12')
  })
  it('should search cohort by name', () => {
    cohortManager.create('Cohort 10')
    cohortManager.create('Cohort 11')
    cohortManager.create('Cohort 12')

    expect(cohortManager.search('Cohort 12').cohortName).toBe('Cohort 12')
  })
  it('should throw an error if the cohort does not exist', () => {
    expect(() => cohortManager.search('Cohort 13')).toThrow('Cohort not found')
  })
  it('should create a new student and add it to the cohort', () => {
    const expected = cohort.add(
      'Troy',
      'McClure',
      'tmcclure',
      'tmcclure@hollywood.org'
    )
    const result = new Student(
      1,
      'Troy',
      'McClure',
      'tmcclure',
      'tmcclure@hollywood.org'
    )
    expect(expected).toBeInstanceOf(Student)
    expect(expected).toEqual(result)
  })
  it('should get all cohorts', () => {
    cohortManager.create('Cohort 11')
    cohortManager.create('Cohort 12')
    cohortManager.create('Cohort 13')

    const expected = cohortManager.getAll()
    expect(expected.length).toBe(3)
  })
  it('should get all students in the cohort', () => {
    cohort.add('Troy', 'McClure', 'tmcclure', 'tmcclure@hollywood.org')
    cohort.add('Sideshow', 'Bob', 'sidebob', 'bob@krustyproductions.org')
    const expected = cohort.getAll()
    expect(expected.length).toBe(2)
  })
  it('should remove a cohort by name from the list', () => {
    cohortManager.create('Cohort 11')
    cohortManager.create('Cohort 12')
    cohortManager.create('Cohort 13')

    const result = [new Cohort('Cohort 11'), new Cohort('Cohort 12')]

    expect(cohortManager.getAll().length).toBe(3)
    expect(cohortManager.remove('Cohort 13')).toEqual(result)
    expect(cohortManager.getAll().length).toBe(2)
  })
  it('should remove a student by id from the cohort', () => {
    cohort.add('Troy', 'McClure', 'tmcclure', 'tmcclure@hollywood.org')
    cohort.add('Sideshow', 'Bob', 'sidebob', 'bob@krustyproductions.org')
    const expected = cohort.getAll()
    expect(expected.length).toBe(2)
    const result = [
      new Student(1, 'Troy', 'McClure', 'tmcclure', 'tmcclure@hollywood.org')
    ]
    expect(cohort.remove(1)).toEqual(result)
  })
  it('should throw an error if a cohort that does not exist is removed', () => {
    expect(() => cohortManager.remove('Cohort 14')).toThrow('Cohort not found')
  })
  it('should throw an error if a student that does not exist is removed', () => {
    expect(() => cohort.remove(67)).toThrow('Student not found')
  })
  it('should search for a student by ID', () => {
    cohort.add('Troy', 'McClure', 'tmcclure', 'tmcclure@hollywood.org')
    cohort.add('Sideshow', 'Bob', 'sidebob', 'bob@krustyproductions.org')

    const result = new Student(
      1,
      'Troy',
      'McClure',
      'tmcclure',
      'tmcclure@hollywood.org'
    )
    expect(cohort.search(1)).toEqual(result)
  })
  it('should throw an error if the student id does not exist', () => {
    expect(() => cohort.search(67)).toThrow('Student not found')
  })
  it('should alert when the cohort is at full capacity', () => {
    const newCohort = new Cohort('Cohort 13')
    for (let i = 0; i < students.length; i++) {
      if (students[i].id <= 24) {
        return students[i]
      }
      newCohort.students.push(students[i])
      console.log(newCohort)
    }

    expect(
      cohort.add('Bruce', 'Wayne', 'batman', 'bruce.wayne@wayneenterprises.com')
    ).toThrow('Cohort is at full capacity')
  })
})
