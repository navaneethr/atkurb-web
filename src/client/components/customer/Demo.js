import React, { Component } from 'react';
import {Card} from '../utils/Utils'

export default class Demo extends Component {

    /**
     * Constructor method where you initialize variables and objects
     */
    constructor() {
        super();
    }

    /**
     * Render Function displays Html on the Screen and this method is always required in a component class.
     * @returns {*}
     */
    render() {
        let people = [
            {
                name: "Hema",
                age: 20,
                gender: "female"
            },
            {
                name: "Nav",
                age: 20,
                gender: "male"
            },
            {
                name: "Anu",
                age: 20,
                gender: "female"
            },
            {
                name: "Priya",
                age: 20,
                gender: "female"
            },
            {
                name: "Divya",
                age: 20,
                gender: "female"
            }
        ];
        return (
            <div>
                {
                    people.map((p) => {
                        return (
                            <Card name={p.name} age={p.age} gender={p.gender}/>
                        )
                    })
                }
            </div>
        );
    }
}
