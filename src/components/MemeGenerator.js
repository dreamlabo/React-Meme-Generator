import React, {Component} from 'react'
//import {all} from "q";

class MemeGenerator extends Component {
    constructor(){
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImg: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.generateMeme = this.generateMeme.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({
                    allMemeImg: memes
                })
            })
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    generateMeme(event){
        event.preventDefault()
        console.log("newMeme=", this.state.allMemeImg[this.getRandomInt(this.state.allMemeImg.length)])
        this.setState({
            randomImage: this.state.allMemeImg[this.getRandomInt(this.state.allMemeImg.length)].url
        })
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    render(){
        return (
            <div>
                <form className="meme-form" onSubmit={this.generateMeme}>
                    <input
                        type="text"
                        value={this.state.topText}
                        name="topText"
                        onChange={this.handleChange}
                        placeholder="Top Text"
                    />

                    <input
                        type="text"
                        value={this.state.bottomText}
                        name="bottomText"
                        onChange={this.handleChange}
                        placeholder="Bottom Text"
                    />

                    {
                        /**
                         * Create 2 input fields, one for the topText and one for the bottomText
                         * Remember that these will be "controlled forms", so make sure to add
                         * all the attributes you'll need for that to work
                         */
                    }

                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="not loading" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}



export default MemeGenerator