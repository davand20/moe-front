import React from 'react';
import '../Styles.css';
import { Link } from 'react-router-dom';
import star from '../media/star.png'

export default class Main extends React.Component {
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.setState({ userId: userId })
        const monitorId = this.props.match.params.monitorId;
        var url = "/monitor/" + monitorId;
        fetch(url)
            .then(res => {
                return res.json();
            }).then(monitor => {
                this.setState({ monitor })
            })
        url = "/asesoria/" + monitorId;
        fetch(url)
            .then(res => {
                return res.json();
            }).then(asesorias => {
                this.setState({ asesorias })
            })
        url = "/monitor/" + monitorId + "/curso/";
        fetch(url)
            .then(res => {
                return res.json();
            }).then(res => {
                this.setState({ curso: res.nombre })
            })
        url = "/monitor/" + monitorId + "/usuario/";
        fetch(url)
            .then(res => {
                return res.json();
            }).then(res => {
                this.setState({ correo: res.correo })
            })
    }

    state = {
        "monitor": [],
        "curso": "",
        "correo": "",
        "asesorias": [],
        "userId": 0
    };
    render() {
        this.state.asesorias.reverse();
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
                        <div className="col-2" align="right">
                            <Link to={`/${this.state.userId}/usuario`}><button className="btn btn-secondary">Perfil</button></Link>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                            {this.state.monitor.map((e) =>
                                <div className="card">
                                    <div className="card-body">
                                        <h2 align="center">{e.nombre}</h2>
                                        <h3 align="center">{this.state.curso}</h3>
                                        <div className="table" align="center" style={{ width: 100 + '%' }}>
                                            <tr>
                                                <td style={{ width: 50 + '%' }}>
                                                    <h4>Nota promedio</h4>
                                                    <h5>{e.calificacion}</h5>
                                                </td>
                                                <td style={{ width: 50 + '%' }}>
                                                    <h4># Calificaciones</h4>
                                                    <h5>{e.n_calificacion}</h5>
                                                </td>
                                            </tr>
                                        </div>
                                        <div align="center">
                                            <button className="btn btn-info"><a href={`mailto:${this.state.correo}?subject=MOE ${this.state.curso}`}>Pedir Asesoria</a></button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-8">
                            {this.state.asesorias.map((e, i) =>
                                <div>
                                    <div className="card-comentario">
                                        <div className="row">
                                            <div className="col-6" align="left" style={{ 'font-weight':'bold' }}>
                                            <img src={star} className="img" width="20" height="20" alt={e.id} />
                                            {e.nota}
                                            </div>
                                            <div className="col-6" align="right">
                                                {e.fecha}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                {e.comentario}
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}