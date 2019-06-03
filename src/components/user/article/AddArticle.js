import React, { Component } from "react";
import { withRouter} from "react-router-dom";
import { inject, observer } from "mobx-react";
import axios from "axios";

@withRouter
@inject("userStore")
@observer
class AddArticle extends Component {
    constructor(props){
        super(props);
        this.state ={
            articleName: "",
            author: "",
            date: "",
            content: ""
        }
    }
    render() {
        return <div />;
    }
}

export default AddArticle;
