var count = 120;
var html = "<h1>"
var interval = setInterval(function(){
  document.getElementById('demo').innerHTML=count; 
  count--;
  if (count === 0){
    clearInterval(interval);
    
    html += "SORRY, YOU'RE NOT A QUALIFIED AGENT YET";
    html += "</h1>";
    document.getElementById("kuis-trivia").innerHTML = html;
    
    alert("You're out of time!");
  }
}, 1000);

/* [QUIZ ENGINE] */
var kuis = {
  draw : function () { //Fungsi yang membuat pertanyaan kuis

    //Memanggil ID kuis trivia yang merupakan h1
    var isi = document.getElementById("kuis-trivia");

    // Create all the necessary HTML elements
    for (var index in questions) {  // Melakukan loop di array pertanyaan
      var number = parseInt(index) + 1; // The current question number
      var qwrap = document.createElement("div"); // A div isi to hold this question and options
      qwrap.classList.add("question"); // CSS class, for cosmetics

      // The question - <h1> header
      var question = document.createElement("h1");
      question.innerHTML = questions[index]['q'];
      qwrap.appendChild(question);
      
      var question = document.createElement("h1");
        question.innerHTML = number + ") " + questions[index]['p'];
        qwrap.appendChild(question);

      // The options - <input> radio buttons and <label>
      for (var oindex in questions[index]['o']) {
        // The <label> tag
        var label = document.createElement("label");
        qwrap.appendChild(label);

        // The <option> tag
        var option = document.createElement("input");
        option.type = "radio";
        option.value = oindex;
        option.required = true;
        option.classList.add("oquiz"); // Will explain this later in function submit below
        
        // Remember that a radio button group must share the same name
        option.name = "quiz-" + number;
        label.appendChild(option);

        // Add the option text
        var otext = document.createTextNode(questions[index]['o'][oindex]);
        label.appendChild(otext);
      }

      // Finally, add this question to the main HTML quiz isi
      isi.appendChild(qwrap);
    }

    // Attach submit button + event handler to the quiz isi
    var submitbutton = document.createElement("input");
    submitbutton.type = "submit";
    isi.appendChild(submitbutton);
    isi.addEventListener("submit", kuis.submit);
  },

  submit : function (evt) {
  // quiz.submit() : Handle the calculations when the user submits to quiz

    // Stop the form from submitting
    evt.preventDefault();
    evt.stopPropagation();

    // Remember that we added an "oquiz" class to all the options?
    // We can easily get all the selected options this way
    var selected = document.querySelectorAll(".oquiz:checked");

    // Mendapatkan hasil
    var hasil = 0;
    for (var index in questions) 
    {
      if (selected[index].value == questions[index]['a']) 
      {
        hasil++;
      }
    }

    var total = selected.length; // Variabel total semua pertanyaan
    var persen = hasil / total ; // Variabel utk menghitung persentasi hasil

    // Menunjukan hasil
    // Menambahkan h1 ke index.html saat output pertama dan mengupdate saat output berikutnya
    var html = "<h1>";

    if (persen<0.7) {
      html += "SORRY, YOU'RE NOT A QUALIFIED AGENT YET";
    } else {
      html += "CONGRATULATIONS, YOU'VE PASSED AS A FULL AGENT!";
    }
    html += "</h1>";
    html += "<div>You scored " + hasil + " out of " + total + ".</div>";
    document.getElementById("kuis-trivia").innerHTML = html;
  }
};

/* [INIT] */
window.addEventListener("load", kuis.draw);

function startQuiz() {
  location.reload();
}
