$(document).ready(function () {
  //Table Insert
  var rta = 0;
  $("#btn").click(function (e) {
    e.preventDefault();
    var dato_form = $("#miFormulario").serialize();
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
        $("#tabla").append("<td ><label class='btn btn-danger badge btn-borrar '> X </label></td>");
        $("#tabla").append("</tr>");
        $("#total").text(rta);
        console.log(rta);
        //Modificar
        $(".modificar").click(function () {
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
          var dato_eliminar = $(this).attr("id");
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
    var datos_modificar = $("#form_actualizar").serialize();
    var param_id = $("#_id").val();
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
