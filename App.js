import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
} from './src/functions';
export default class App extends Component {
  constructor(props) {
    console.warn('AQUIII');
    console.log('AQUIII');
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    console.log(this.minesAmount());
    return {
      board: createMinedBoard(rows, cols, 3),
      won: false,
      lost: false,
    };
  };

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert('Perdeu!');
    }

    if (won) {
      Alert.alert('Parabéns!', 'Você venceu!');
    }

    this.setState({board, lost, won});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});
