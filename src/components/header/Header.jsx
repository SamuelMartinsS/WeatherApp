import React from "react"

class Header extends React.Component {

    constructor(props){
        super(props)
        this.handleLocation = this.handleLocation.bind(this)
        this.state = {
            city : ""
        }
    }

    handleLocation = () => {
        let newCity = document.getElementById('inpLocation').value
        if(newCity!== ""){
            this.setState({
                city : newCity
            })
        }
    }

    render(){
        return(

        <header class="header">
            <div class="container">
                <div class="row">
                    <div class="col">      
                        <h2>
                            Weather App
                        </h2>
                    </div>
                    <div class="col">
                        <label>Location</label>
                        <input type="text" id="inpLocation" placeholder="write the name of the location"></input>
                        <button type="button" id="btnLocation" onClick={this.handleLocation}>Search</button>
                </div>
            </div>
        </div>

           

        </header>

        )
    }
}

export default Header;