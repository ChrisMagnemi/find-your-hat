const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field,){
        this._field = field;
        this._height = field[0].length;
        this._width = field.length;
        this._userPosition = { row: 0, col: 0 };
        this._userTravelField = Field.generateBlankField(this._height,this._width);
    }

    get getHeight(){
        return this._height;
    }
    get getWidth(){
        return this._width;
    }
    get getUserPosition(){
        return this._userPosition;
    }
    get getField(){
        return this._field;
    }
    // setter for _userPosition?

    printGameField(){
        console.log("-----------Game Field---------------");
        this._field.forEach(row => {
            console.log(row.join(''));
        });
        console.log("--------------------------");
    }
    printUserPathField(){
        console.log("----------User Path Field----------------");
        this._userTravelField.forEach(pathRow => {
            let arr = pathRow;
            for (let i = 0; i < pathRow.length; i++){
                if (pathRow[i] === pathCharacter) {
                    arr[i] = pathCharacter;
                } else {
                    arr[i] = fieldCharacter;
                }
            }
            console.log(arr.join(''));
        });
        console.log("--------------------------");
    }

    promptUserAction(){
        const userAction = prompt("Make a move (U: up, D: down, L: left, R: right): ");
        return userAction
    }

    validateUserAction(input){
        input = input.toLowerCase();
        const validMovesArray = ['u','up','d','down','l','left','r','right'];
        for (let i = 0; i<validMovesArray.length; i++){
            if (input === validMovesArray[i]){
                return true
            }
        }
        console.log("This is not a valid move.");
        return false
    }

    updateUserPosition(userAction){
        // console.log(" >> Start UpdateUserPosition <<");
        let currPos = this.getUserPosition;

        switch (userAction){
            case 'u':
            case 'up':
                this._userPosition.row = this.getUserPosition.row - 1;
                break;
            case 'd':
            case 'down':
                this._userPosition.row = this.getUserPosition.row + 1;
                break;
            case 'l':
            case 'left':
                this._userPosition.col = this.getUserPosition.col - 1;
                break;
            case 'r':
            case 'right':
                this._userPosition.col = this.getUserPosition.col + 1;
                break;
            default:
                console.log("default case");
        }
        // console.log(" >> End updateUserPosition << ");
    }

    userMoveResult(){
        let userPos = this.getUserPosition;
        let userTile = this._field[userPos.row][userPos.col];

        if (userPos.row < 0 || userPos.row >= this.getHeight || userPos.col < 0 || userPos.col >= this.getWidth){
            // user went out of bounds - end game
            return "GAME OVER, you are OUT OF BOUNDS";
        } else if (userTile === hole ) {
            // user lands on a hole - end game
            return "GAME OVER, you landed in a hole";
        } else if (userTile === hat ){
            // user lands on their hat - winner and end game
            return "YOU WON! You found your hat!";
        } else {
            return;
        }
    }

    playGame(){
        // prompt for user action
        let continuePlaying = true;
        this.printUserPathField();
        while (continuePlaying) {
            let userAction = this.promptUserAction().toLowerCase();

            // validate user input is a move
            if (this.validateUserAction(userAction)){
                console.log(` -- User Move ( ${userAction} ) is valid -- `);
            } else {
                console.log(" -- Invalid Move > Try again. -- ");
                // this.handleUserAction();
            }

            // update user position
            this.updateUserPosition(userAction);
            let newUserPosition = this.getUserPosition;
            // console.log(" -- User moved to: ", this.getUserPosition, " -- ");

            // check if user is inbounds, or win/loss. Stop game or continue accordingly
            let stopGame = this.userMoveResult();
            if (!stopGame){
                console.log("Updated field: ");
                this._userTravelField[newUserPosition.row][newUserPosition.col] = pathCharacter;
                // this.printGameField();
                this.printUserPathField();
            } else {
                console.log(stopGame);
                continuePlaying = false;
            }
        }
        // update field and show to user

    } // end playGame

    static generateField( height, width, holes) {
        let newField = [];
        for (let i = 0; i < height; i++){
            newField.push([]);
            for (let j = 0; j < width; j++){
                newField[i].push(fieldCharacter);
            };
        };
        newField[0][0] = pathCharacter;
        let hatX = Math.floor(Math.random() * width);
        let hatY = Math.floor(Math.random() * height);
        newField[hatY][hatX] = hat;

        for (let k = holes; k > 0; k--){
            let holeX = hatX;
            let holeY = hatY;
            while (holeX === hatX) {
                holeX = Math.floor(Math.random() * width);
            };
            while (holeY === hatY){
                holeY = Math.floor(Math.random() * height);
            };
            newField[holeY][holeX] = hole;
        }
        newField[0][0] = pathCharacter;
        return newField;
    }

    static generateBlankField( height, width) {
        let newField = [];
        for (let i = 0; i < height; i++){
            newField.push([]);
            for (let j = 0; j < width; j++){
                newField[i].push(" ");
            };
        };
        newField[0][0] = pathCharacter;
        return newField
    }


}

// const myField = new Field([
//     ['*', '░', 'O'],
//     ['░', 'O', '░'],
//     ['░', '^', '░'],
//   ]);

let gameField = Field.generateField(5,5,1);
const myField = new Field(gameField);

myField.playGame();
