'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateAverage(array) {
  return array.reduce((a, b) => a + b, 0) / array.length;
}

function calculateMenAverageAge(people, century) {
  const mens = people.filter(({ sex, died }) => (
    century
      ? sex === 'm' && century === Math.ceil(died / 100)
      : sex === 'm'
  ));

  const agesArr = mens.map(({ died, born }) => died - born);

  return calculateAverage(agesArr);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(({ sex, name }) => (
    withChildren
      ? sex === 'f' && people.some(({ mother }) => mother === name)
      : sex === 'f'
  ));

  const agesArr = womens.map(({ died, born }) => died - born);

  return calculateAverage(agesArr);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childs = people.filter(({ sex, mother }) => (
    onlyWithSon
      ? sex === 'm' && people.some(({ name }) => name === mother)
      : people.some(({ name }) => name === mother)
  ));

  const agesArr = childs.map(({ born, mother }) => (
    born - people.find(({ name }) => name === mother).born
  ));

  return calculateAverage(agesArr);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
