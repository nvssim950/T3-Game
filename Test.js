
var player1 = 0;
var player2 = 0;
const clk = document.querySelectorAll('.case');
const sound = document.getElementById('sound');
const win = document.getElementById('win');
var play =true;
var cpt = 1;
var gameover=0;
clk.forEach(one =>{
    one.addEventListener('click',main);
});

function main(Event){
const place = document.getElementById(`${Event.target.id}`);
sound.play();
if (cpt<10 && !place.classList.contains('OK') && gameover==0 ){
cpt++;

if (cpt % 2 ==0){
place.textContent='X';
place.style.color='#7BD3EA';
}else{
    place.textContent='O';
    place.style.color='#6EC207';
};
place.classList.add='OK';
check_winner();


};
};

function check_winner(){
    const case1=document.getElementById('c1').textContent;
    const case2=document.getElementById('c2').textContent;
    const case3=document.getElementById('c3').textContent;
    const case4=document.getElementById('c4').textContent;
    const case5=document.getElementById('c5').textContent;
    const case6=document.getElementById('c6').textContent;
    const case7=document.getElementById('c7').textContent;
    const case8=document.getElementById('c8').textContent;
    const case9=document.getElementById('c9').textContent;
    if (case1 == case2 && case2 == case3 && case2 == 'X'  || case4 == case5 && case5 == case6 && case5 == 'X'  || case7 == case8 && case8 == case9 && case8 == 'X' || case1 == case4 && case4 == case7 && case4 == 'X' || case2 == case5 && case5 == case8 && case5 == 'X' || case3 == case6 && case6 == case9 && case6 == 'X'|| case1 == case5 && case5 == case9 && case5 == 'X'|| case3 == case5 && case5 == case7 && case5 == 'X' ){
        player1++ 
        gameover=1;
        document.getElementById('player-1-score').textContent=player1.toString();
        win.play();

        return ;
        };
     if (case1 == case2 && case2 == case3 && case2 == 'O'   || case4 == case5 && case5 == case6 && case5 == 'O'  || case7 == case8 && case8 == case9 && case8 == 'O' || case1 == case4 && case4 == case7 && case4 == 'O' || case2 == case5 && case5 == case8 && case5 == 'O'  || case3 == case6 && case6 == case9 && case6 == 'O'  || case1 == case5 && case5 == case9 && case5 == 'O'  || case3 == case5 && case5 == case7 && case5 == 'O' ){
     player2++ 
     gameover=1;
     win.play();
     document.getElementById('player-2-score').textContent=player2.toString();

     return;
        };};
        function reset_game() {
            clk.forEach((element) => {
                // Clear the div
                element.textContent = '';
                // Remove the id
                element.classList.remove('OK');
            });
            cpt=1;
            gameover=0; 
        };
