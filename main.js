const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this._field = field;
        this._height = field[0].length;
        this._width = field.length;
        this._userPosition = { row: 0, col: 0 };
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
    // setter for _userPosition?

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

    isUserInbounds(){
        let userPos = this.getUserPosition;

        if (userPos.row < 0 || userPos.row >= this.getHeight || userPos.col < 0 || userPos.col >= this.getWidth){
            console.log(" GAME OVER, you are OUT OF BOUNDS.");
            return false;
        } else {
            return true;
        }
    }

    playGame(){
        // prompt for user action
        let userAction = this.promptUserAction().toLowerCase();

        // validate user input is a move
        if (this.validateUserAction(userAction)){
            console.log(` -- User Move ( ${userAction} ) is valid -- `);
        } else {
            console.log(" -- Invalid Move > Try again. -- ");
            this.handleUserAction();
        }

        // update user position
        this.updateUserPosition(userAction);
        console.log(" -- User moved to: ", this.getUserPosition, " -- ");

        // check if user is inbounds
        if (!this.isUserInbounds()){
            return;
        }

        // check what type of tile the user lands on


        // update field and show to user

    }


}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

myField.print();
myField.playGame();
