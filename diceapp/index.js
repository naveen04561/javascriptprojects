var random1 = Math.floor(Math.random()*6) + 1;

var random2 = Math.floor(Math.random()*6) + 1;

var img1="dice"+random1+".png";
var img2="dice"+random2+".png";
document.querySelector("#Dice1 img").setAttribute("src",img1);
document.querySelector("#Dice2 img").setAttribute("src",img2);

if (random1>random2)
{
    document.querySelector("h1").innerHTML = "Player 1 Wins";
}

else if (random2>random1)
{
    document.querySelector("h1").innerHTML = "Player 2 Wins";
}

else
{
    document.querySelector("h1").innerHTML = "Draw";
}