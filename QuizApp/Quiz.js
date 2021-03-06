
let questions = [
    "1. What is the Capital of India?",
    "2. What is the national animal of India?",
    "3. What is the national bird of India?"
];

let answers = [
    "New Delhi",
    "Tiger",
    "Peacock"
];

let options = [
    [
        "Mumbai",
        "Chennai",
        "New Delhi",
        "Bangalore"
    ],
    [
        "Lion",
        "Tiger",
        "Elephant",
        "Giraffe"
    ],
    [
        "Sparrow",
        "Penguin",
        "Wood Pecker",
        "Peacock"
    ]
]

let inputs = document.querySelectorAll(".col-lg-2 input");
let labels = document.querySelectorAll(".col-lg-4 label");
let correctAnswers = 0;

let index = 1;

function btnclick(){
    for(var i=0;i<inputs.length;i++)
    {
        if (inputs[i].checked == true && inputs[i].value == answers[index-1])
        {
            correctAnswers+=1;
        }
    }
    if (index<=2)
    {
        document.querySelector("#heading div").textContent="Question";
        document.querySelector("#Question").innerHTML = questions[index];
        for(var j=0;j<4;j++)
        {
            inputs[j].value = options[index][j];
            labels[j].innerHTML = options[index][j];
        }
        for(var j=0;j<4;j++)
        {
            inputs[j].checked = false;
        }
        index+=1;
    } 
    else
    {
        document.querySelector("#heading div").textContent="Result";
        document.querySelector("#q").innerHTML="";
        document.querySelector("#o").innerHTML="";
        document.querySelector("#b").innerHTML="";
        let h1 = document.createElement("h1");
        let ele = `Your Score is ${correctAnswers}.`;
        document.querySelector("#heading div").after(h1);
        document.querySelector("h1").append(ele);
        document.querySelector("h1").style.marginLeft = "200px";
        document.querySelector("h1").style.fontSize = "1.5rem";
    }
}
