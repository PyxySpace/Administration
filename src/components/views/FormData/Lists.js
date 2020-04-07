import React, {Component} from "react";
import {Form} from "react-bootstrap";
import routeAPI from "../../../tools/routeAPI";
import FieldText from "./FieldText";
import FooterForm from "./FooterForm";
import Loading from "../modules/Loading";

export default class Lists extends Component {

    constructor(props) {
        super(props);
            this.state = {
                tokenACP: "",
                dataType: this.props.dataType,
                create: "POST",
                edit: "PUT",
                data: {"title": "", "description": "", "category": "", "user": ""}
            };
    }

    async componentDidMount() {
        if(this.props.action === 'edit'){
            await fetch(routeAPI + this.state.dataType + "/" + this.props.id, {
                headers: { 'Authorization': this.state.tokenACP },
            }).then(response => response.json())
                .then(json => {
                    if(json){
                        this.setState({
                            data: json,
                            apiLoaded: true,
                            categoryId: json.category,
                            userId: json.user,
                            title: json.title,
                            description: json.description
                        });
                    }
                }).catch(e => {
                    console.log(e.code)
                    console.log(e.message)
                })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.props.id
        let route = routeAPI + 'lists/';
        if(id){
            route = routeAPI + 'lists/' + id
        }
        fetch( route, {
            method: this.state[this.props.action],
            headers: {
                'Authorization': this.state.tokenACP,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                user: this.state.userId,
                category: this.state.categoryId,
                description: this.state.description,
                is_private: false,
                is_active: true,
            })
        })
            .then(r => {
                if(r.ok){
                    this.setState({
                        toastMessage: 'List created with success !',
                        toastType: 'success'
                    })
                }else{
                    this.setState({
                        toastMessage: 'An error occurred while creating the list: ' + e.message,
                        toastType: 'error'
                    });
                }
            })
            .catch(e => {
                this.setState({
                    toastMessage: 'An error occurred while creating the list: ' + e.message + ": " + e.code,
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
        });
    };

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Row>
                <FieldText defaultValue={this.state.data.title} title={"Title"} name={"title"} id={"title"} placeholder={"My first list"} type={'text'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.user} title={"User"} name={"userId"} id={"userId"} placeholder={"user"} type={'text'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.category} title={"Category"} name={"categoryId"} id={"categoryId"} placeholder={"category"} type={'text'} handleChange={this.handleChange}/>
            </Form.Row>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control defaultValue={this.state.data.description} name="description" as="textarea" rows="3" onChange={this.handleChange}/>
            </Form.Group>

            {/*<Form.Row>*/}
            {/*    <Switch label={"Is Active ?"} id={"isActive"} name={"is_active"} handleChange={this.handleChange}/>*/}
            {/*    <Switch label={"Is Private ?"} id={"isPrivate"} name={"is_private"} handleChange={this.handleChange}/>*/}
            {/*</Form.Row>*/}

            <FooterForm showT={this.props.showT} toastMessage={this.state.toastMessage} toastType={this.state.toastType}/>
        </Form>;
    }
}