import React, { Component } from 'react';

interface IProps {
    children: JSX.Element
}

export default class App extends Component<IProps> {
    public componentDidMount(): void {
        document.title = "Linio";
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className="content">
                    { this.props.children }
                </div>
            </div>
        );
    }
}