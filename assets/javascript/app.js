$(document).ready(function(){
  
  // event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  // trivia properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 15,
  timerOn: false,
  timerId : '',
  // questions options and answers data
  questions: {
    q1: 'When is the Toy Story1 released?',
    q2: 'Who casted Woody voice?',
    q3: 'Who was the director of Toys Story1?',
    q4: 'When is the Toy Story 2 released?',
    q5: "What is the boy's name in Toy Story 2 ?",
    q6: 'Who wanted to purchase Woody from the yard sale ?',
    q7: "What was Woody doing in at the yard sale ?",
    q8: "Who is to be shipped to Japan to be a toy exhibit in a museum ?",
    q9: "What was the name of the toy store ?",
    q10: "The Evil Emperor Zurg is Woody's father"
  },
  options: {
    q1: ['1993', '1995', '1997', '2001'],
    q2: ['Spencer Aste', 'Erik von Detten', 'Tim Allen', 'Tom Hanks'],
    q3: ['John Lasseter', 'Michael Caine', 'Steven Spielberg', 'Hayao Miyazaki'],
    q4: ['1999', '2000', '2001', '2002'],
    q5: ['Mike','Jake','Andy','Adam'],
    q6: ['Al','Allen','Aaron','Alex'],
    q7: ['Selling himself for 25 cents', 'Saving Wheezy', 'Saving Wheezy'],
    q8: ['Woody, Jessie, Bullseye and The Prospector', 'Woody, Buzz, Jessie, Slinky', 'Woody, Jessie, Roundup and The Prospector' ],
    q9: [ 'Als Toy Store', 'Als Toy Barn','Allens Toy Shop', 'Allen Toy Shop'  ],
    q10: ['True', 'False']
  },
  answers: {
    q1: '1995',
    q2: 'Tom Hanks',
    q3: 'John Lasseter',
    q4: '1999',
    q5: 'Andy',
    q6: 'Al',
    q7: 'Saving Wheezy',
    q8: 'Woody, Jessie, Bullseye and The Prospector',
    q9: 'Als Toy Barn',
    q10: 'False'
  },

  // Reset game
  startGame: function(){
    
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    // DOM for HTML
    $('#game').show();
    $('#results').html('');
    $('#timer').text(trivia.timer);
    $('#start').hide();
    $('#remaining-time').show();

    trivia.nextQuestion();
    
  },
   // method to loop through and display questions and options 
   nextQuestion : function(){
    
    // Timer
    trivia.timer = 15;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
        if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1500);
    }
    
    // HTML next question and choices
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    // HTML button in HTML
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
    
      
  timerRunning : function(){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    // the time has run out and increment unanswered, run result
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    // if all the questions have been shown end the game, show results
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      // Game Result

      
  //$( function() {
  //  $( "#dialog" ).dialog();} );
 
      $('#results')
        .html(
        '<img src="assets/images/toon1.png" />'+
        '<h3>Here is the score;</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Wanna try again?</p>');
      
      // hide game sction
      $('#game').hide();
      
      // show start button to begin a new game
      $('#start').show();
    }
    
  },
  // Check answer
  guessChecker : function() {
    
    var resultId;
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    if($(this).text() === currentAnswer){
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h4>Correct!</h4>');
    }
    else{
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h4>Nahhh '+ currentAnswer +'</h4>');
    }
    
  },

  // Create next question 
  guessResult : function(){
        trivia.currentSet++;
        $('.option').remove();
        $('#results h4').remove();
    trivia.nextQuestion();
     
  }

}