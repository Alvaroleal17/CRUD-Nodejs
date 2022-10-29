$(document).ready(function () {
  let rta = 0;

  $(function () {
    $(".update").hide();
    $(".alert").hide();
  });

  //Table insert
  $("#btn").click(function (e) {
    e.preventDefault();
    const dato_form = $("#miFormulario").serialize();
    $.ajax({
      url: "/usuario",
      type: "POST",
      data: dato_form,
      success: function (respuesta) {
        console.log(respuesta._id);
        if (respuesta.tipo === "Ingreso") {
          rta = rta + parseInt(respuesta.importe);
          color = "text-success";
        }
        if (respuesta.tipo === "Gasto") {
          rta = rta - parseInt(respuesta.importe);
          color = "text-danger";
        }
        $("#tabla").append("<tr id='remover' class='table-success'>") +
          $("#tabla").append(
            "<td >" +
              "<button id='" +
              respuesta._id +
              "' class=' btn borrar badge bg-danger'>Eliminar</button>" +
              " " +
              "<button id='" +
              respuesta._id +
              "' class=' btn modificar badge bg-success'>Modificar</button>"
          );
        $("#tabla").append("<td >" + respuesta._id + "</td>");
        $("#tabla").append("<td >" + respuesta.nombre + "</td>");
        $("#tabla").append("<td >" + respuesta.fecha + "</td>");
        $("#tabla").append("<td >" + respuesta.importe + "</td>");
        $("#tabla").append(
          "<td > <span class='" +
            color +
            "' >" +
            respuesta.tipo +
            "</span></td>"
        );
        $("#tabla").append("<td >" + respuesta.detalle + "</td>");
        $("#tabla").append("</tr>");
        $("#total").text(rta);
        console.log(rta);

        //Modificate
        $(".modificar").click(function () {
          $(".update").show();
          $(".delete").hide();
          $(".identificador").val(respuesta._id);
          $(".name").val(respuesta.nombre);
          $(".date").val(respuesta.fecha);
          $(".amount").val(respuesta.importe);
          $(".type").val(respuesta.tipo);
          $(".details").val(respuesta.detalle);
        });

        //Delete
        $(".borrar").click(function (e) {
          e.preventDefault();
          const dato_eliminar = $(this).attr("id");
          setTimeout( ()=>{
            $(".delete").show();
          },1000)
          $(".change").hide();
          $.ajax({
            url: "/usuario/" + dato_eliminar,
            type: "delete",
            success: function (respuesta) {
              console.log(respuesta);
            },
          });
        });
      },
    });
  });

  //Actulizar
  $("#btn_actualizar").click(function (e) {
    e.preventDefault();
    const datos_modificar = $("#form_actualizar").serialize();
    const param_id = $("#_id").val();
    setTimeout( ()=>{
      $(".change").show();
    },1000)
    $(".delete").hide()
    $.ajax({
      url: "/usuario/" + param_id,
      type: "PUT",
      data: datos_modificar,
      success: function (respuesta) {
        console.log(respuesta);
      },
    });
  });



});
