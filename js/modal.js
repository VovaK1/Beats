const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach((field) => {
    field.removeClass('input-error');
    if (field.val() == "") {
      field.addClass('input-error');
    }
  })
  const errorFields = form.find('.input-error');
  return errorFields.length == 0;
}

$(".form").submit(e => { 
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {  
  $.ajax({
    type: "post",
    url: "https://webdev-api.loftschool.com/sendmail",
    data: {
      name: name.val(),
      phone: phone.val(),
      comment:comment.val(),
      to: to.val(),
    },
  });
  }
 

  $.fancybox.open({
    scr: "#modal",
    type: "inline"
  })
});