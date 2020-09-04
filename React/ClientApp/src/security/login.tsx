import * as React from 'react'
import { connect } from 'react-redux';
import * as Security from './store';
import * as Router from 'react-router'

interface State {
    login: string;
    password: string;
}

class Login extends React.Component<Security.State & Security.Actions, State> {
    public render() {
        console.log(this.props.user);
        return <div>
            <h3>Вход</h3>
            <hr />
            <form action="/Login" method="post" style={{ maxWidth: '400px' }}>
                <div className="row p-1">
                    <div className="col-md-2">
                        <label htmlFor="login">Логин</label>
                    </div>
                    <div className="col-md-10">
                        <input id="login" name="Login" type="text" className="form-control" onChange={(event) => {
                            console.log(event.target.value);
                            this.setState({
                                login: event.target.value,
                            });
                        }} />
                    </div>
                </div>
                <div className="row p-1">
                    <div className="col-md-2">
                        <label htmlFor="password">Пароль</label>
                    </div>
                    <div className="col-md-10">
                        <input id="password" name="Password" type="password" className="form-control" onChange={(event) => {
                            console.log(event.target.value);
                            this.setState({
                                password: event.target.value,
                            });
                        }} />
                    </div>
                </div>
                <br />
                <div className="p-1">
                    <button type="button" className="btn btn-primary m-1" onClick={(event) => {
                        if (this.state == null)
                            return;

                        if (this.state.login == undefined)
                            return;

                        if (this.state.password == undefined)
                            return;

                        this.props.login(this.state.login, this.state.password);
                    }}>
                        Войти
                    </button>
                </div>
            </form>
        </div>
    }
}

export default connect((state: Security.State) => state, Security.actions)(Login)