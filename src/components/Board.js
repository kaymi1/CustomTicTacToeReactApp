import React from 'react'
import Square from "./Square";
import Text from "./Text";
import Choice from "./Choice"

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            isHasWinner: false,
            isChoiceComplete: false,
            statusEnable: false,
            moreGame: false,
        }
    }

    renderChoice(i) {
        if (!this.state.isChoiceComplete) {
            return (
                <Choice
                    value={i}
                    onClick={() => this.handleChoiceClick(i)}/>
            );
        }
    }

    handleChoiceClick(i) {
        if (i == 'X') {
            this.state.xIsNext = true;
        } else {
            this.state.xIsNext = false;
        }
        this.setState({
            isChoiceComplete: true,
            statusEnable: true
        })
    }

    renderMoreGame(i) {
        if (this.state.moreGame) {
            return (
                <Choice
                    value={i}
                    onClick={() => this.handlerMoreGame()}/>
            );
        }
    }

    handlerMoreGame() {
        this.setState({
            squares: Array(9).fill(null),
            isChoiceComplete: false,
            statusEnable: false,
            moreGame: false,
            isHasWinner: false
        })
    }

    renderStatus() {
        if (this.state.statusEnable) {
            let status;
            const squares = this.state.squares;
            let isDeadHeat = true;
            for (let i = 0; i < squares.length; i++) {
                if(squares[i] == 'X' || squares[i] == 'O'){
                    continue;
                }
                isDeadHeat = false;
                break;
            }
            const winner = calculateWinner(this.state.squares);
            if(isDeadHeat && !winner){
                status = 'DeadHeat';
                this.state.moreGame = true;
                return (<Text value={status}/>);
            }
            else if (winner) {
                this.state.isHasWinner = true;
                this.state.moreGame = true;
                status = 'Winner: ' + winner;
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
            return (<Text value={status}/>);
        }
    }

    renderText(i) {
        if (!this.state.isChoiceComplete) {
            return (
                <Text value={i}/>
            );
        }
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    handleClick(i) {
        if(this.state.isChoiceComplete){
            if (this.state.isHasWinner) {
                return;
            }
            const squares = this.state.squares.slice();
            if (squares[i] == null) {
                squares[i] = this.state.xIsNext ? 'X' : 'O';
                this.setState({
                    squares: squares,
                    xIsNext: !this.state.xIsNext,
                });
            }
        }
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderText("Pick a side:")}
                    <div className="wrapper_button">
                        {this.renderChoice('X')}
                        {this.renderChoice('O')}
                    </div>
                </div>
                {this.renderStatus()}
                <div className="wrapper_board">
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
                <div className="wrapper_more_game">
                    {this.renderMoreGame('One more game?')}
                </div>
            </div>
        );
    }
}

export default Board;

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}