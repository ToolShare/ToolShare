$(document).ready(function(){
  $('.request-put').on('click', function(e){
    e.preventDefault();
    var $this = $(this);
    $.ajax({
      url: $this.attr('href'),
      method: 'PUT',
      data: {status: $this.attr('data-loan-response'), id:$this.attr('data-req-id')}
      })
      .done(function(data) {
        console.log(data)
        //location.reload();
      });
  })
})
