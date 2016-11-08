import * as React from "react";
import * as ReactDOM from "react-dom";
import {getDeepClone} from "../utils/getDeepClone";
import {Input} from "../components/Input";


export interface ILoginPageProps {

}

export class LoginPage extends React.Component<ILoginPageProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    componentDidMount() {
    };

    render(): any {

        return (
            <div className="content">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                               placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }

}