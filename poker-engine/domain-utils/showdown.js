
'use strict';

const sortByRank = require('poker-rank');

const eachFrom = require('../lib/loop-from');



/**
 * @function
 * @name showdown
 * @desc
 *  ...
 *
 * @param {Object} gs:
 *  the gamestate object
 *
 * @returns {void}
 */
exports = module.exports = function showdown(gs) {

  const activePlayers = gs.activePlayers;

  if (activePlayers.length === 1){
    return void (gs.handChart = []);
  }

  // it's an array containing the best combination
  // of each player
  const playersBestCombination = activePlayers.map(player => player.showdown(gs.commonCards));

  const sortedCombinations = sortByRank(playersBestCombination);

  gs.handChart = sortedCombinations.map(function(bestCombinationData, i, allCombinations) {
    const player = activePlayers[bestCombinationData.index];
    return {
      name: player.name,
      id: player.id,
      quote: player.chipsBet,
      bestCombination: player.bestCombination,
      bestCombinationData: bestCombinationData
    };
  });

}
