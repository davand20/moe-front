import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {

    state = {
        logged: false,
        userId: 0
    }

    login() {
        const contenido = {
            correo: document.getElementById("email").value,
            contrasena: document.getElementById("password").value
        };
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contenido })
        };
        fetch("/login", request)
            .then(res => res.json())
            .then(res => {
                if (res.valor === true) {
                    this.setState(() => ({ logged: true, userId: res.id }))    
                }
                else {
                    alert('Revisa los datos')
                }
            })
    }

    render() {
        if (this.state.logged === true) {
            return <Redirect to={`/${this.state.userId}/cursos`} />
        }
        return (
            <div id="login-cont">
                <h1 align="center">MOE</h1>
                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <h2 align="center">Monitorias Oportunas y Efectivas</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <form>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Correo" />
                                <br></br>
                                <input type="password" className="form-control" id="password" placeholder="Contraseña" />
                            </form>
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-2" align="right">
                        <button className="btn btn-primary">Registro</button>
                        </div>
                        <div className="col-2" align="left">
                        <button className="btn btn-primary" onClick={() => this.login()}>Entrar</button>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </div>
        );
    }
}