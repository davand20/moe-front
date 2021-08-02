import React from 'react';
import '../Styles.css';
import { Link } from 'react-router-dom';

export default class Curso extends React.Component {
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.setState({ userId: userId })
        const cursoId = this.props.match.params.cursoId;
        var url = "/cursos/" + cursoId;
        fetch(url)
            .then(res => {
                return res.json();
            }).then(curso => {
                this.setState({ curso })
            })
        url = "/cursos/monitor/" + cursoId;
        fetch(url)
            .then(res => {
                return res.json();
            }).then(monitores => {
                this.setState({ monitores })
                console.log(this.state)
            })

    }

    state = {
        "monitores": [],
        "curso": [],
        "userId": 0
    };

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
                            <div className="col-2" align="right">
                                <Link to={`/${this.state.userId}/usuario`}><button className="btn btn-secondary">Perfil</button></Link>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-4">
                                <div className="card">
                                    <div className="card-body">
                                        {this.state.curso.map((e) =>
                                            <div>
                                                <h2 align="center">{e.nombre}</h2>
                                                <h3 align="center"># Monitores: {this.state.monitores.length}</h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table" align="center" style={{ width: 100 + '%' }}>
                                            <thead >
                                                <tr >
                                                    <th>Nombre</th>
                                                    <th>Calificación</th>
                                                    <th># Calificaciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.monitores.map((e) =>
                                                    <tr>
                                                        <Link to={`/${this.state.userId}/monitor/${e.id}`}><td>{e.nombre}</td></Link>
                                                        <td>{e.calificacion}</td>
                                                        <td>{e.n_calificacion}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
}