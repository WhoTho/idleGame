/**
 * Created Date: Mar 25 2024, 08:04:35 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 25 2024, 08:08:46 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

// class ConnectedTiles {
//     constructor() {
//         this.tiles = [];
//     }

//     hasXY(x, y) {
//         return this.tiles.some((tile) => tile.x === x && tile.y === y);
//     }

//     hasTile(tile) {
//         return this.tiles.includes(tile);
//     }

//     addTile(tile) {
//         this.tiles.push(tile);
//     }

//     removeTile(tile) {
//         this.tiles = this.tiles.filter((t) => t !== tile);
//     }

//     splitRemove(tile) {
//         let newConnections = []
//         for (let oy in [-1, 1]) {
//             for (let ox in [-1, 1]) {
//                 let x = tile.x + ox;
//                 let y = tile.y + oy;
//                 for (let connectedTiles of newConnections) {
//                     if (connectedTiles.hasXY(x, y)) {
//                         connectedTiles.addTile(tile);
//                         break
//                     }
//                 }
//                 if (newTile) {
//                     newConnections.push(newTile);
//                 }
//             }
//         }
// }
