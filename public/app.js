$(document).ready(function() {
  $.getJSON('http://localhost:8000/todos', function(data) {
    console.log(data);
    for(var i = 0; i < data.length; i++){

      // should the char after ( before li be a ` or ')
      $('#theTodos').append(`<li>${data[i].title} <span class="remove"> x </span></li>`);
    }
    $('button').click(function() {
      var inputValue = $('#theTitle').val();
      $.post('http://localhost:8000/todos',
      {
        id: data[data.length-1].id + 1,
        title: inputValue,
        completed: false
      },
      function(postedTodo) {
        console.log(postedTodo);
           // should the char after ( before li be a ` or ')
        $('#theTodos').append(`<li>${postedTodo[postedTodo.length-1].title} <span class="remove">x</span></li>`);
     });
  });
    $('ul').on('click', 'span.remove', function() {
      console.log('heard');
      $(this).parent().remove();
   });


});
});
