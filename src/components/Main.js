import React from 'react';
import '../Styles.css';
import { Link } from 'react-router-dom';

export default class Main extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.setState({ userId: userId })
    const url = "/cursos";
    fetch(url)
      .then(res => {
        return res.json();
      }).then(cursos => {
        this.setState({ cursos })
      })
  }

  state = {
    "cursos": [],
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
        <div>
          <div id="cursos" className="row" align="center">
            {this.state.cursos.map((e, i) =>
              <div className="col-4" key={i}>
                <div className="card-curso" >
                  <Link to={`/${this.state.userId}/cursos/${e.id}`}>
                    <h3>{e.nombre}</h3>
                  </Link>
                </div>
                <br></br>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}