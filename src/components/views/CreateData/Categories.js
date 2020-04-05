import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import {routeAPI} from "../../../index";
import FieldText from "./FieldText";
import NationalitySelect from "./NationalitySelect";
import GenderRadioButton from "./GenderRadioButton";
import Toasts from "../modules/Toasts";
import FooterForm from "./FooterForm";
import Users from "./Users";

export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenACP: "",
            dataType: this.props.dataType,
            toastMessage: "",
            toastType: ""
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(routeAPI + 'categories/', {
            method: "POST",
            headers: {
                'Authorization': this.state.tokenACP,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title
            })
        })
            .then(r => {
                if(r.ok){
                    this.setState({
                        toastMessage: 'Category created with success !',
                        toastType: 'success'
                    })
                }else{
                    this.setState({
                        toastMessage: 'An error occurred while creating the category: ' + e.message,
                        toastType: 'error'
                    });
                }
            })
            .catch(e => {
                this.setState({
                    toastMessage: 'An error occurred while creating the category: ' + e.message,
                    toastType: 'error'
                });
            });
        this.props.showToasts();
        this.props.delayToHide();
    };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        console.log(this.state);
        return <Form onSubmit={this.handleSubmit}>
            <Form.Row>
                <FieldText title={"Title"} name={"title"} id={"title"} placeholder={"Travel"} type={'text'} handleChange={this.handleChange}/>
            </Form.Row>

            <FooterForm showT={this.props.showT} toastMessage={this.state.toastMessage} toastType={this.state.toastType}/>
        </Form>;
    }
}