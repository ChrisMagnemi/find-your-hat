const readline = require('readline');

const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this._field = field;
        this._length = field[0].length;
        this._width = field.length;
        this._userPosition = { row: 0, col: 0 };
    }

    get getLength(){
        return this._length;
    }
    get getWidth(){
        return this._width;
    }
    get getUserPosition(){
        return this._userPosition;
    }

    print(){
        console.log("--------------------------");
        this._field.forEach(row => {
            console.log(row.join(''));
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
        let currPos = this.getUserPosition;
        console.log("user's current position is: ", currPos);
        console.log("user will move: ", userAction);

    }

    handleUserAction(){
        // prompt for user action
        let userAction = this.promptUserAction();

        // validate user input is a move
        if (this.validateUserAction(userAction)){
            console.log("user input is a valid move");
        } else {
            console.log("Try again.");
            this.handleUserAction();
        }
        // update user position
        this.updateUserPosition(userAction);


        // check what type of tile the user lands on

        // update field

    }


}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

myField.print();
myField.handleUserAction();
console.log(myField.getLength);
