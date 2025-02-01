let App={
    $:{
        Menu:document.querySelector('[data-id="menu"]'),
        Items:document.querySelector('[data-id="menu-items"]'),
        RestBtn:document.querySelector('[data-id="reset-btn"]'),
        NewRoundBtn:document.querySelector('[data-id="new-round-btn"]'),
        squares:document.querySelectorAll('[data-id="sq"]'),
        modal:document.querySelector('[data-id="modal"]'),
        modalBtn:document.querySelector('[data-id="modal-btn"]'),
        modalText:document.querySelector('[data-id="modal-text"]'),
        turn:document.querySelector('[data-id="turn"]'),
        sound:document.getElementById('sound'),
        win:document.getElementById('win'),
    },
    state:{
        move:[],
    },
    winnercheck(move){
        const p1Moves=move.filter((e)=>e.PlayerID===1).map(e=>+e.SquareID);
        const p2Moves=move.filter((e)=>e.PlayerID===2).map(e=>+e.SquareID);

        const winningPatterns=[
        [0,1,2],
        [0,4,8],
        [0,3,6],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [3,4,5],
        [6,7,8]];
        let winner = null;
        let winsquare1 = [];
        let winsquare2 = [];
        winningPatterns.forEach(pattern=>{ const p1Wins = pattern.every(value=> p1Moves.includes(value))
                                            const p2Wins = pattern.every(value=> p2Moves.includes(value))
                                            pattern.forEach(value => {
                                                if (p1Moves.includes(value)) {
                                                    winsquare1.push(value);
                                                }
                                            });
                                            pattern.forEach(value => {
                                                if (p2Moves.includes(value)) {
                                                    winsquare2.push(value);
                                                }
                                            });
                                            if (p1Wins){winner=1}
                                            if (p2Wins){winner=2}})
                                                
        
        return{           
            status: move.length == 9 || winner != null ? 'complete' : 'in-progress',
            winner,
            winsquare1,
            winsquare2
        }
    },



    EventRegister(){

        App.$.squares.forEach(square=>square.addEventListener('click',event=>{
            const hasMove = (squareID)=> {
                App.$.sound.play();
                const existMove = App.state.move.find((move)=>move.SquareID===squareID)  
                return existMove!==undefined         }

            if (hasMove(+square.id)){
                return;
            }
            const lastPlayer=App.state.move.at(-1);
            const getOpposit=(PlayerID)=>PlayerID === 1 ? 2:1;
            const CurrentPlayer=App.state.move.length==0 ? 1 : getOpposit(lastPlayer.PlayerID);
            const squareicon=document.createElement('i');
            squareicon.style.animation="win 0.3s ease"
            const turnicon=document.createElement('i');
            const nextPlayer=getOpposit(CurrentPlayer)
            const turnLabel= document.createElement('p')
            turnLabel.innerHTML=`Player ${nextPlayer}`
            
            if (CurrentPlayer===1){
                squareicon.classList.add("fa-solid", "fa-x", "yellow");
                turnicon.classList.add("fa-solid", "fa-0", "blue");
                turnLabel.classList.add('blue')
            }
            else{
                squareicon.classList.add("fa-solid", "fa-o", "blue");
                turnicon.classList.add("fa-solid", "fa-x", "yellow");
                turnLabel.classList.add('yellow')
            }
            App.$.turn.replaceChildren(turnicon,turnLabel)
App.state.move.push(
    {
        PlayerID:CurrentPlayer,
        SquareID:+square.id,
    }
)



            square.replaceChildren(squareicon); 
            /* ttsting the winner  */
            const game = App.winnercheck(App.state.move)
          
            if (game.status==='complete'){

                if (game.winner==1){
                    App.$.win.play();
                game.winsquare1.forEach((v)=>{
                    const squareWin =document.getElementById(`${v}`)
                    squareWin.firstChild.style.animation="win2 0.8s ease"
                })
                }
                if (game.winner==2){
                    App.$.win.play();
                    game.winsquare2.forEach((v)=>{
                        const squareWin =document.getElementById(`${v}`)
                        squareWin.firstChild.style.animation="win2 0.8s ease"
                    })
                    }
              setTimeout( ()=>{   
                App.$.modal.classList.remove('hidden')
                let message=''    
            if (game.winner){
                message=`Player ${game.winner} Wins!`
                
            }else{ message='Tie Game'} App.$.modalText.textContent = message;},1000)
            }
       

            

        }))
        /* Menu Toggel */
        App.$.Menu.addEventListener("click",event =>{
            App.$.Items.classList.toggle('hidden');});
        /* Rest Game button */
        App.$.RestBtn.addEventListener("click",event =>{
            console.log('Rest game ');});
        /* New Round */
        App.$.NewRoundBtn.addEventListener("click",event =>{
            console.log('new Round ');});
        App.$.modalBtn.addEventListener('click',(e)=>{
           
            App.state.move=[];
            App.$.squares.forEach(e=>e.replaceChildren())
            App.$.modal.classList.add('hidden')
        })    
    },
    Init(){ 
        App.EventRegister();

    },


};
window.addEventListener('load', App.Init);



