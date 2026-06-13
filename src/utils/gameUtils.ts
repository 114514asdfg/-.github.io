/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Difficulty } from '../types';

/**
 * Returns the exact countdown duration (in seconds) for each player period based on difficulty.
 */
export const getPeriodDuration = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case 'easy':
      return 60; // 60s for relaxed and easy exploration
    case 'normal':
      return 45; // 45s standard cycle speed
    case 'hard':
      return 35; // 35s slightly tense cycle speed
    case 'hell':
      return 25; // 25s tight situation change speed
    case 'impossible':
      return 15; // 15s absolute frantic speed limit
    default:
      return 45;
  }
};
