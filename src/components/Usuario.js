import React from 'react';
import '../Styles.css';
import { Link } from 'react-router-dom';

export default class Usuario extends React.Component {

  cerrarModales(){
    document.getElementById("errorAgregarMonitoria").innerHTML = "";
    document.getElementById("errorRegistroCalificacion").innerHTML = "";
    document.getElementById("errorRegistroAsesoria").innerHTML = "";
  }
  agregarMonitoria(){
    const cId = document.getElementById("agregarMonitoria").value.split('+')[0];
    const cNombre = document.getElementById("agregarMonitoria").value.split('+')[1];
    console.log(cId);
    console.log(cNombre);
    const contenido = {
      cursoId: cId,
      curso: cNombre,
      userId: this.state.userId,
      nombre: this.state.nombre
    };
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contenido })
    };
    fetch("/usuario/agregarMonitoria", request)
      .then(res => res.json())
      .then(res => {
        if (res.valor === true) {
          this.setState({ flagMonitorias: true });
        }
        else{
          document.getElementById("errorAgregarMonitoria").innerHTML = "Ya tienes activa esa monitoria"
          document.getElementById("errorAgregarMonitoria").style.color = "red"
        }
      })
  }
  suspenderMonitoria(id) {
    const contenido = {
      monitorId: id,
    };
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contenido })
    };
    fetch("/usuario/suspenderMonitoria", request)
      .then(res => res.json())
      .then(res => {
        if (res.valor === true) {
          this.setState({ flagMonitorias: true });
        }
      })
  }
  registrarCalificacion() {
    if (document.getElementById("registroCalificacionNota").value === "") {
      document.getElementById("errorRegistroCalificacion").innerHTML = "Debes poner una nota en el espacio designado"
      document.getElementById("errorRegistroCalificacion").style.color = "red"
    }
    else if (parseFloat(document.getElementById("registroCalificacionNota").value) < 0 || parseFloat(document.getElementById("registroCalificacionNota").value) > 5 ) {
      document.getElementById("errorRegistroCalificacion").innerHTML = "La nota debe estar entre 0 y 5"
      document.getElementById("errorRegistroCalificacion").style.color = "red"
    }
    else {
      const contenido = {
        nota: document.getElementById("registroCalificacionNota").value,
        comentario: document.getElementById("registroCalificacionComentario").value,
        asesoriaId: this.state.asesoriaId
      };
      const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contenido })
      };
      fetch("/usuario/registrarCalificacion", request)
        .then(res => res.json())
        .then(res => {
          if (res.valor === true) {
            document.getElementById("errorRegistroCalificacion").innerHTML = "Se registró tu calificación!"
            document.getElementById("errorRegistroCalificacion").style.color = "#54B5BF"
            this.setState({ flagCalificaciones: true });
          }
        })
    }
  }
  registrarAsesoria() {
    const contenido = {
      correo: document.getElementById("registroMailAsesorado").value,
      monitorId: this.state.monitorId,
      nombre: this.state.nombre,
      curso: this.state.curso
    };
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contenido })
    };
    fetch("/usuario/registrarAsesoria", request)
      .then(res => res.json())
      .then(res => {
        if (res.valor === true) {
          document.getElementById("errorRegistroAsesoria").innerHTML = "Se registró la asesoría!"
          document.getElementById("errorRegistroAsesoria").style.color = "#54B5BF"
        }
        else {
          document.getElementById("errorRegistroAsesoria").innerHTML = "No se encuentra un usuairo con ese correo"
          document.getElementById("errorRegistroAsesoria").style.color = "red"
        }
      })
  }

  escogerElCurso(id, nombre) {
    this.setState({ monitorId: id })
    this.setState({ curso: nombre })
  }

  escogerAsesoria(id) {
    this.setState({ asesoriaId: id })
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.setState({ userId: userId })
    var url = "/usuario/" + userId;
    fetch(url)
      .then(res => {
        return res.json();
      }).then(res => {
        this.setState({ nombre: res.nombre })
      })
    url = "/usuario/" + userId + "/monitorias";
    fetch(url)
      .then(res => {
        return res.json();
      }).then(monitorias => {
        this.setState({ monitorias })
      })
    url = "/usuario/" + userId + "/calificaciones";
    fetch(url)
      .then(res => {
        return res.json();
      }).then(calificaciones => {
        this.setState({ calificaciones })
      })
    url = "/cursos";
    fetch(url)
      .then(res => {
        return res.json();
      }).then(cursos => {
        this.setState({ cursos })
      })
  }
  componentDidUpdate() {
    const userId = this.props.match.params.userId;
    var url;
    if (this.state.flagCalificaciones) {
      url = "/usuario/" + userId + "/calificaciones";
      fetch(url)
        .then(res => {
          return res.json();
        }).then(calificaciones => {
          this.setState({ calificaciones })
          this.setState({ flagCalificaciones: false })
        })
    }
    if (this.state.flagMonitorias) {
      url = "/usuario/" + userId + "/monitorias";
      fetch(url)
        .then(res => {
          return res.json();
        }).then(monitorias => {
          this.setState({ monitorias })
          this.setState({ flagMonitorias: false })
        })
    }
  }

  state = {
    "userId": 0,
    "nombre": "",
    "cursos": [],
    "monitorias": [],
    "calificaciones": [],
    "curso": "",
    "monitorId": 0,
    "asesoriaId": 0,
    "flagCalificaciones": false,
    "flagMonitorias": false
  }


  render() {
    return (
      <div>
        <div className="container-fluid" id="Banner">
          <div className="row banner">
            <div className="col-2"></div>
            <div className="col-8">
              <Link to={`/${this.state.userId}/cursos`}>
                <h1 align="center">MOE</h1>
              </Link>
            </div>
            <div className="col-2" align="right"></div>
          </div>
        </div>
        <br></br>
        <h2 align="center">{this.state.nombre}</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h3 align="center">Calificaciones pendientes</h3>
                  <div className="table" align="center" style={{ width: 100 + '%'}}>
                    <thead>
                      <tr>
                        <th align="center">Materia</th>
                        <th align="center">Monitor</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.calificaciones.map((e, i) =>
                        <tr>
                          <td>{e.curso}</td>
                          <td>{e.nombre}</td>
                          <td><button className="btn btn-info" data-toggle="modal" data-target="#registrarCalificacionModal" onClick={() => this.escogerAsesoria(e.id)}>Calificar</button></td>
                        </tr>
                      )}
                    </tbody>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <h3 align="center">Monitorias</h3>
                      <div className="table" align="center" style={{ width: 100 + '%' }}>
                        <thead>
                          <tr>
                            <th>Materia</th>
                            <th>Nota Promedio</th>
                            <th># Calificaciones</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.monitorias.map((e, i) =>
                            <tr>
                              <Link to={`/${this.state.userId}/monitor/${e.id}`}><td>{e.curso}</td></Link>
                              <td>{e.calificacion}</td>
                              <td>{e.n_calificacion}</td>
                              <td><button className="btn btn-info" data-toggle="modal" data-target="#registrarAsesoriaModal" onClick={() => this.escogerElCurso(e.id, e.curso)}>Registrar</button></td>
                              <td><button className="btn btn-info" onClick={() => this.suspenderMonitoria(e.id)}>Suspender</button></td>
                            </tr>
                          )}
                        </tbody>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12" align="center" >
                  <button className="btn btn-info" data-toggle="modal" data-target="#registrarMonitoria">Agregar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="registrarAsesoriaModal" tabindex="-1" role="dialog" aria-labelledby="registrarAsesoriaLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="registrarAsesoriaLabel">Registrar Asesoria</h5>
              </div>
              <div className="modal-body">
                <table style={{ width: 100 + '%' }}>
                  <tr>
                    <td><label for="registroMailAsesorado">Correo asesorado</label></td>
                    <td align="right"><input type="email" id="registroMailAsesorado" name="registroMailAsesorado" /></td>
                  </tr>
                </table>
                <br></br>
                <p align="center" id="errorRegistroAsesoria"></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-info" data-dismiss="modal" onClick={() => this.cerrarModales()}>Cerrar</button>
                <button type="button" class="btn btn-info" onClick={() => this.registrarAsesoria()}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="registrarCalificacionModal" tabindex="-1" role="dialog" aria-labelledby="registrarCalificacionLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="registrarCalificacionLabel">Registrar Calificacion</h5>
              </div>
              <div className="modal-body">
                <table style={{ width: 100 + '%' }}>
                  <tr>
                    <td align="right" style={{ width: 50 + '%' }}><label for="registroCalificacionNota">Nota</label></td>
                    <td align="left" style={{ width: 50 + '%' }}><input type="number" id="registroCalificacionNota" name="registroCalificacionNota" min="0" max="5" step="0.1"/></td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="center"><label for="registroCalificacionComentario">Comentario (Opcional)</label></td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="center"><textarea id="registroCalificacionComentario" rows="3" cols="50"></textarea></td>
                  </tr>
                </table>
                <br></br>
                <p align="center" id="errorRegistroCalificacion"></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-info" data-dismiss="modal" onClick={() => this.cerrarModales()}>Cerrar</button>
                <button type="button" class="btn btn-info" onClick={() => this.registrarCalificacion()}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="registrarMonitoria" tabindex="-1" role="dialog" aria-labelledby="registrarMonitoriaLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="registrarMonitoriaLabel">Agregar Monitoria</h5>
              </div>
              <div className="modal-body">
                <table style={{ width: 100 + '%' }}>
                  <tr>
                    <td align="center"><label for="agregarMonitoria">Selecciona un curso:</label></td>
                  </tr>
                  <tr>
                    <td align="center">
                      <select id="agregarMonitoria" size="5">
                        {this.state.cursos.map((e, i) =>
                          <option value={`${e.id}+${e.nombre}`}>{e.nombre}</option>
                        )}
                      </select>
                    </td>
                  </tr>
                </table>
                <br></br>
                <p align="center" id="errorAgregarMonitoria"></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-info" data-dismiss="modal" onClick={() => this.cerrarModales()}>Cerrar</button>
                <button type="button" class="btn btn-info" onClick={() => this.agregarMonitoria()}>Activar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}