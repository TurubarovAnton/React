import '../css/menu.css'
import 'jam-icons/css/jam.min.css'

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Store from '../store';
import * as Security from '../security/store';

class Menu extends React.Component<Security.State & Security.Actions> {
    public render() {
        console.log(this.props);
        return <header>
            <nav>
                <div className="menu-panel">
                    <div className="menu-button">
                        <label htmlFor="menu-toggle">
                            <span className="jam jam-menu" />
                        </label>
                    </div>
                    {
                        this.props.user &&
                        <div className="login-info">
                            <span className="jam jam-user"></span> {this.props.user.name}
                        </div>
                    }
                </div>
                <input id="menu-toggle" type="checkbox" hidden />
                <ul>
                    <li>
                        <Link to='/'>
                            <label htmlFor="menu-toggle">
                                Пользователи
                            </label>
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <label htmlFor="menu-toggle">
                                Настройки
                            </label>
                        </Link>
                    </li>
                    <li>
                        {
                            this.props.user ?
                                <a onClick={this.props.logout}>
                                    <label htmlFor="menu-toggle">
                                        Выход
                            </label>
                                </a> :
                                <Link to='/login'>
                                    <label htmlFor="menu-toggle">
                                        Вход
                            </label>
                                </Link>
                        }
                    </li>
                </ul>
            </nav>
        </header >
    }
}

export default connect((state: Store.State) => state.security, Security.actions)(Menu)